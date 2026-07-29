/* Dr. Raul Sucari Cruz — interacciones de la página */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header y menú móvil ----------
     Van juntos porque el scroll cierra el menú: las tres referencias tienen
     que existir antes de que `onScroll` corra por primera vez. */

  var header = document.getElementById("header");
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  /* Dónde estaba el scroll al abrir el panel. El cierre se decide contra
     esta marca y no contra el scroll anterior, para que el panel aguante
     los pocos píxeles que se mueve la página cuando la barra del navegador
     móvil se colapsa, y se cierre solo cuando el dedo arrastra de verdad. */
  var scrollAlAbrir = 0;
  var MARGEN_CIERRE = 10;

  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > 20);

    /* Con el menú abierto, desplazarse lo cierra: el panel tapa media
       pantalla y quedarse colgado sobre un contenido que ya pasó no tiene
       sentido. Volver a tocar la hamburguesa lo abre otra vez, y el ciclo
       se repite. */
    if (nav.classList.contains("nav--open") &&
        Math.abs(window.scrollY - scrollAlAbrir) > MARGEN_CIERRE) {
      closeMenu();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* La clase en <html> le quita al header su `backdrop-filter` mientras el
     panel está abierto: si no, el header se vuelve bloque contenedor del
     panel y lo deja cortado. Ver el bloque @media (max-width: 980px). */
  function setMenu(open) {
    if (open) scrollAlAbrir = window.scrollY;
    nav.classList.toggle("nav--open", open);
    burger.classList.toggle("burger--open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.documentElement.classList.toggle("menu-abierto", open);
  }

  function closeMenu() { setMenu(false); }

  burger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("nav--open"));
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

  /* ---------- Foto del hero: paralaje 3D con el cursor ----------
     La foto va por delante del halo en el eje Z, así que al inclinar la
     escena se separan y se ve la profundidad real.
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
