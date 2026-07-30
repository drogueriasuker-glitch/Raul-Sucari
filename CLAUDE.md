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

Dentro de la web esa redacción vive en **dos** sitios, no en uno: la lista
`.hero__formacion` y la barra de confianza (`.trust__list`, "2.ª Especialidad"). En el
JSON-LD no hay nada que corregir sino que **añadir**: hoy solo declara como
`hasCredential` la colegiatura y el Magíster, ninguna de las dos especialidades.

## Publicación

El dominio es **https://drsucari.com** (comprado en Vercel el 30-07-2026, con
renovación automática) y lo sirve **Vercel** desde el repositorio
`drogueriasuker-glitch/Raul-Sucari` (público), rama `main`, en el equipo **Suker**.
`www.drsucari.com` va con un **308 permanente** hacia el dominio sin www.

Publicar un cambio sigue siendo `git push`: Vercel reconstruye solo en menos de un
minuto. No hay CI ni paso de build; Vercel detecta que es HTML plano y lo sirve tal cual.
Nada puede depender de rutas propias del alojamiento — todas las rutas del sitio son
relativas y deben seguir siéndolo.

⚠️ **GitHub Pages sigue activo** en
https://drogueriasuker-glitch.github.io/Raul-Sucari/ y eso es contenido duplicado: dos
direcciones sirviendo la misma web. Los `canonical` ya apuntan todos a `drsucari.com`,
que es lo que lo neutraliza, pero **queda pendiente apagar Pages** en Settings → Pages
del repositorio.

**Las URL absolutas que exige el protocolo** son la única excepción a lo de las rutas
relativas: `canonical`, las etiquetas `og:`/`twitter:`, los `@id` y las `url`/`image` del
JSON-LD (13 en `index.html`), el `canonical` de `privacidad.html`, las dos `<loc>` de
`sitemap.xml` y la línea `Sitemap:` de `robots.txt`. Si el dominio vuelve a cambiar, hay
que tocar los seis archivos —esos cinco más el enlace del `README.md`— y **todas tienen
que decir exactamente lo mismo**: `https://drsucari.com`, sin www y con la barra final
donde toque. Una sola discrepancia le da a Google dos direcciones distintas.

`sitemap.xml` lleva un `<lastmod>` por página (hoy `2026-07-30` en las dos); al cambiar
el contenido de una, se actualiza el suyo. `privacidad.html` tiene además su propia
fecha visible, "Última actualización", que va junto con el texto legal, no con el
sitemap.

La autenticación de `gh` no está configurada en la máquina; el token vive en el Gestor
de Credenciales de Windows y se recupera con `git credential fill` (usuario
`drogueriasuker-glitch`).

## Ver los cambios

No hay comando de build. Se abre el archivo:

```powershell
Invoke-Item index.html
```

Al editar CSS/JS hace falta recarga forzada (Ctrl+F5).

En el móvil no hay recarga forzada que valga: Safari en iOS se queda con el CSS viejo
durante días y un arreglo publicado parece no haber llegado. Por eso los dos HTML piden
la hoja como `css/styles.css?v=N`, e `index.html` pide igual `js/main.js?v=N`. **Al
corregir algo que solo se ve en el teléfono, hay que subir el número en los tres sitios
a la vez** —la hoja en los dos HTML y el script en `index.html`—, o el cliente seguirá
viendo el fallo y dirá que no se arregló. Hoy los tres van en `?v=6`; si no coinciden,
alguno está sirviendo un archivo viejo.

Para capturas headless (Chrome está en `C:\Program Files\Google\Chrome\Application`;
el comando que localiza ese ejecutable está preaprobado en `.claude/settings.json`):

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

Regla que sostiene ese look: **las secciones no llevan color de fondo propio**. Todo el
fondo —el degradado de base y la luz ambiental— vive en una sola capa, `body::before`,
fija al viewport y con `z-index: -1`; las secciones se separan con un filete dorado que
se desvanece en los extremos (`.section + .section::before`). Poner un `background`
plano en una sección reintroduce las costuras duras que se quitaron a propósito.

⚠️ **Nunca `background-attachment: fixed`.** El degradado estuvo así y en iOS Safari
dejaba una banda blanca al bajar: la propiedad está rota ahí, y cuando la barra de
direcciones se colapsa y el viewport crece, la franja recién descubierta no se repinta.
El elemento fijo hace lo mismo y lo pintan todos los navegadores. Por el mismo motivo
`html` lleva `background` sólido y `color-scheme: dark` —tiñe la barra del navegador y
el rebote del scroll— y **todo hueco que tarde en llenarse necesita fondo propio**: le
pasó a `.place__map`, que con el iframe en `loading="lazy"` enseñaba 440 px de blanco
hasta que Google respondía.

