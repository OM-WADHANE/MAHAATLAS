(function () {
  const THEME_KEY = "mahaatlas_v1_theme";
  const LANG_KEY = "mahaatlas_v1_lang";

  let isDark = localStorage.getItem(THEME_KEY) !== "light";
  let lang = localStorage.getItem(LANG_KEY) || "en";

  function applyTheme() {
    document.body.classList.toggle("light-mode", !isDark);
    const cb = document.getElementById("themeToggle");
    if (cb) cb.checked = !isDark;
  }

  window.toggleTheme = function () {
    isDark = !isDark;
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    applyTheme();
  };

  window.toggleLang = function () {
    lang = lang === "en" ? "mr" : "en";
    localStorage.setItem(LANG_KEY, lang);
    const btn = document.getElementById("langBtn");
    if (btn) {
      btn.textContent = lang === "en" ? "EN" : "मर";
      btn.classList.toggle("active-lang", lang === "mr");
    }
    if (typeof window.mahaatlasSecurityRefresh === "function") window.mahaatlasSecurityRefresh();
  };

  window.openDrawer = function () {
    document.getElementById("drawer")?.classList.add("open");
    document.getElementById("overlay")?.classList.add("open");
  };

  window.closeDrawer = function () {
    document.getElementById("drawer")?.classList.remove("open");
    document.getElementById("overlay")?.classList.remove("open");
  };

  function highlightNav() {
    const page = document.body.dataset.page || "overview";
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-nav") === page);
    });
  }

  function injectClients() {
    const mount = document.getElementById("clients-mount");
    if (!mount) return;
    mount.innerHTML =
      '<div class="clients-section"><div class="clients-label">Our Clients & Partners</div><div class="clients-track" id="slider">' +
      [
        "Adani Group",
        "Aditya Birla Group",
        "Johnson Controls",
        "Kolte Patil Developers",
        "Kohinoor Group",
        "Adani Group",
        "Aditya Birla Group",
        "Johnson Controls",
        "Kolte Patil Developers",
        "Kohinoor Group",
      ]
        .map(function (n) {
          return (
            '<div class="client-item"><div class="client-dot"></div><div class="client-name">' +
            n +
            "</div></div>"
          );
        })
        .join("") +
      "</div></div>";
  }

  window.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    const btn = document.getElementById("langBtn");
    if (btn) {
      btn.textContent = lang === "en" ? "EN" : "मर";
      btn.classList.toggle("active-lang", lang === "mr");
    }
    highlightNav();
    injectClients();
  });
})();
