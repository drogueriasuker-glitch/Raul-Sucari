# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Landing de **marca personal** del **Dr. Raul Sucari Cruz**, Cirujano Dentista en
Juliaca (Puno). HTML + CSS + JS puro: **sin build, sin npm, sin dependencias, sin
tests**. Todo el contenido está en español y se sube por FTP tal cual.

Su trabajo es uno solo: que quien llega (por QR de tarjeta, por redes o por Google)
confíe en el profesional y **escriba por WhatsApp**. WhatsApp es el canal de cierre;
todos los CTA de la página apuntan al mismo enlace. Por pedido del cliente **no hay
sección de testimonios**.

Archivos: [index.html](index.html), [privacidad.html](privacidad.html),
[css/styles.css](css/styles.css), [js/main.js](js/main.js),
[DATOS.md](DATOS.md) (formulario con los datos reales del cliente) y
[DATA DE PAPÁ/INSTRUCCIONES-WEB-DR-SUCARI.md](DATA%20DE%20PAP%C3%81/INSTRUCCIONES-WEB-DR-SUCARI.md)
(el encargo de refactorización, ya aplicado).

## Restricciones de redacción — son legales, no de estilo

Vienen del Código de Ética del Colegio Odontológico del Perú y de la Ley 29733.
**Ganan sobre cualquier decisión de diseño o de copy.** No revertirlas.

| # | Regla |
|---|---|
| R1 | Nada de "Especialista", "Cirujano Maxilofacial", "Periodoncista" ni "Implantólogo" como título del profesional: todavía no está inscrito en el RNE. La fórmula correcta es **"Egresado de la Segunda Especialidad en…"**, y los servicios se describen como actos en primera persona ("Realizo extracción de terceras molares retenidas…"). |
| R2 | Nada de "Centro Odontológico", "Clínica" ni "Policlínico": el local no tiene categorización I-3. Solo "consultorio" o la dirección. |
| R3 | Ni una palabra sobre precios: `costo`, `precio`, `presupuesto`, `S/`, `gratis`, `descuento`, `promoción`, `oferta`. Lo que se comunica es **claridad y previsibilidad del tratamiento**, no dinero. |
| R4 | Cero fotos o videos de pacientes, incluidos "antes y después". |
| R5 | Política de privacidad publicada y enlazada (está en `privacidad.html`). |
| R6 | Ninguna cifra que no se pueda respaldar con documentos. Por eso se quitó "10 000 pacientes" y "+20 años" se dice como "más de dos décadas de práctica clínica". |

Sí se puede y se aprovecha: nombre, "Cirujano Dentista", COP N.º 24841, grados
académicos, la formación en San Marcos como hecho, dirección, teléfono, correo,
redes y horario.

**Cuando el cliente avise que ya inscribió una especialidad en el RNE**, decae R1
solo para esa especialidad (primero Periodoncia e Implantología, después Cirugía
Bucal y Maxilofacial) y hay que actualizar en este orden: web → JSON-LD → Perfil de
Empresa de Google → redes → tarjetas. R2 a R6 siguen vigentes de forma permanente.

## Publicación

El repositorio es `drogueriasuker-glitch/Raul-Sucari` (público) y la página se sirve con
GitHub Pages desde la raíz de `main`: https://drogueriasuker-glitch.github.io/Raul-Sucari/

Publicar un cambio es `git push`: Pages reconstruye solo, tarda alrededor de un minuto.
No hay CI ni paso de build. El destino final previsto sigue siendo Hostinger por FTP,
así que nada puede depender de rutas propias de GitHub Pages — todas las rutas del sitio
son relativas y deben seguir siéndolo.

**La única excepción son las URL absolutas que exige el protocolo**: `canonical`, las
etiquetas `og:`/`twitter:`, los `@id` del JSON-LD, `sitemap.xml` y `robots.txt`. Al
mudarse a dominio propio hay que cambiarlas en esos sitios y en `privacidad.html`.

La autenticación de `gh` no está configurada en la máquina; el token vive en el Gestor
de Credenciales de Windows y se recupera con `git credential fill` (usuario
`drogueriasuker-glitch`).

