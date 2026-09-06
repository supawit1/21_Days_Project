# 21 Days with me(ow)

A 21-day habit tracker prototype (React + Vite + Tailwind).

## Run locally
```bash
npm install
npm run dev
```
Open the printed localhost URL.

## Deploy — easiest options

### Option A: Vercel (recommended, free)
1. Push this folder to a GitHub repo (or use `npx vercel` directly from this folder — no GitHub needed).
2. If using the CLI: `npm i -g vercel`, then run `vercel` inside this folder and follow the prompts.
3. If using GitHub: go to vercel.com → "Add New Project" → import the repo. Vercel auto-detects Vite; leave defaults and click Deploy.

### Option B: Netlify (also free, drag-and-drop)
1. Build the static files: `npm run build` (creates a `dist/` folder).
2. Go to app.netlify.com/drop and drag the `dist/` folder in. You'll get a live URL instantly.
3. Or connect the GitHub repo instead, with build command `npm run build` and publish directory `dist`.

### Option C: No install at all — CodeSandbox / StackBlitz
Upload this folder (or just `src/App.jsx`) to https://stackblitz.com/fork/react or https://codesandbox.io/s/react — it installs dependencies and gives you a shareable live link in the browser.

## Notes
- This is a front-end-only prototype: activity data lives in React state and resets on page reload. To persist data across sessions you'd add a backend or a database (e.g. Supabase, Firebase) and swap the in-memory `useState` calls for real reads/writes.
- Icons come from `lucide-react`; styling is Tailwind CSS.
