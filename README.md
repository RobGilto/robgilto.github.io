# Robert Gilto — Web Resume

A single-page, static personal resume site targeting **agentic engineering / AI engineering** roles.

- Plain **HTML + CSS + vanilla JS**. No framework, no build step, no npm, no web fonts.
- Mobile-first and fully responsive (breakpoints at 640px, 768px, 1024px).
- Light, monochrome base with a single indigo accent.
- Accessible, semantic HTML5 + JSON-LD `Person` schema + Open Graph tags.
- Sticky nav with smooth-scroll and IntersectionObserver active-section highlighting.

## Files

```
web-resume/
├── index.html     # markup + SEO/meta + JSON-LD
├── styles.css     # all styling (design tokens, responsive)
├── main.js        # nav toggle (+ inert a11y), active-section highlight, footer year
├── assets/
│   ├── favicon.svg   # "RG" brand mark favicon
│   ├── og-card.svg   # source for the social share card
│   └── og-card.png   # 1200×630 OG/Twitter image (rsvg-convert og-card.svg -o og-card.png)
├── .gitignore
└── README.md      # this file
```

## Local preview

From this directory:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser. (Any static server works —
`python3 -m http.server` needs no install.)

To stop the server: press `Ctrl + C`.

## Deploy to GitHub Pages

This repo is meant to be pushed to the **user site**
`github.com/RobGilto/robgilto.github.io`, which GitHub Pages serves
automatically at `https://robgilto.github.io`.

### One-time setup

1. Create a **public** repository on GitHub named **exactly** `robgilto.github.io`
   (do not initialize it with a README — this repo already has history).

2. From this directory, point the repo at GitHub and push:

   ```bash
   git remote add origin git@github.com:RobGilto/robgilto.github.io.git
   git push -u origin main
   ```

   (If you prefer HTTPS instead of SSH:
   `git remote add origin https://github.com/RobGilto/robgilto.github.io.git`)

3. Wait ~1–2 minutes. For **user sites** (`<user>.github.io`), GitHub Pages is
   enabled automatically from the `main` branch root.

4. Visit **https://robgilto.github.io** — your site is live. 🚀

### Subsequent updates

```bash
git add -A
git commit -m "update: <what changed>"
git push
```

The site rebuilds and publishes automatically on each push to `main`.

### Verifying / troubleshooting

- GitHub repo → **Settings → Pages** shows build status and the live URL.
- If the page isn't live after a few minutes, confirm the branch is **`main`**
  and the source is **Deploy from a branch / root**.

## Notes

- All copy is sourced from the profile brief (`../_profile-source.md`) — no invented experience.
- Positioning is **hybrid**: leads with "AI-assisted engineering" + a spec-driven
  "How I work" section (truthful today); the stronger "agentic" claim is earned
  by a planned agentic showcase project (see below).
- **GitHub links point to `github.com/RobGilto`** (profile) and the showcase repo
  `github.com/RobGilto/repo_builder_elixir`. The repo must be **public** for the
  case-study/project links to resolve.
- If you edit `assets/og-card.svg`, regenerate the PNG:
  `cd assets && rsvg-convert og-card.svg -o og-card.png`.

## Featured case study

`case-studies/repo-builder.html` — a write-up of **repo_builder**, the agentic
orchestration platform (Elixir/Phoenix/OTP) that earns the agentic positioning.
Linked from the featured card in "Selected work".

## Deploy URL

Confirmed: the live site is **`https://robgilto.github.io`** (GitHub user
`RobGilto`). All absolute URLs in `index.html` and `case-studies/repo-builder.html`
(`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`image`) use it.