## Ver los cambios

No hay comando de build. Se abre el archivo:

```powershell
Invoke-Item index.html
```

Al editar CSS/JS hace falta recarga forzada (Ctrl+F5).

Para capturas headless (Chrome está en `C:\Program Files\Google\Chrome\Application`):

```powershell
& $chrome --headless --disable-gpu --no-sandbox --hide-scrollbars --virtual-time-budget=9000 `
  --window-size=1440,5200 --screenshot="salida.png" "file:///.../index.html"
```

Tres límites conocidos de ese método: **el iframe de Google Maps sale en blanco**
(dibuja sobre canvas y headless no lo pinta); **Chrome no baja de ~500 px de ancho**
de ventana, así que para revisar móvil hay que usar 500 px y no 420; y **dos
instancias a la vez se pisan** — si hacen falta varias capturas, van de una en una o
cada una con su `--user-data-dir`.

## Identidad visual

Navy **`#02164A`** y amarillo **`#FFC401`** son los colores oficiales, pero la página
los usa rebajados: el dorado de trabajo es `#F9C536` (`--gold`) y el navy oficial vive
dentro de degradados sobre una base más oscura y neutra. Todos los tokens están en
`:root` al inicio de `styles.css`.

Regla que sostiene ese look: **las secciones no llevan color de fondo propio**. Hay un
solo degradado continuo en `body` más una capa de luz ambiental fija en `body::before`,
y las secciones se separan con un filete dorado que se desvanece en los extremos
(`.section + .section::before`). Poner un `background` plano en una sección reintroduce
las costuras duras que se quitaron a propósito.

Contraste: el sitio cumple **WCAG AA**. Las combinaciones a respetar son `--muted`
sobre el fondo (7:1), dorado sobre el fondo (11:1) y **dorado de fondo solo con texto
navy encima** (`.btn--gold`, 11:1). Texto blanco sobre amarillo o amarillo sobre blanco
están prohibidos. El verde del botón flotante de WhatsApp va oscurecido a propósito
(`#0F7D44`): el `#25D366` de marca con texto blanco da 2:1 y no pasa AA. Los enlaces
van subrayados, porque el color no puede ser la única señal.

Tres tipografías, cada una con un papel: **Cinzel** para el nombre del doctor y el
título del hero, **Outfit** para títulos y botones, **Manrope** para el cuerpo y las
versalitas espaciadas. Se piden como rangos variables (`wght@400..700`), que Google
sirve en un solo archivo por familia.

### La marca

El logo del consultorio (`assets/logo.png`) **ya no se usa en la página**: lleva
escrito "MAXIN CENTRO ODONTOLÓGICO" dentro de la imagen y eso incumple R2. Se
conserva el archivo por si el cliente lo necesita para otra cosa.

En su lugar está `assets/marca.svg`: el mismo gesto del logo (anillo navy → dorado con
un diente dentro) pero **sin texto**, así que no anuncia ninguna categoría de
establecimiento. Se usa en el header, en el pie y como base del favicon
(`assets/favicon.svg`, el mismo diente sobre un cuadrado navy). El nombre del doctor
va siempre como texto HTML al lado, nunca dentro de una imagen.

### El retrato del hero

La firma de la página es el **retrato del doctor flotando en 3D** (`.retrato`), con un
anillo dorado orbitando por detrás — el mismo gesto que antes tenía el logo. Es 3D de
verdad: `perspective` en `.hero__stage`, `transform-style: preserve-3d` en `.retrato`
y `.retrato__inner`, la foto elevada con `translateZ(30px)`, así que al inclinar la
escena con el cursor se separa del halo y el aro que quedan detrás.

Si se toca esa parte, respetar la división de roles: **el float va en `.retrato` y la
inclinación del cursor en `.retrato__inner`**, porque una animación y una transformación
no pueden compartir la propiedad `transform`.

## Acoplamientos que no se ven en un solo archivo

