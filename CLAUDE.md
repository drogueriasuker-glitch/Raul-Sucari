# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Sitio web estático de una página para **MAXIN Centro Odontológico** (Dr. Raúl Sucari
Cruz), en Juliaca, Puno. HTML + CSS + JS puro: **sin build, sin npm, sin dependencias,
sin tests**. Todo el contenido está en español y se sube por FTP tal cual.

Su trabajo es doble: contar quién es el doctor y hacer que el paciente llegue al
consultorio (mapa) o escriba por WhatsApp. Nada más — por pedido del cliente **no hay
sección de testimonios**.

Archivos: [index.html](index.html), [css/styles.css](css/styles.css),
[js/main.js](js/main.js), y [DATOS.md](DATOS.md) (formulario con los datos reales que
llenó el cliente, ya aplicados a la página).

## Ver los cambios

No hay comando de build. Se abre el archivo:

```powershell
Invoke-Item index.html
```

Al editar CSS/JS hace falta recarga forzada (Ctrl+F5).

Para capturas headless (Chrome está en `C:\Program Files\Google\Chrome\Application`):

```powershell
& $chrome --headless --disable-gpu --hide-scrollbars --virtual-time-budget=9000 `
  --window-size=1440,6000 --screenshot="salida.png" "file:///.../index.html"
```

Dos límites conocidos de ese método: **el iframe de Google Maps sale en blanco**
(dibuja sobre canvas y headless no lo pinta) y **Chrome no baja de ~500 px de ancho**
de ventana, así que una captura a 420 px sale recortada a la derecha y parece un
desbordamiento que no existe. Para revisar móvil, usar 500 px.

## Identidad visual

Derivada del logo (`assets/logo.png`): anillo navy → dorado con disco blanco al centro.
Los colores oficiales son **navy `#02164A`** y **amarillo `#FFC401`**, pero por pedido
del cliente la página los usa **rebajados**: el dorado de trabajo es `#E9C877`
(`--gold`) y el amarillo pleno queda reservado para acentos (`--gold-vivid`); el navy
oficial vive dentro de degradados sobre una base más oscura y neutra. Todos los tokens
están en `:root` al inicio de `styles.css`.

Regla que sostiene ese look: **las secciones no llevan color de fondo propio**. Hay un
solo degradado continuo en `body` más una capa de luz ambiental fija en `body::before`,
y las secciones se separan con un filete dorado que se desvanece en los extremos
(`.section + .section::before`). Poner un `background` plano en una sección reintroduce
las costuras duras que se quitaron a propósito.

Tres tipografías, cada una con un papel: **Cinzel** para el nombre de marca y el título
del hero (recoge las mayúsculas romanas de "MAXIN"), **Outfit** para títulos y botones,
**Manrope** para el cuerpo y las versalitas espaciadas.

La firma de la página es el **orbe del hero**: el logo real flotando en 3D con tres
anillos dorados orbitando alrededor (`.orb`). Es 3D de verdad — `perspective` en
`.hero__stage`, `transform-style: preserve-3d` en `.orb` y `.orb__inner`, y el logo
elevado con `translateZ(80px)`, así que al inclinar la escena con el cursor el logo y
los anillos se separan. Si se toca esa parte, respetar la división de roles: el float
va en `.orb` y la inclinación del cursor en `.orb__inner`, porque una animación y una
transformación no pueden compartir la propiedad `transform`.

## Acoplamientos que no se ven en un solo archivo

- `main.js` es un IIFE en estilo ES5, sin módulos, cargado al final de `<body>`. Asume
  sin comprobar que existen `#header`, `#burger` y `#nav`: si se renombran, el script
  entero deja de correr.
- Cada `<section>` tiene `id` (`inicio`, `doctor`, `tratamientos`, `consultorio`,
  `llegar`) y un `.nav__link` con `href="#id"`. El scrollspy compara ambos, así que una
  sección nueva necesita las dos cosas.
- **Contrato `.reveal`**: el CSS deja el elemento invisible y un IntersectionObserver le
  añade `.reveal--visible` al entrar en pantalla, escalonando con la custom property
  `--rd`. Es repetible: al salir se quita la clase. Markup nuevo sin `.reveal` aparece
  estático; con `.reveal` y el JS caído, queda invisible para siempre.
- `prefers-reduced-motion` se apaga en dos lados a la vez: un bloque `@media` al final
  del CSS que desactiva cada animación por nombre, y `main.js`, que además desactiva el
  paralaje del orbe. Toda animación nueva va también en ese bloque.
- **`height: auto` en imágenes con `aspect-ratio`**: los `<img>` llevan atributos
  `width`/`height` reales (por el CLS), y ese `height` gana sobre `aspect-ratio`. Sin
  `height: auto` la foto se estira a su alto natural — ya pasó con la del doctor.

## Logos de redes sociales

El pie muestra Facebook, Instagram, TikTok, X y WhatsApp. Cada enlace trae **dos**
versiones del icono: un `<img>` que apunta a `assets/redes/<red>.png` (los logos
oficiales que sube el cliente, ver [assets/redes/LEEME.txt](assets/redes/LEEME.txt)) y
un `<span class="social__mark">` con el logo dibujado en SVG.

El enlace nace con la clase `social--fallback`, que muestra el SVG; `main.js` la quita
solo cuando el PNG carga de verdad. Así nunca se ve un icono roto y los archivos
oficiales aparecen solos al subirse. Si se agrega otra red, hay que replicar las dos
capas y el nombre de archivo en el LEEME.

## Mapa

Iframe de Google Maps sin API key, con el patrón `?q=<dirección>&output=embed`, más un
botón de indicaciones (`/maps/dir/?api=1&destination=…`) y el enlace corto que compartió
el cliente. La dirección aparece literal en tres sitios (título de la sección, tarjeta
de datos y pie) — al cambiarla hay que actualizar también la query del iframe, la del
botón de indicaciones y el JSON-LD del final del HTML.

## Datos del cliente

Ya están aplicados: Dr. Raúl Sucari Cruz · COP 24841 · WhatsApp +51 928 471 815 ·
sucari1201@gmail.com · Av. 3 de Octubre 322, Juliaca (Puno) · atención los fines de
semana previa cita · +20 años, 10 000 pacientes, 4 años de residencia.

Una restricción de redacción se mantiene: **todavía no tiene el título de especialista
(RNE)**, así que la fórmula correcta es "estudios de especialidad concluidos en Cirugía
Oral y Maxilofacial". No escribir "Especialista en" ni inventar un número de RNE hasta
que el cliente avise.
