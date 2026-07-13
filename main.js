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

document.querySelector("[data-export-print]")?.addEventListener("click", () => {
  closeExportDialog();
  window.print();
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

const navLinks = [...document.querySelectorAll(".deck-nav a")];
const navById = new Map(navLinks.map((link) => [link.getAttribute("href")?.slice(1), link]));
const navList = document.querySelector(".nav-list");

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
  },
  {
    threshold: [0.36, 0.58, 0.78],
  }
);

document.querySelectorAll(".slide").forEach((slide) => {
  slideObserver.observe(slide);
});
