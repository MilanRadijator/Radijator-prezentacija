const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const entryFiles = [
  "index.html",
  "styles.css",
  "i18n.js",
  "main.js",
  "README.md",
  "docs/priprema-za-podizanje.md",
  "exports/radijator-prezentacija-2026-dokument.html",
];

const toPosix = (value) => value.replaceAll(path.sep, "/");
const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const assert = (condition, message) => {
  if (!condition) throw new Error(`Validation failed: ${message}`);
};

const ensureInsideRoot = (targetPath) => {
  const resolved = path.resolve(targetPath);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`Unsafe path outside project: ${resolved}`);
  }
  return resolved;
};

const hasExactPathCase = (relativePath) => {
  const segments = toPosix(relativePath).split("/").filter(Boolean);
  let current = root;

  for (const segment of segments) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) return false;
    if (!fs.readdirSync(current).includes(segment)) return false;
    current = path.join(current, segment);
  }

  return true;
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

const validateSources = () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
  const expectedSlides = Array.from({ length: 31 }, (_, index) => `s${String(index + 1).padStart(2, "0")}`);
  const slideIds = [...html.matchAll(/<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*id="(s\d{2})"/g)].map(
    (match) => match[1]
  );
  const navIds = [...html.matchAll(/<a\s+href="#(s\d{2})"/g)].map((match) => match[1]);
  const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
  const localRefs = [...html.matchAll(/(?:src|href|poster)="(\.\/[^"#?]+)"/g)].map((match) => match[1]);
  const videos = [...html.matchAll(/<video\b[^>]*>/g)].map((match) => match[0]);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const printPosters = [...html.matchAll(/<img\b[^>]*class="[^"]*\bprint-poster\b[^"]*"[^>]*>/g)];

  assert(JSON.stringify(slideIds) === JSON.stringify(expectedSlides), "slide IDs must run from s01 to s31");
  assert(JSON.stringify(navIds) === JSON.stringify(expectedSlides), "dashboard links must match slide order");
  assert(duplicateIds.length === 0, `duplicate HTML IDs: ${[...new Set(duplicateIds)].join(", ")}`);
  assert((css.match(/{/g) || []).length === (css.match(/}/g) || []).length, "unbalanced CSS braces");
  assert(videos.length === 4, `expected 4 videos, found ${videos.length}`);
  assert(printPosters.length === videos.length, "each video must have one print poster");

  images.forEach((image, index) => {
    assert(/\balt="[^"]*"/.test(image), `image ${index + 1} is missing an alt attribute`);
  });

  videos.forEach((video, index) => {
    assert(/\bautoplay\b/.test(video), `video ${index + 1} is missing autoplay`);
    assert(/\bmuted\b/.test(video), `video ${index + 1} is missing muted`);
    assert(/\bloop\b/.test(video), `video ${index + 1} is missing loop`);
    assert(/\bposter=/.test(video), `video ${index + 1} is missing a print poster`);
    assert(!/\bcontrols\b/.test(video), `video ${index + 1} must not show player controls`);
  });

  for (const relativeRef of localRefs) {
    const normalizedRef = toPosix(relativeRef).replace(/^\.\//, "");
    const source = ensureInsideRoot(path.join(root, normalizedRef));
    assert(fs.existsSync(source), `missing local reference ${relativeRef}`);
    assert(hasExactPathCase(normalizedRef), `path case mismatch for ${relativeRef}`);

    if (normalizedRef.startsWith("assets/")) {
      assert(fs.statSync(source).size < 100 * 1024 * 1024, `asset exceeds 100 MB: ${relativeRef}`);
    }
  }

  console.log(`Validation passed: ${slideIds.length} slides, ${navIds.length} dashboard links, ${videos.length} videos.`);
};

const validateTranslations = () => {
  const htmlSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const i18nSource = fs.readFileSync(path.join(root, "i18n.js"), "utf8");
  const declaration = "const dictionaries = ";
  const dictionaryStart = i18nSource.indexOf(declaration) + declaration.length;
  const dictionaryMarker = i18nSource.indexOf("\n  };", dictionaryStart);

  assert(dictionaryStart >= declaration.length, "translation dictionary declaration is missing");
  assert(dictionaryMarker >= 0, "translation dictionary closing marker is missing");

  const dictionaryEnd = dictionaryMarker + 4;
  const dictionaries = Function(
    `"use strict"; return (${i18nSource.slice(dictionaryStart, dictionaryEnd)});`
  )();
  const languages = ["en", "de", "sl"];
  const keySets = languages.map((language) => Object.keys(dictionaries[language] || {}).sort());

  assert(
    keySets.every((keys) => JSON.stringify(keys) === JSON.stringify(keySets[0])),
    "EN, DE and SL translation key sets must match"
  );

  let body = htmlSource.slice(htmlSource.indexOf("<body"), htmlSource.lastIndexOf("</body>") + 7);
  body = body.replace(/<(script|style|noscript|textarea)\b[\s\S]*?<\/\1>/gi, "");
  body = body.replace(/<(p|li)\b[^>]*data-i18n-html[^>]*>[\s\S]*?<\/\1>/gi, "");
  const activeKeys = new Set(
    [...body.matchAll(/>([^<>]+)</g)]
      .map((match) => match[1].replace(/\s+/g, " ").trim())
      .filter(Boolean)
  );

  for (const language of languages) {
    for (const [key, value] of Object.entries(dictionaries[language])) {
      assert(activeKeys.has(key), `${language.toUpperCase()} contains an inactive translation key: ${key}`);
      assert(String(value).trim(), `${language.toUpperCase()} has an empty translation for: ${key}`);
    }
  }

  console.log(`Translation validation passed: ${keySets[0].length} active keys per language.`);
};

validateSources();
validateTranslations();
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