- `main.js` es un IIFE en estilo ES5, sin módulos, cargado al final de `<body>`. Asume
  sin comprobar que existen `#header`, `#burger` y `#nav`: si se renombran, el script
  entero deja de correr. **Por eso `privacidad.html` no carga `main.js`** — no tiene
  menú; su cabecera se queda arriba con `position: sticky` vía `.legal-page .header`.
- Cada `<section>` tiene `id` (`inicio`, `como-trabajo`, `doctor`, `tratamientos`,
  `ubicacion`) y un `.nav__link` con `href="#id"`. El scrollspy compara ambos, así que
  una sección nueva necesita las dos cosas.
- **Contrato `.reveal`**: el CSS deja el elemento invisible y un IntersectionObserver le
  añade `.reveal--visible` al entrar en pantalla, escalonando con la custom property
  `--rd`. Es repetible: al salir se quita la clase. Markup nuevo sin `.reveal` aparece
  estático; con `.reveal` y el JS caído, queda invisible para siempre.
- `prefers-reduced-motion` se apaga en dos lados a la vez: un bloque `@media` al final
  del CSS que desactiva cada animación por nombre, y `main.js`, que además desactiva el
  paralaje del retrato. Toda animación nueva va también en ese bloque.
- **`height: auto` en imágenes con `aspect-ratio`**: los `<img>` llevan atributos
  `width`/`height` reales (por el CLS), y ese `height` gana sobre `aspect-ratio`. Sin
  `height: auto` la foto se estira a su alto natural — ya pasó con la del doctor.
- El botón flotante de WhatsApp tapa la esquina inferior derecha durante todo el scroll;
  el `padding-bottom` grande de `.footer` está puesto para que no se coma la línea legal.

## La foto del doctor

`assets/doctor.jpg` es la foto que subió el cliente, **cuadrada (1080×1080)** y sin
tocar. El marco (`.retrato__foto`), en cambio, es un **rectángulo vertical (4:5)** con
las cuatro esquinas redondeadas por igual (`border-radius: 34px`) — pedido explícito
del cliente: que se vea "más rectangular" y no cuadrado.

Como la foto es cuadrada y el marco no, `.retrato__foto` usa `object-fit: contain` (no
`cover`): la foto se ve **completa**, sin recortar los brazos cruzados, y el sobrante
queda como una banda arriba y abajo, rellena por el `background` en degradado del mismo
elemento — así no se ve un hueco vacío, se lee como una tarjeta a propósito.

Si algún día entra otra foto con otra proporción, hay que revisar si conviene volver a
`object-fit: cover` (foto llena el marco, se recorta lo que sobre) o mantener `contain`
(foto entera, con banda). Los atributos `width`/`height` del `<img>` van junto con el
`aspect-ratio` de la foto real (no el del marco): es lo que evita el salto de layout.

⚠️ **En esta foto el mandil lleva bordado "CIRUGÍA BUCAL Y MAXILOFACIAL — U.N.M.S.M."
de forma legible**, que es el rótulo de especialidad que R1 no permite exhibir mientras
no exista inscripción en el RNE (la instrucción P0.3 del encargo pedía sustituir la
imagen por una con mandil liso). Hubo una versión recortada a cabeza y hombros que
dejaba el bordado fuera y el cliente pidió la foto completa. **Queda avisado y es su
decisión; no revertirlo sin que él lo pida.**

Las dos salidas limpias siguen abiertas: una foto nueva con mandil blanco liso, o la
inscripción en el RNE, que hace decaer R1 para esa especialidad.

## Logos de redes sociales

El pie muestra Facebook, Instagram, TikTok, X y WhatsApp. Cada enlace trae **dos**
versiones del icono: un `<img>` que apunta a `assets/redes/<red>.webp` (los logos
oficiales que subió el cliente, ver [assets/redes/LEEME.txt](assets/redes/LEEME.txt)) y
un `<span class="social__mark">` con el logo dibujado en SVG.

El enlace nace con la clase `social--fallback`, que muestra el SVG; `main.js` la quita
solo cuando el archivo oficial carga de verdad. Así nunca se ve un icono roto y los
logos oficiales aparecen solos al subirse. Si se agrega otra red, hay que replicar las
dos capas y el nombre de archivo en el LEEME.

