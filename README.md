# Steven Jonathan - Personal Website

A personal portfolio website for Steven Jonathan - Network Engineer, Cybersecurity Analyst, and Software Developer. Built with Astro, Vue 3, and TailwindCSS v4.

**Live site:**
- [stevjo.my.id](https://stevjo.my.id)
- [stevenjonathan.my.id](https://stevenjonathan.my.id)

## Tech Stack

- **Framework:** Astro (SSG/SSR)
- **UI Components:** Vue 3 (Islands Architecture)
- **Styling:** TailwindCSS v4
- **Animations:** GSAP
- **Icons:** Lucide Vue Next
- **Package Manager:** Bun

## Features

- About / summary section
- Work experience & organizational experience
- Projects showcase
- Skills & technical competencies
- Education & competition history
- Links to LinkedIn, GitHub, CV, Instagram, and WhatsApp
- Zero-JS by default (Astro Islands for interactive components)
- Perfect SEO and lightning-fast loading

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `^20.19.0` or `>=22.12.0`
- [Bun](https://bun.sh/) `>=1.0.0` *(recommended package manager)*

### Install dependencies

```sh
bun install
```

### Start development server

```sh
bun run dev
```

### Build for production

```sh
bun run build
```

### Preview production build

```sh
bun run preview
```

## Project Structure

```text
personal-website/
├── public/          # Static assets (CV, favicon, etc.)
├── src/
│   ├── assets/      # Global CSS files
│   ├── data/
│   │   └── profile.js   # All profile content (edit this to update the site)
│   ├── components/  # Vue components
│   ├── layouts/     # Astro layouts (SEO meta tags, HTML shell)
│   ├── pages/       # Astro pages (Routing)
│   └── App.vue      # Root Vue component (injected into Astro)
└── astro.config.mjs # Astro configuration
```

## Customization

All personal content is centralized in [`src/data/profile.js`](./src/data/profile.js). Edit that file to update:

- Name, headline, location, email, and social links
- Summary / about text
- Education, work, and experience entries
- Projects, skills, and competition history