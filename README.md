# ArcCross

Direct, privacy-first cross-device sharing between macOS, Windows, Linux, and Android devices — without unnecessary cloud uploads or accounts.

## Quick Start

```bash
npm install
npm run dev
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check (`tsc -b`) and build production assets (`dist/`) |
| `npm run preview` | Preview the production bundle locally |

## Project Structure

```text
ArcCross/
├── index.html                  # Landing page HTML entry point
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
├── docs/                       # Product, engineering, planning, and research docs
│   ├── README.md               # Specification pack index
│   ├── specs/                  # PRD, TRD, app flow, UI/UX brief, schemas, implementation plan
│   ├── planning/               # Roadmaps, team plans, beginner guide, and CSV backlogs
│   └── research/               # Competitive research brief
└── src/
    ├── App.tsx                 # Root entry rendering the public landing page
    ├── main.tsx                # React root mount
    ├── styles/
    │   └── landing.css         # Liquid Glass, dark/light theme, and motion styles
    └── pages/
        └── landing/            # Public landing page (/)
            ├── LandingPage.tsx
            ├── LandingThemeContext.tsx
            ├── index.ts
            ├── components/     # Logo, navigation, hardware mockups, glass card, and feature cards
            └── sections/       # Hero, statement, carousel, scroll experience, steps, privacy, CTA, footer
```

## Documentation

See [docs/README.md](docs/README.md) for the complete product specification pack, technical architecture documents, and milestone planning backlogs.
