/* ===================================================================
   Aqua Québec — UI behaviour
   =================================================================== */
(function () {
  "use strict";

  // --- Language ---
  let currentLang = initLang();

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "fr" ? "en" : "fr";
      applyLang(currentLang);
    });
  }

  // --- Sticky header ---
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Mobile nav ---
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  // --- Footer year ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Contact form (front-end validation + friendly feedback) ---
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      ["name", "email", "message"].forEach(id => {
        const input = document.getElementById(id);
        const field = input.closest(".field");
        const ok = input.value.trim() !== "" && input.checkValidity();
        field.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });

      const dict = I18N[currentLang];
      if (!valid) {
        note.textContent = dict.form_error;
        note.classList.remove("success");
        return;
      }
      // Functional fallback with no backend: open the visitor's email client
      // pre-filled with their request. Replace with a real form endpoint
      // (Formspree, Firebase, etc.) when available.
      const get = id => (document.getElementById(id).value || "").trim();
      const subject = `Demande de soumission — ${get("service")}`;
      const body =
        `Nom: ${get("name")}\n` +
        `Courriel: ${get("email")}\n` +
        `Téléphone: ${get("phone")}\n` +
        `Type de projet: ${get("service")}\n\n` +
        `${get("message")}`;
      window.location.href =
        `mailto:info@aquaquebec.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      note.textContent = dict.form_success;
      note.classList.add("success");
      form.reset();
    });
  }
})();
