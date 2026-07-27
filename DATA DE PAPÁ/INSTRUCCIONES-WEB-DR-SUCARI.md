# Instrucciones de refactorización — Web Dr. Raúl Sucari Cruz

> **Para Claude Code.** Este documento describe los cambios a aplicar sobre el sitio actual (`https://drogueriasuker-glitch.github.io/Raul-Sucari/`). Lee primero las **Restricciones absolutas**: son requisitos legales, no preferencias de diseño. Si una tarea entra en conflicto con ellas, gana la restricción.

---

## 0. Contexto del proyecto

El sitio actual está construido como marca de un establecimiento llamado **"MAXIN Centro Odontológico"**. Debe convertirse en una **landing page de marca personal** del profesional:

**Dr. Raúl Sucari Cruz** — Cirujano Dentista, COP N.º 24841 — Juliaca, Puno, Perú.

Dos razones para el cambio:

1. **Estratégica.** En cirugía e implantes el paciente elige al cirujano, no al local. La marca personal convierte mejor y acompaña al profesional si cambia de sede.
2. **Normativa.** El establecimiento **no tiene categorización de centro odontológico (I-3)** ante la autoridad sanitaria; su categoría realista es consultorio individual (I-1). Publicar "Centro Odontológico" en una web indexada es afirmar una categoría de establecimiento que no posee.

**Objetivo de negocio del sitio:** que un visitante llegue (por QR de tarjeta, redes o búsqueda en Google), confíe en el profesional y **escriba por WhatsApp**. WhatsApp es el canal de cierre; todo el diseño debe empujar hacia ahí.

---

## 1. Restricciones absolutas (no negociables)

Estas reglas provienen del Código de Ética y Deontología del Colegio Odontológico del Perú (vigente 16.02.2024) y de la Ley 29733 de Protección de Datos Personales. **No las incumplas ni siquiera parcialmente, y no las revirtáis en refactorizaciones futuras.**

| # | Regla | Fundamento |
|---|---|---|
| R1 | **Prohibido** usar las palabras "Especialista", "Cirujano Maxilofacial", "Periodoncista" o "Implantólogo" como título o condición del profesional. | Arts. 18, 19 y 93 — la especialidad requiere inscripción previa en el Registro Nacional de Especialistas (RNE), aún no obtenida. |
| R2 | **Prohibido** usar "Centro Odontológico", "Clínica" o "Policlínico" como categoría del establecimiento. Solo "consultorio" o mención de la dirección. | El local no está categorizado como I-3. |
| R3 | **Prohibido** mencionar precios, costos, presupuestos, promociones, descuentos, gratuidad, canje, sorteos, concursos o premios. | Art. 96. |
| R4 | **Prohibido** publicar fotos o videos de pacientes (incluidos "antes y después") sin consentimiento escrito específico de uso de imagen. Por ahora: **cero imágenes de pacientes**. | Arts. 40 y 78 + Ley 29733. |
| R5 | **Obligatorio** publicar política de privacidad y aviso de tratamiento de datos si la web capta contactos. | Ley 29733 y su reglamento DS 016-2024-JUS. |
| R6 | **Prohibido** afirmar cifras que no se puedan respaldar documentalmente. | Art. 93 (información falsa o alterada). |

**Sí está permitido y debe aprovecharse:** nombre y apellidos, título profesional ("Cirujano Dentista"), número de colegiatura (COP N.º 24841), grados académicos ("Magíster en Salud Pública"), formación universitaria como hecho ("Egresado de la Segunda Especialidad en… — UNMSM"), dirección, teléfono, email, web, redes sociales y horario de atención (Art. 92).

---

## 2. Tareas P0 — Bloqueantes

**Ninguna difusión del sitio (QR, tarjetas, redes, anuncios) debe ocurrir hasta que estas cinco tareas estén completas.**

### P0.1 — Reemplazo de marca en todo el sitio

Buscar y reemplazar todas las apariciones de la marca del establecimiento por la marca personal.