**Esos `<img>` no pueden llevar `loading="lazy"`.** Nacen con `display: none` (los tapa
la capa del SVG) y una imagen diferida que no tiene caja no se descarga nunca: el evento
`load` no llega, la clase `social--fallback` no se quita y el logo oficial no aparece
jamás. Ya pasó una vez, al añadir `lazy` a todas las imágenes por rendimiento.

## Mapa y NAP

Iframe de Google Maps sin API key, con el patrón `?q=<lat,lng>&output=embed`, y **un solo
botón**, "Cómo llegar", que abre la ficha del consultorio con el enlace corto que
compartió el cliente: `https://maps.app.goo.gl/Bfqwiv5R6mzu43Lx7`. Ese mismo enlace va en
`hasMap` del JSON-LD y en `DATOS.md`. Desde la ficha, Google ofrece "Indicaciones" a un
toque.

El iframe va por coordenadas (`-15.4792517,-70.1336446`, sacadas de resolver ese enlace)
y no por texto, para que el pin del mapa sea exactamente el del listado de Google y no
dependa de cómo geocodifique la dirección escrita.

Hubo dos botones ("Cómo llegar" con ruta directa y "Abrir en Google Maps" con la ficha);
al pedir el cliente que todos usaran su enlace, los dos hacían lo mismo y se dejó uno.

La dirección aparece literal en tres sitios del `index.html` (título de la sección,
tarjeta de datos y pie) más el JSON-LD y `privacidad.html` — al cambiarla hay que
actualizar también las coordenadas del iframe.

⚠️ **Discrepancia de NAP pendiente:** la web dice "**Av.** 3 de Octubre 322" y la ficha de
Google dice "**Jr.** 3 De Octubre 322, Juliaca 21102". Hay que unificar las dos (y decidir
si se añade el código postal). El código plus del local es `GVC8+7G Juliaca`.

El **NAP** (nombre, dirección, teléfono) tiene que ser idéntico entre la web, el JSON-LD
y el Perfil de Empresa de Google. Hoy no lo es: el perfil de Google todavía se llama
"Centro Odontológico Maxin". Eso lo cambia el cliente desde su cuenta, no se arregla
desde el código.

Las coordenadas del JSON-LD (`-15.4792517, -70.1336446`) salieron de resolver el enlace
corto de Maps que dio el cliente.

## Datos del cliente

Dr. Raul Sucari Cruz · Cirujano Dentista · COP N.º 24841 · WhatsApp +51 928 471 815 ·
sucari1201@gmail.com · Av. 3 de Octubre 322, Juliaca (Puno) · atención los fines de
semana previa cita · Egresado de la Segunda Especialidad en Cirugía Bucal y Maxilofacial
(UNMSM, cuatro años de residencia) · Egresado de la Segunda Especialidad en Periodoncia
e Implantología · Magíster en Salud Pública.

El mensaje prellenado de WhatsApp es el mismo en los cinco enlaces del sitio:
`https://wa.me/51928471815?text=Hola%20doctor%2C%20vi%20su%20p%C3%A1gina%20web%20y%20quisiera%20consultarle`

## Lo que falta (no está hecho)

- **Video de presentación del hero** (30–60 s, click-to-play, ≤ 4 MB): el cliente aún no
  lo ha grabado. La intro de entrada que había antes se eliminó por rendimiento y no
  vuelve.
- **Reseñas**: la sección está prevista en `index.html` como comentario. Entra cuando el
  Perfil de Empresa de Google tenga reseñas reales que mostrar, sin fotos de pacientes.
- **Imágenes en WebP**: siguen en JPEG (~100 KB cada una) porque en esta máquina no hay
  codificador WebP; las herramientas de Windows solo decodifican.
- **Minificar CSS/JS**: se dejó sin minificar a propósito. No hay build, los archivos se
  editan a mano y comprimidos pesan unos pocos KB.
- **Auditoría Lighthouse, Search Console, analítica y píxel de Meta**: pendientes, con el
  evento de conversión en los clics a WhatsApp cuando se instalen.
