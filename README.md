# Yuan Junhao — Personal Academic Homepage

A static personal academic homepage built with Next.js and deployed with GitHub Pages.

## Local development

Install dependencies and start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

## Content and structure

- Personal details, education, publications, awards, projects, and research interests are maintained in `src/data/content.ts`.
- The page composition lives in `src/app/page.tsx`.
- Images used by the website belong in `public/`.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`. It builds a static export into `out/` and publishes it to GitHub Pages.

This repository is a GitHub Pages user site, so it is served from the root domain associated with `usagi1210.github.io`.

## Build

```bash
npm run build
```

The project uses `output: 'export'`, producing deployable static files in `out/`.