| Ubicación | Actual | Nuevo |
|---|---|---|
| `<title>` | `MAXIN Centro Odontológico — Dr. Raúl Sucari Cruz` | `Dr. Raúl Sucari Cruz — Cirujano Dentista en Juliaca` |
| `<meta name="description">` | (versión centrada en MAXIN) | `Cirujano Dentista en Juliaca. Implantes dentales, cirugía oral y extracción de terceras molares. COP N.º 24841. Escríbeme por WhatsApp.` |
| Logo / navegación | `MAXIN Centro Odontológico` | `Dr. Raúl Sucari Cruz` |
| Footer / copyright | `© 2026 MAXIN Centro Odontológico` | `© 2026 Dr. Raúl Sucari Cruz — Cirujano Dentista · COP N.º 24841` |
| Cualquier `alt`, `aria-label` o `og:` que mencione MAXIN | — | Sustituir por el nombre del doctor |

Revisar además: `og:title`, `og:description`, `og:site_name`, `twitter:card`, favicon/manifest, y el nombre que aparezca en la ficha del mapa embebido.

### P0.2 — Corregir la mención de especialidad

**Eliminar** el texto actual del hero:

```
Estudios de especialidad concluidos en Cirugía Oral y Maxilofacial
```

**Reemplazar** por la línea de credenciales conforme:

```
Cirujano Dentista · COP N.º 24841
Egresado de la Segunda Especialidad en Cirugía Bucal y Maxilofacial — Universidad Nacional Mayor de San Marcos
Egresado de la Segunda Especialidad en Periodoncia e Implantología
Magíster en Salud Pública
```

Notas de redacción:
- "Egresado de la Segunda Especialidad en…" es un hecho verificable y es la convención académica peruana estándar. Comunica el prestigio sin atribuir una condición no acreditada.
- **San Marcos es el activo de confianza más fuerte del sitio.** Consignarla como "Universidad Nacional Mayor de San Marcos — Decana de América, fundada en 1551" es legítimo y debe destacarse visualmente.
- Los servicios se describen en primera persona como actos ("Realizo extracción de terceras molares retenidas, cirugía oral e implantes dentales"), **nunca** con la fórmula "Soy especialista en…".

### P0.3 — Eliminar el rótulo de especialidad en imágenes

En el `alt` de la foto principal:

- Actual: `...con su mandil de Cirugía Bucal y Maxilofacial`
- Nuevo: `El Dr. Raúl Sucari Cruz, Cirujano Dentista`

Si alguna imagen muestra un mandil, cartel o bordado con el texto de la especialidad de forma legible y protagónica, sustituir esa imagen. Una foto profesional con mandil blanco liso es preferible.

### P0.4 — Eliminar todo lenguaje de precio

| Actual | Nuevo |
|---|---|
| `…y te digo el costo antes de empezar` | `…te explico tu caso con la radiografía en la mano y planificamos juntos el tratamiento` |
| `Presupuesto claro antes de empezar. Conoces el costo completo…` | `Plan de tratamiento explicado paso a paso, antes de decidir` |

Barrer el sitio completo buscando: `costo`, `precio`, `presupuesto`, `S/`, `soles`, `gratis`, `descuento`, `promoción`, `oferta`. El beneficio real a comunicar es **claridad y previsibilidad del tratamiento**, no el dinero.

### P0.5 — Página de política de privacidad

Crear `privacidad.html` (o sección equivalente) enlazada desde el footer, que incluya:

- Identificación del responsable del tratamiento (nombre, COP, dirección, email de contacto).
- Finalidad de la recolección: atención de consultas y coordinación de citas.
- Mención de que los **datos de salud son datos sensibles** y requieren consentimiento explícito.
- Derechos ARCO (acceso, rectificación, cancelación, oposición) y cómo ejercerlos.
- Política de cookies si se instala analítica o píxel de Meta.

Si existe algún formulario de contacto, añadir un checkbox de consentimiento **no premarcado**.

---

## 3. Tareas P1 — Conversión

### P1.1 — Estructura de secciones

Reorganizar (o confirmar) el orden de la landing:

