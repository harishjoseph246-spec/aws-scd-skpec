# Student Community Day Puducherry 2026 — Landing Page

A React + Vite + Tailwind landing page for the AWS SBG SMVEC "Student Community Day
Puducherry 2026" event, matching the reference design (dark space theme, purple glow,
flip ticket, live countdown, track cards, hackathon banner, and perks list).

## Stack
- React 18 + Vite
- React Router
- Tailwind CSS
- Axios (mock API layer, ready to wire to a real backend)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo directly in the Vercel dashboard — it auto-detects Vite.

## Project structure

```
aws-student-day/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── api.js          # axios client + mock registration call
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Countdown.jsx   # live countdown to 25 Jul 2026, 8:00 AM IST
│   │   ├── Ticket.jsx      # flippable ticket (event info / full agenda)
│   │   ├── Tracks.jsx      # Technical Sessions, Workshops, Ad Panel & Q/A
│   │   ├── Hackathon.jsx   # #include 1.0 Hackathon banner
│   │   ├── WhyAttend.jsx   # perks list
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── Home.jsx        # assembles the full page flow
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Customizing

- **Event date**: change `EVENT_DATE` in `src/components/Countdown.jsx`.
- **Agenda**: edit the `agenda` array in `src/components/Ticket.jsx`.
- **Tracks**: edit the `tracks` array in `src/components/Tracks.jsx`.
- **Perks**: edit the `perks` array in `src/components/WhyAttend.jsx`.
- **Colors**: tune the `violet` / `accent` palette in `tailwind.config.js`.
- **Real registration backend**: point `VITE_API_BASE_URL` in a `.env` file at your
  API and swap the commented-out line in `src/assets/api.js`.
