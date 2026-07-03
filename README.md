# CreNeev — Where Brands Begin (React)

A React + Vite version of the CreNeev marketing site. Same design and
behavior as the plain HTML/CSS/JS version, rebuilt as components.

## Structure

```
creneev-react/
├── index.html                  # Vite entry HTML (just mounts #root)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Assembles all sections in order
    ├── assets/                 # Static assets
    │   ├── images/
    │   └── icons/
    ├── styles/
    │   └── globals.css         # All design tokens, layout, animation CSS
    ├── hooks/
    │   ├── useInView.js        # IntersectionObserver hook (scroll reveal)
    │   └── useMagnetic.js      # Magnetic-pull hover effect for buttons
    └── components/
        ├── common/
        │   └── Reveal.jsx      # Wrapper that fades/slides children into view
        ├── layout/
        │   ├── Header.jsx
        │   └── Footer.jsx
        └── home/
            ├── Hero.jsx
            ├── Marquee.jsx
            ├── Industries.jsx
            ├── Services.jsx
            ├── Process.jsx
            ├── FeaturedWork.jsx
            ├── WhyUs.jsx
            ├── Testimonials.jsx
            ├── Pricing.jsx
            ├── FAQ.jsx
            └── FinalCTA.jsx
```

## Getting started

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Editing

- **Colors / fonts / spacing**: all CSS variables live at the top of
  `src/styles/globals.css` under `:root`.
- **Copy & content for each section**: most sections keep their content in a
  small array at the top of the component file (e.g. `SERVICES` in
  `Services.jsx`, `PLANS` in `Pricing.jsx`, `FAQS` in `FAQ.jsx`) — edit the
  array, the layout updates automatically.
- **Testimonials**: edit the `TESTIMONIALS` array in `Testimonials.jsx`; it
  auto-rotates every 6 seconds and supports the dot pagination.
- **Adding a new section**: create a component under `src/components/home/`,
  import it in `App.jsx`, and drop it in wherever you want it to appear.
- **Industry / project tile colors**: gradient classes (`.gi1`–`.gi10`,
  `.mb1`, `.mb2`) live in `src/styles/globals.css` — swap these for real
  `background-image` photography when you have it.

## Deploying

This is a static Vite build, so `npm run build` produces a `dist/` folder
you can deploy to GitHub Pages, Netlify, Vercel, or any static host.
