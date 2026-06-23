# Aqua Québec — Pool company website

A professional, bilingual (FR/EN) single-page marketing site for **Aqua Québec**,
a Québec-based pool construction and maintenance company.

Built from scratch as a static **HTML / CSS / JavaScript** site — no framework, no build step.

## Structure

```
index.html              Single-page site (Hero, Services, About, Gallery, Contact)
assets/
  css/styles.css        Design system + responsive layout
  js/i18n.js            Bilingual FR/EN dictionary + language switcher
  js/main.js            Sticky nav, mobile menu, scroll reveals, form validation
  img/                  Photography
```

## Features

- **Bilingual FR/EN** — instant language toggle, defaults to French, remembers the choice (`localStorage`)
- **Single-page scroll** with sticky header and smooth-scroll anchors
- **Responsive** down to mobile, with an accessible slide-in menu
- Aqua/turquoise design system, scroll-reveal animations, accessible focus states
- Contact form with front-end validation (no backend wired yet)

## Run locally

It's pure static files — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (Firebase Hosting)

`firebase.json` is configured to serve the repo root:

```bash
firebase deploy --only hosting
```

## Editing content

- **Text** lives in `assets/js/i18n.js` (one `fr` and one `en` block, matching `data-i18n` keys).
- **Images** live in `assets/img/`. Replace the files (keep the names) to swap photos.
- **Colors/fonts** are CSS variables at the top of `assets/css/styles.css`.

> Phone, email and stats in the contact section are placeholders — update them with the
> real business details.