1. **Hero** — Nombre + descriptor + propuesta de valor en una frase + video de presentación + CTA de WhatsApp. Debe funcionar aunque el video no cargue.
2. **Barra de confianza** — COP N.º 24841 · UNMSM · Magíster en Salud Pública · años de experiencia.
3. **Cómo trabajo** — Beneficios centrados en el paciente: diagnóstico con radiografía en mano, un solo profesional de principio a fin, seguimiento postoperatorio personal.
4. **Sobre el Dr. Sucari** — Foto real + trayectoria + credenciales. Es el corazón de la marca personal.
5. **Tratamientos** — Descripción educativa (qué es, para qué sirve, cuándo se necesita). Priorizar: implantes dentales, extracción de terceras molares retenidas, cirugía oral, tratamiento de encías, injertos óseos.
6. **Reseñas** — Integrar reseñas de Google Business Profile cuando existan. Sin fotos de pacientes.
7. **Ubicación** — Dirección (Av. 3 de Octubre 322, Juliaca), mapa, horario de atención.
8. **CTA final** — WhatsApp.
9. **Footer** — NAP consistente, redes sociales, enlace a política de privacidad.

Renombrar los encabezados con enfoque de establecimiento:
- `Así es el lugar donde te vas a atender` → `Cómo trabajo contigo`
- `En MAXIN atiendo yo mismo cada etapa…` → `Yo mismo atiendo cada etapa de tu tratamiento`

### P1.2 — Botón flotante de WhatsApp

Botón persistente, visible durante todo el scroll, esquina inferior derecha, con `aria-label` descriptivo. Enlace `wa.me` con mensaje prellenado:

```
https://wa.me/51XXXXXXXXX?text=Hola%20doctor%2C%20vi%20su%20p%C3%A1gina%20web%20y%20quisiera%20consultarle
```

Este es el CTA principal del sitio. Todos los demás CTA deben apuntar al mismo destino.

### P1.3 — Video de presentación (hero)

- **Duración:** 30–60 segundos.
- **Reproducción:** click-to-play con imagen poster del doctor. **Nunca autoplay con sonido.** Si se usa autoplay, solo silenciado y con subtítulos.
- **Peso:** H.264 comprimido, ≤ 4 MB. `preload="none"`, lazy-load, nunca bloqueando el render crítico.
- **Un solo video** en toda la landing.
- **Guion sugerido:** gancho en los primeros 5 segundos ("Hola, soy el Dr. Raúl Sucari…") → qué hace → cómo trabaja → CTA ("escríbeme por WhatsApp y coordinamos tu cita").

### P1.4 — Revisar cifras no verificadas

Las afirmaciones `+20 años` y `10 000 pacientes atendidos` deben respaldarse documentalmente o reformularse:

- `+20 años` → `Más de dos décadas de práctica clínica en Juliaca` (si es exacto).
- `10 000 pacientes atendidos` → eliminar salvo que exista registro que lo sustente.

---

## 4. Tareas P2 — Rendimiento, accesibilidad y SEO

### P2.1 — Paleta y contraste (WCAG 2.1 nivel AA)

Paleta: **azul marino `#02164A`** + **amarillo** de acento.

| Uso | Regla |
|---|---|
| Fondos de sección | Azul marino con texto blanco |
| Texto de cuerpo | Azul marino o negro sobre blanco / gris muy claro |
| Amarillo | **Solo acentos y botones**, siempre con texto azul marino oscuro encima |
| Prohibido | Texto blanco sobre amarillo; amarillo sobre blanco |

Requisitos: contraste ≥ **4.5:1** para texto normal y ≥ **3:1** para texto grande (≥18 pt o ≥14 pt en negrita). Estados `hover` y `focus` visualmente distintos. No transmitir información solo por color: subrayar enlaces y apoyar con iconos. Verificar cada combinación con WebAIM Contrast Checker o las herramientas de accesibilidad de Chrome antes de publicar.

### P2.2 — Rendimiento