Contraste: el sitio cumple **WCAG AA**. Las combinaciones a respetar son `--muted`
sobre el fondo (7:1), dorado sobre el fondo (11:1) y **dorado de fondo solo con texto
navy encima** (`.btn--gold`, 11:1). Texto blanco sobre amarillo o amarillo sobre blanco
están prohibidos. El verde del botón flotante de WhatsApp va oscurecido a propósito
(`#0F7D44`): el `#25D366` de marca con texto blanco da 2:1 y no pasa AA. Los enlaces
van subrayados, porque el color no puede ser la única señal.

Tres tipografías, cada una con un papel: **Playfair Display** para el nombre del doctor
y el título del hero, **Outfit** para títulos y botones, **Manrope** para el cuerpo y
las versalitas espaciadas. Se piden como rangos variables (`wght@400..700`), que Google
sirve en un solo archivo por familia.

La serif de marca **fue Cinzel y no debe volver**: Cinzel está dibujada solo con
versalitas, así que "Dr. Raul Sucari Cruz" se leía todo en mayúsculas. Playfair tiene
minúsculas de verdad. El cambio arrastra el interletrado, que va junto con la familia:
Cinzel pedía tracking abierto (`letter-spacing` positivo) porque iba en caja alta;
Playfair lo pide **casi nulo en el nombre** (header y pie) y **negativo en
`.hero__title`**, donde a ese cuerpo una serif de alto contraste se ve suelta.

⚠️ **La URL de Google Fonts está duplicada en `index.html` y en `privacidad.html`** y
tiene que ser idéntica en las dos. Cambiar una familia son tres sitios: el `<link>` de
cada HTML más `--font-brand` en `:root`; si se olvida `privacidad.html`, la legal cae al
`Georgia` de respaldo sin que nada falle a la vista.

### La marca

La marca es el **monograma RS** que subió el cliente: R dorada y S navy. No lleva texto
dentro de la imagen, así que no anuncia ninguna categoría de establecimiento (R2). El
nombre del doctor va siempre como texto HTML al lado, nunca dentro de una imagen.

Hay tres archivos y conviene no confundirlos:

| Archivo | Para qué |
|---|---|
| `assets/logo.PNG` | El original del cliente, 2168×1984. **No se enlaza desde ninguna página**: es la fuente de la que salen los otros dos. |
| `assets/marca.png` | 128×128 con transparencia. Header de los **dos** HTML y pie de `index.html`. |
| `assets/favicon.png` | 64×64 **con fondo oscuro sólido**, a propósito: en una pestaña clara un PNG transparente dejaría el monograma suelto; así se lee como pastilla en claro y en oscuro. |

⚠️ El original **no tiene canal alfa** (`Format24bppRgb`): el fondo es negro opaco. Puesto
tal cual en el header se ve un cuadrado negro sobre el degradado. Si hay que regenerar
`marca.png`, el arte es luz sobre negro —o sea, ya premultiplicado por su propio alfa—,
así que la conversión correcta es **`alfa = max(R,G,B)` y el color dividido por ese
alfa**, con un piso (~26) por debajo del cual el píxel se va del todo. Un recorte por
umbral duro deja halo negro; sin el piso queda un cuadrado con un 5 % de opacidad que se
nota sobre cualquier fondo claro. La caja de las letras se busca con umbral alto (~70),
porque el glow llega hasta el borde del lienzo y con umbral bajo la caja sale siendo la
imagen entera.

Los `width`/`height` de esos `<img>` van a 128×128 (las dimensiones reales), pero **quien
manda es el CSS**: 54 px en `.brand__logo` y 62 px en `.footer__brand img`.

**La S navy pierde legibilidad a tamaño pequeño**, sobre todo en escritorio: sobre el
fondo de la página, que es casi negro, queda como una mancha oscura y el monograma se lee
casi como una "R" sola. Es una propiedad del logo, no del código. Si molesta, las salidas
son aclarar la S o devolverle al header la pastilla de fondo oscuro que lleva el favicon.

`assets/logo.png` **era** el logo del consultorio con "MAXIN CENTRO ODONTOLÓGICO" escrito
dentro (incumplía R2) y el cliente lo sobrescribió con el monograma. Si alguna vez hace
falta, sigue en el historial de git. `assets/marca.svg` y `assets/favicon.svg` —el anillo
con el diente— ya no se usan; se conservan por si acaso.

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
- Cada `<section>` tiene `id` (`inicio`, `como-trabajo`, `tratamientos`, `ubicacion`) y
  un `.nav__link` con `href="#id"`. El scrollspy compara ambos, así que una sección nueva
  necesita las dos cosas.
- **Hubo una sección "El doctor" (`#doctor`) y el cliente pidió quitarla.** Se fue entera
  con su CSS (`.doctor__*`, `.actos*`, `.formacion*`, `.cv*`) y con sus enlaces de menú y
  de pie. La formación completa y el COP siguen visibles en `.hero__formacion`, así que no
  se perdió ningún dato exigible. El JSON-LD **sí conserva** `@id … #doctor`: ahí es el
  identificador de la entidad `Person`, no un ancla de la página, y sigue siendo válido.
