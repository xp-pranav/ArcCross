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
├── index.html                  # Application HTML entry point
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
├── docs/                       # Product, engineering, planning, and research docs
│   ├── README.md               # Specification pack index
│   ├── specs/                  # PRD, TRD, app flow, UI/UX brief, schemas, implementation plan
│   ├── planning/               # Roadmaps, team plans, beginner guide, and CSV backlogs
│   └── research/               # Competitive research brief
└── src/
    ├── App.tsx                 # Route configuration (/ and /app/*)
    ├── main.tsx                # React root mount
    ├── context/                # Application state context (AppContext)
    ├── data/                   # Mock devices and transfer fixtures
    ├── types/                  # Shared TypeScript interfaces
    ├── styles/                 # Design tokens, app globals, and scoped landing CSS
    ├── components/             # Shared UI primitives, modals, and app shell chrome
    └── pages/
        ├── landing/            # Public landing page (/)
        │   ├── LandingPage.tsx
        │   ├── components/     # Navigation, hardware mockups, and interactive feature cards
        │   └── sections/       # Hero, statement, carousel, scroll experience, steps, privacy, CTA, footer
        └── app/                # Interactive workspace routes (/app/*)
            ├── DevicesPage.tsx
            ├── TransfersPage.tsx
            ├── SettingsPage.tsx
            └── WelcomePage.tsx
```

## Documentation

See [docs/README.md](docs/README.md) for the complete product specification pack, technical architecture documents, and milestone planning backlogs.
