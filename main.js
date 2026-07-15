const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const exportDialog = document.querySelector("[data-export-dialog]");

const openExportDialog = () => {
  exportDialog?.removeAttribute("hidden");
};

const closeExportDialog = () => {
  exportDialog?.setAttribute("hidden", "");
};

document.querySelector("[data-print-deck]")?.addEventListener("click", () => {
  openExportDialog();
});

document.querySelector("[data-export-close]")?.addEventListener("click", () => {
  closeExportDialog();
});

const waitForImages = () => {
  const images = [...document.images];
  return Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    })
  );
};

const waitForPrintAssets = async () => {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await waitForImages();
};

document.querySelector("[data-export-print]")?.addEventListener("click", async () => {
  closeExportDialog();
  await waitForPrintAssets();
  requestAnimationFrame(() => window.print());
});

exportDialog?.addEventListener("click", (event) => {
  if (event.target === exportDialog) {
    closeExportDialog();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeExportDialog();
  }
});

const navLinks = [...document.querySelectorAll(".nav-list a")];
const navById = new Map(navLinks.map((link) => [link.getAttribute("href")?.slice(1), link]));
const navList = document.querySelector(".nav-list");
const slides = [...document.querySelectorAll(".slide")];

const keepActiveNavItemVisible = (activeLink) => {
  if (!navList) return;

  const listBounds = navList.getBoundingClientRect();
  const linkBounds = activeLink.getBoundingClientRect();
  const isOutsideList = linkBounds.top < listBounds.top + 10 || linkBounds.bottom > listBounds.bottom - 10;

  if (isOutsideList) {
    activeLink.scrollIntoView({ block: "nearest" });
  }
};

const slideObserver = new IntersectionObserver(
  (entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;

    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });

    const activeLink = navById.get(current.target.id);
    if (activeLink) {
      activeLink.classList.add("is-active");
      activeLink.setAttribute("aria-current", "page");
      keepActiveNavItemVisible(activeLink);
    }

    slides.forEach((slide) => {
      slide.classList.toggle("is-current", slide === current.target);
    });

    const currentIndex = slides.indexOf(current.target);
    if (currentIndex >= 0) {
      const progress = ((currentIndex + 1) / slides.length) * 100;
      document.documentElement.style.setProperty("--deck-progress", `${progress}%`);
    }
  },
  {
    threshold: [0.36, 0.58, 0.78],
  }
);

slides.forEach((slide) => {
  slideObserver.observe(slide);
});
