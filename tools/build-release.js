const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const entryFiles = [
  "index.html",
  "styles.css",
  "main.js",
  "README.md",
  "docs/priprema-za-podizanje.md",
  "exports/radijator-prezentacija-2026-dokument.html",
];

const toPosix = (value) => value.replaceAll(path.sep, "/");
const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const ensureInsideRoot = (targetPath) => {
  const resolved = path.resolve(targetPath);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`Unsafe path outside project: ${resolved}`);
  }
  return resolved;
};

const resetDist = () => {
  const resolvedDist = ensureInsideRoot(dist);
  if (path.basename(resolvedDist) !== "dist") {
    throw new Error(`Refusing to reset unexpected directory: ${resolvedDist}`);
  }
  fs.rmSync(resolvedDist, { recursive: true, force: true });
  fs.mkdirSync(resolvedDist, { recursive: true });
};

const copyRelativeFile = (relativePath) => {
  const normalized = toPosix(relativePath);
  const source = ensureInsideRoot(path.join(root, normalized));
  const target = ensureInsideRoot(path.join(dist, normalized));

  if (!fs.existsSync(source)) {
    throw new Error(`Missing release file: ${normalized}`);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);

  return {
    file: normalized,
    bytes: fs.statSync(source).size,
  };
};

const collectAssetRefs = () => {
  const refs = new Set();
  const filesToScan = entryFiles.filter((file) => fs.existsSync(path.join(root, file)));
  const assetAttributePattern = /(?:src|href|poster)=["'](?:\.\.?\/)?(assets\/[^"']+)["']/g;
  const cssUrlPattern = /url\(["']?(?:\.\.?\/)?(assets\/[^"')]+)["']?\)/g;

  for (const file of filesToScan) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    for (const match of source.matchAll(assetAttributePattern)) refs.add(match[1]);
    for (const match of source.matchAll(cssUrlPattern)) refs.add(match[1]);
  }

  return [...refs].sort();
};

resetDist();

const copiedFiles = [];
for (const file of entryFiles) {
  copiedFiles.push(copyRelativeFile(file));
}

const assetRefs = collectAssetRefs();
for (const asset of assetRefs) {
  copiedFiles.push(copyRelativeFile(asset));
}

const totalBytes = copiedFiles.reduce((sum, item) => sum + item.bytes, 0);
const manifest = {
  builtAt: new Date().toISOString(),
  source: "Radijator-prezentacija",
  files: copiedFiles.length,
  assets: assetRefs.length,
  totalSize: formatMb(totalBytes),
  copied: copiedFiles.map((item) => ({
    file: item.file,
    size: formatMb(item.bytes),
  })),
};

fs.writeFileSync(
  path.join(dist, "release-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8"
);

console.log(`Release ready: ${dist}`);
console.log(`Files: ${manifest.files}`);
console.log(`Assets: ${manifest.assets}`);
console.log(`Size: ${manifest.totalSize}`);
