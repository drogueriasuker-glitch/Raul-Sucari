/* Dr. Raul Sucari Cruz — interacciones de la página */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: fondo al hacer scroll ---------- */

  var header = document.getElementById("header");

  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function closeMenu() {
    nav.classList.remove("nav--open");
    burger.classList.remove("burger--open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
  }

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("nav--open");
    burger.classList.toggle("burger--open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Animaciones de aparición (escalonadas y repetibles) ----------
     Se dispara cada vez que el elemento entra en pantalla: al subir y volver
     a bajar, vuelve a reproducirse. */

  var revealEls = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("reveal--visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; })
        .forEach(function (entry, i) {
          entry.target.style.setProperty("--rd", (i * 85) + "ms");
          entry.target.classList.add("reveal--visible");
        });

      entries.forEach(function (entry) {
        if (!entry.isIntersecting) entry.target.classList.remove("reveal--visible");
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Sección activa en el menú ---------- */

  var navLinks = document.querySelectorAll(".nav__link");
  var sections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("nav__link--active", link.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Retrato del hero: paralaje 3D con el cursor ----------
     La foto y la placa están por delante del anillo en el eje Z, así que
     al inclinar la escena se separan y se ve la profundidad real.
     El flotar va en .retrato y la inclinación en .retrato__inner: una
     animación y una transformación no pueden compartir `transform`. */

  var retrato = document.querySelector(".retrato__inner");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (retrato && finePointer && !reducedMotion) {
    var pending = false;
    var tiltX = 0;
    var tiltY = 0;

    window.addEventListener("pointermove", function (e) {
      tiltX = ((e.clientX / window.innerWidth) - 0.5) * 14;
      tiltY = ((e.clientY / window.innerHeight) - 0.5) * -10;

      if (pending) return;
      pending = true;

      requestAnimationFrame(function () {
        retrato.style.setProperty("--tx", tiltX.toFixed(2));
        retrato.style.setProperty("--ty", tiltY.toFixed(2));
        pending = false;
      });
    }, { passive: true });
  }

  /* ---------- Logos de redes ----------
     Por defecto se muestra el logo dibujado de cada red. Si el archivo
     oficial existe en assets/redes/, se cambia al cargar. */

  document.querySelectorAll(".social__img").forEach(function (img) {
    var link = img.closest(".social");

    function useUploaded() { link.classList.remove("social--fallback"); }

    if (img.complete && img.naturalWidth > 0) useUploaded();
    else img.addEventListener("load", useUploaded);
  });
})();
