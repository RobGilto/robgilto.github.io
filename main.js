/* ============================================================
   Robert Gilto — Web Resume
   Vanilla JS. No dependencies.
   - Mobile nav toggle
   - Sticky header "scrolled" state
   - Active-section highlighting via IntersectionObserver
   - Current year in footer
   ============================================================ */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".primary-nav a")
  );

  /* ---- Sticky header scrolled state ---- */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 4) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  // At mobile widths a closed menu must be inert + hidden from assistive tech
  // so its links are not focusable/announced. On desktop the nav is always
  // visible and interactive, so it must never be inert.
  var mqlMobile = window.matchMedia("(max-width: 768px)");
  function syncNavHidden() {
    if (!primaryNav) return;
    var open = navToggle && navToggle.getAttribute("aria-expanded") === "true";
    var hide = mqlMobile.matches && !open;
    if (hide) {
      primaryNav.setAttribute("inert", "");
      primaryNav.setAttribute("aria-hidden", "true");
    } else {
      primaryNav.removeAttribute("inert");
      primaryNav.removeAttribute("aria-hidden");
    }
  }
  function closeNav() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    syncNavHidden();
  }
  function toggleNav() {
    if (!navToggle || !primaryNav) return;
    var open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    primaryNav.classList.toggle("is-open", !open);
    syncNavHidden();
  }
  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }
  // Keep inert state correct across viewport changes (e.g. rotate / resize).
  if (mqlMobile.addEventListener) {
    mqlMobile.addEventListener("change", syncNavHidden);
  } else if (mqlMobile.addListener) {
    mqlMobile.addListener(syncNavHidden);
  }
  syncNavHidden();
  // Close after choosing a link (mobile)
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
  // Close when clicking outside the nav/header
  document.addEventListener("click", function (e) {
    if (!primaryNav || !primaryNav.classList.contains("is-open")) return;
    if (e.target.closest(".primary-nav") || e.target.closest(".nav-toggle")) return;
    closeNav();
  });

  /* ---- Active section highlighting ---- */
  // Map section id -> nav link (Contact maps to footer#contact)
  var sections = navLinks
    .map(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) !== "#") return null;
      var el = document.querySelector(href);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var currentId = null;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            if (id === currentId) return;
            currentId = id;
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            var match = sections.filter(function (s) {
              return s.el.id === entry.target.id;
            })[0];
            if (match) match.link.classList.add("is-active");
          }
        });
      },
      {
        // Trigger when section occupies the upper-middle of the viewport
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );
    sections.forEach(function (s) { observer.observe(s.el); });
  }

  /* ---- Theme toggle ---- */
  // The no-flash inline <head> script has already set documentElement.dataset.theme.
  // Here we keep the toggle's a11y state, the theme-color meta, and localStorage in sync.
  var themeToggle = document.getElementById("themeToggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_BG = { dark: "#131318", light: "#faf9f7" };

  function syncThemeUI(theme) {
    var isLight = theme === "light";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
    if (themeMeta) {
      themeMeta.setAttribute("content", THEME_BG[theme] || THEME_BG.dark);
    }
  }

  syncThemeUI(document.documentElement.dataset.theme || "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable (private mode) — toggle still works for the session */
      }
      syncThemeUI(next);
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