- ⚠️ **Nada de `backdrop-filter`, `filter` ni `transform` en `.header`** mientras el menú
  móvil pueda estar abierto. El panel del menú es un `position: fixed` **hijo del
  header**, y cualquiera de esas propiedades convierte al header en su bloque contenedor:
  el `bottom: 0` del panel deja de medirse contra el viewport y pasa a medirse contra los
  76 px del header, así que el menú sale cortado justo debajo de "Inicio". Además el
  header se vuelve *backdrop root* y el `backdrop-filter` del propio panel deja de
  difuminar bien: la foto del hero se transparenta encima del menú. Pasaba solo **al
  bajar**, porque el filtro llega con `.header--scrolled` a partir de 20 px de scroll, y
  por eso no se veía nunca en escritorio ni con la página arriba del todo. La salida es
  la clase `.menu-abierto` que `main.js` pone en `<html>` mientras el panel está abierto:
  le quita el filtro al header.
- **El menú móvil se cierra solo al desplazarse**, y es a propósito: lo pidió el cliente.
  Lo hace `onScroll` en `main.js`, comparando contra la posición que había al abrirlo
  (`scrollAlAbrir`) con un margen de 10 px, para que no lo cierren los pocos píxeles que
  se mueve la página cuando se colapsa la barra del navegador móvil. Por eso **no hay que
  bloquear el scroll** (`overflow: hidden`) con el panel abierto: con la página quieta el
  cierre no se dispararía nunca. El header y el menú comparten bloque al inicio del
  archivo porque `onScroll` usa `nav`, y corre una vez nada más cargar.
- **Jerarquía de encabezados en Tratamientos**: `h2` la sección, `h3` cada
  `.grupo__titulo` y **`h4` las `.card__title` que van dentro de un grupo**. La única
  `.card__title` que es `h3` es la de "Consulta y diagnóstico", porque esa tarjeta no
  cuelga de ningún grupo. Estuvieron todas en `h3` y Google leía "Implantes dentales"
  como hermano de "Periodoncia e Implantología Oral" en vez de como parte suya. El
  estilo va por clase, así que el nivel de etiqueta no cambia nada visualmente: una
  tarjeta nueva dentro de un grupo se ve igual con `h3` o con `h4`, y por eso es fácil
  equivocarse sin notarlo.
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

**Qué foto va en cada sitio** (el cliente pidió este orden expresamente): arriba, en el
marco 3D del hero, va la **foto del consultorio**; abajo, en "Cómo trabajo", va el
**retrato del doctor**. Es al revés de como nació el sitio — la nota estratégica del
encargo dice que "el paciente elige al cirujano, no al local" —, así que si alguien lo
ve raro, es una decisión del cliente, no un descuido.

Al intercambiarlas hay que mover tres cosas juntas, o algo queda mal:

1. El `aspect-ratio` de cada marco, porque las dos fotos son opuestas.
2. El `<link rel="preload">` del `<head>`, que debe apuntar **a la imagen del hero**
   (es la que manda en el LCP).
3. El `loading="lazy"`: lo lleva la de abajo, nunca la del hero.

El `og:image`/`twitter:image` **no entra en el intercambio**: sigue apuntando a
`assets/doctor.jpg` en los dos HTML, porque en redes se comparte a la persona.

`assets/doctor.jpg` es **cuadrada (1080×1080)**, sin tocar, y **su marco no lleva
`aspect-ratio` en escritorio**: `.office__inner` va con `align-items: stretch` y la foto
se estira al alto de la columna de texto (`height: 100%` + `object-fit: cover`), lo que
da un recorte de ~0,82 — todavía por dentro de los codos. `aspect-ratio: 9 / 10` está
**solo por debajo de 980 px** ([styles.css:1270](css/styles.css#L1270)), donde la sección
pasa a una columna y ese alto de referencia desaparece; sin él la foto colapsa. Si crece
mucho el texto de "Cómo trabajo", hay que comprobar que el estirado no empiece a cortarle
las manos cruzadas.

`assets/consultorio.jpg` es **apaisada (1300×726)** y su marco va en `aspect-ratio: 3 / 2`
([styles.css:534](css/styles.css#L534)): recorta poco y deja el alto de la foto a la par
del de la columna de texto, del "Juliaca · Puno" a los botones. Fue `4/3` mientras el hero
tenía la columna más angosta. Por lo mismo `.retrato` **no lleva `max-width`**: al
encogerlo se pierde esa alineación.

Los archivos originales sin recortar están en `assets/originales/` — es de ahí de donde
se vuelve a salir si hay que remedir un encuadre.

Los atributos `width`/`height` de cada `<img>` van con las dimensiones **reales del
archivo** (no las del marco): es lo que evita el salto de layout.

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

El mensaje prellenado de WhatsApp es el mismo en los **seis** enlaces del sitio —cinco en
`index.html` (menú, hero, franja de cita, pie y botón flotante) y uno en
`privacidad.html`—, así que cambiarlo es buscar `wa.me/51928471815` en los dos archivos:
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
