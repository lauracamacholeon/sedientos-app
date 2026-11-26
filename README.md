# Sedientos Granizados 👅 — Carta en línea con pedido por WhatsApp

Hecha en **Angular 22** con prerender (la página se genera como HTML estático, así carga rápido
y se ve bien la vista previa cuando compartes el link).

## Probarla en tu computador

```bash
npm install
npm start          # abre http://localhost:4200
```

## Lo que vas a editar casi siempre

| Quiero cambiar…                         | Archivo                                   |
|-----------------------------------------|-------------------------------------------|
| Sabores, precios, tamaños, toppings     | `src/app/data/menu.ts`                    |
| WhatsApp, horario, dirección, pagos     | `src/app/data/menu.ts` → `CONFIG`         |
| Preguntas frecuentes, palabras de la franja | `src/app/data/menu.ts` → `FAQS`, `MARQUEE` |
| Colores (sacados del logo) y tipografías | `src/styles.scss` → `:root`              |
| Logo                                    | `public/img/logo.webp` (completo), `public/img/logo-icon.webp` (encabezado) |
| Avisos legales de alcohol               | `src/app/data/menu.ts` → `LEGAL`          |
| Título y descripción para Google/WhatsApp | `src/index.html`                        |

### Poner fotos reales
1. Guarda la foto en `public/img/` (mejor en `.webp`, cuadrada o vertical, máximo ~800 px).
2. En `menu.ts`, agrégale al producto: `image: 'img/limon.webp'`.
   Si un producto no tiene `image`, se dibuja el vaso con sus colores (`colors`).

### Peceras y neveritas
Con `flavorPick: true` el cliente debe escoger uno de los sabores de la categoría *Granizados*
antes de agregarlo. `shape` cambia el dibujo provisional: `'bowl'` (pecera), `'cooler'` (neverita), `'shot'`.

### Verificación de edad
Al entrar se pregunta si la persona es mayor de 18 (se recuerda en ese navegador). Está en
`src/app/components/age-gate/age-gate.ts`.

### Promos de un solo día
Ponle `days: [2]` al producto (0 = domingo, 1 = lunes … 6 = sábado). Los otros días aparece
como "Disponible martes" y no se puede pedir.

## Estructura

```
src/app/
  data/          menu.ts (la carta) y models.ts (tipos)
  services/      cart.service.ts (carrito + mensaje de WhatsApp), schedule.service.ts (abierto/cerrado),
                 ui.service.ts (paneles abiertos), storage.ts (guardar en el navegador)
  sections/      header, hero, marquee, favorites, menu, steps, info, gallery, faq, cta, footer
  components/    product-card, product-sheet (tamaño y toppings), cart-drawer, cart-bar, toast
  shared/        cup (vaso dibujado), icon, logo, money pipe, reveal (animación al hacer scroll)
```

El orden de las secciones está en `src/app/app.ts`.

## Publicar en Netlify

**Opción A — conectada a GitHub (recomendada):**
1. Sube este proyecto a un repositorio de GitHub.
2. En Netlify: *Add new project → Import an existing project → GitHub* y escoge el repo.
3. Netlify lee `netlify.toml` solo (compila con `npm run build` y publica `dist/sedientos/browser`).
   Cada vez que hagas `git push`, se actualiza la página.

**Opción B — arrastrar la carpeta:**
1. `npm run build`
2. En Netlify, *Add new project → Deploy manually* y arrastra la carpeta `dist/sedientos/browser`.

**Ojo con los créditos del plan gratis:** cada publicación a producción gasta créditos, así que
junta varios cambios antes de hacer `push`, en vez de publicar por cada coma.

## Dominio propio
En Netlify: *Domain management → Add a domain*. Puedes comprarlo ahí mismo o en otro lado
(por ejemplo un `.co`) y apuntarlo a Netlify.
