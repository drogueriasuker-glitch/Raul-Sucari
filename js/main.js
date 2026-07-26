/* MAXIN Centro Odontológico — interacciones de la página */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Intro de entrada ----------
     Muestra la animación de assets/intro/ a pantalla completa y la cierra
     al terminar. Se repite en cada visita y en cada recarga: no se guarda
     nada en el navegador a propósito.

     Si no hay archivo subido, se cierra al instante y la página abre
     normal — por eso todo el bloque está lleno de salidas de emergencia. */

  (function () {
    var intro = document.getElementById("intro");
    if (!intro) return;

    var video = document.getElementById("introVideo");
    var gif = document.getElementById("introGif");
    var botonSaltar = document.getElementById("introSaltar");
    var relojes = [];
    var cerrada = false;
    var arranco = false;
    var gifFallo = false;

    function esperar(ms, fn) { relojes.push(setTimeout(fn, ms)); }

    /* La página entra en su sitio mientras el telón se levanta */
    function revelarPagina() {
      var contenido = document.getElementById("contenido");
      var cabecera = document.getElementById("header");
      var flotante = document.querySelector(".whatsapp-float");

      if (contenido) contenido.classList.add("revelar-pagina");
      if (cabecera) cabecera.classList.add("revelar-suave");
      if (flotante) {
        flotante.classList.add("revelar-suave");
        flotante.classList.add("revelar-suave--tarde");
      }
    }

    function apagar() {
      intro.classList.add("intro--cerrada");
      document.body.classList.remove("intro-abierta");
      if (video) { try { video.pause(); } catch (e) {} }
    }

    function cerrar() {
      if (cerrada) return;
      cerrada = true;
      relojes.forEach(clearTimeout);

      /* Si no llegó a verse nada, no hay nada que despedir: fuera de una vez */
      if (!arranco) {
        intro.classList.add("intro--sin-salida");
        apagar();
        return;
      }

      /* Tiempo 1: el video se apaga sobre el azul, sin corte seco */
      intro.classList.add("intro--saliendo");

      /* Tiempo 2: el telón se levanta y la página entra a la vez */
      setTimeout(function () {
        apagar();
        revelarPagina();
      }, 430);
    }

    /* Quien pidió menos movimiento entra directo a la página */
    if (reducedMotion) { cerrar(); return; }

    document.body.classList.add("intro-abierta");
    botonSaltar.addEventListener("click", cerrar);
    esperar(2000, function () { intro.classList.add("intro--saltable"); });

    function empezar(elemento) {
      if (cerrada || arranco) return;
      arranco = true;
      elemento.classList.add("intro__media--activa");
      intro.classList.add("intro--reproduciendo");
    }

    /* ---- video ---- */

    var topePuesto = false;

    video.addEventListener("playing", function () {
      empezar(video);

      /* Tope de seguridad atado a la duración real: si el video se atasca
         a media reproducción, la página no se queda esperando para siempre.
         Se pone una sola vez — "playing" vuelve a dispararse tras cada pausa
         por buffer. */
      if (!topePuesto) {
        topePuesto = true;
        esperar(((video.duration || 12) * 1000) + 3000, cerrar);
      }
    });

    video.addEventListener("ended", cerrar);

    /* Ojo: no se escucha el error de cada <source>. Si hay webm y mp4, el
       webm puede fallar y el mp4 funcionar igual; el único dato fiable de
       "no hay video" es networkState, que se mira en el sondeo de abajo. */

    try {
      var reproduccion = video.play();
      if (reproduccion && reproduccion.catch) { reproduccion.catch(function () {}); }
    } catch (e) {}

    /* ---- gif, si no hubo video ---- */

    function mostrarGif() {
      if (cerrada || arranco) return;
      empezar(gif);
      esperar(parseInt(gif.getAttribute("data-duracion"), 10) || 4000, cerrar);
    }

    gif.addEventListener("error", function () { gifFallo = true; });

    /* ---- sondeo ----
       El evento de error del <video> no llega en todos los navegadores
       (el de cada <source> no siempre se propaga), así que en vez de
       confiar en él se revisa el estado real cada poco: si el video se
       quedó sin fuentes y el gif tampoco cargó, no hay animación que
       mostrar y se entra directo a la página. */

    var sondeos = 0;

    var sondeo = setInterval(function () {
      sondeos++;

      if (cerrada || arranco) { clearInterval(sondeo); return; }

      var sinVideo = !!video.error || video.networkState === video.NETWORK_NO_SOURCE;
      var sinGif = gifFallo || (gif.complete && gif.naturalWidth === 0);

      /* El video manda: el gif solo entra si no hay video que reproducir */
      if (sinVideo && !sinGif && gif.complete && gif.naturalWidth > 0) {
        clearInterval(sondeo);
        mostrarGif();
        return;
      }

      if (sinVideo && sinGif) { clearInterval(sondeo); cerrar(); return; }

      /* 20 sondeos = 5 s. El video pesa varios MB: en datos móviles puede
         tardar en llenar el buffer, así que se le da margen antes de rendirse */
      if (sondeos >= 20) { clearInterval(sondeo); cerrar(); }
    }, 250);

    relojes.push(sondeo);
  })();

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

  /* ---------- Anillo del logo: paralaje 3D con el cursor ----------
     El logo está sobre los anillos en el eje Z, así que al inclinar la
     escena se separan y se ve la profundidad real. */

  var orb = document.querySelector(".orb__inner");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (orb && finePointer && !reducedMotion) {
    var pending = false;
    var tiltX = 0;
    var tiltY = 0;

    window.addEventListener("pointermove", function (e) {
      tiltX = ((e.clientX / window.innerWidth) - 0.5) * 24;
      tiltY = ((e.clientY / window.innerHeight) - 0.5) * -20;

      if (pending) return;
      pending = true;

      requestAnimationFrame(function () {
        orb.style.setProperty("--tx", tiltX.toFixed(2));
        orb.style.setProperty("--ty", tiltY.toFixed(2));
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