Objetivo: **carga < 2 s en móvil**. El tráfico será mayoritariamente móvil y por datos celulares.

- **Eliminar la intro animada del logo** (`intro.webm` / `intro.gif`). Retrasa el LCP y aporta poco.
- Convertir imágenes a **WebP**, comprimidas y dimensionadas al tamaño real de render.
- `loading="lazy"` en todas las imágenes bajo el pliegue y en el iframe del mapa de Google.
- Minificar CSS y JS.
- Auditar con Lighthouse / PageSpeed Insights y dejar registro del score.

### P2.3 — SEO local

**Palabras clave objetivo:** `cirujano dentista Juliaca`, `implantes dentales Juliaca`, `muelas del juicio Juliaca`, `cirugía oral Juliaca`, `extracción terceras molares Juliaca`, `periodoncia Puno`.

**Datos estructurados:** añadir JSON-LD con los tipos específicos **`Dentist`** y **`Physician`** (no el genérico `LocalBusiness`). Incluir: `name`, `address` (PostalAddress), `geo`, `telephone`, `openingHours`, `url`, `image`, `sameAs` (Facebook, Instagram, TikTok). Conectar entidades con `@id`.

**NAP consistente:** nombre, dirección y teléfono **idénticos** entre la web, el JSON-LD y el Google Business Profile. Cualquier discrepancia debilita ambas señales.

Añadir también: `sitemap.xml`, `robots.txt` y registro en Google Search Console.

### P2.4 — Infraestructura

- Dominio propio en lugar de `usuario.github.io` (mejor imagen profesional y SEO).
- **HTTPS forzado** (opción "Enforce HTTPS" en GitHub Pages, certificado gratuito).
- Google Analytics + píxel de Meta, con **evento de conversión en los clics al botón de WhatsApp** (es la métrica de negocio real).

---

## 5. Fase futura — Al inscribir cada especialidad en el RNE

**No ejecutar hasta recibir confirmación explícita de que la inscripción está hecha.**

Secuencia real del trámite: llega el título → se tramita la inscripción en el RNE → **recién entonces** se habilita el término "especialista". El título por sí solo no basta.

Cuando llegue la confirmación, actualizar en este orden: web → JSON-LD → Google Business Profile → redes sociales → tarjetas.

**Periodoncia e Implantología (primero, estimado antes):**
```
Cirujano Dentista · Especialista en Periodoncia e Implantología
COP N.º 24841 · RNE N.º ___
```

**Cirugía Bucal y Maxilofacial (después):**
```
Cirujano Dentista · Especialista en Cirugía Bucal y Maxilofacial
COP N.º 24841 · RNE N.º ___
```

A partir de ese momento decaen las restricciones **R1** (para la especialidad efectivamente inscrita) y la limitación sobre el mandil rotulado. **R2, R3, R4, R5 y R6 siguen vigentes de forma permanente.**

La restricción **R2** solo decae si el establecimiento obtiene categorización I-3 ante la autoridad sanitaria, lo cual no está previsto en el local actual.

---

## 6. Checklist de verificación final

Antes de dar por cerrada la refactorización:

- [ ] Búsqueda global de `MAXIN` → 0 resultados
- [ ] Búsqueda global de `Centro Odontológico` → 0 resultados
- [ ] Búsqueda global de `Especialista` / `Maxilofacial` como título → 0 resultados (solo permitido dentro de "Egresado de la Segunda Especialidad en…")
- [ ] Búsqueda global de `costo` / `precio` / `presupuesto` / `S/` → 0 resultados
- [ ] Política de privacidad publicada y enlazada desde el footer
- [ ] Botón de WhatsApp flotante funcional en móvil y escritorio
- [ ] Todas las combinaciones de color verificadas con checker de contraste AA
- [ ] Lighthouse móvil auditado, carga < 2 s
- [ ] JSON-LD válido según Rich Results Test de Google
- [ ] NAP idéntico en web, JSON-LD y Google Business Profile
- [ ] Sin imágenes de pacientes
- [ ] Cifras del hero respaldadas o reformuladas
