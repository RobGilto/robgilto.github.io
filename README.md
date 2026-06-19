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
├── main.js        # nav toggle, active-section highlight, footer year
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
`github.com/robertgilto/robertgilto.github.io`, which GitHub Pages serves
automatically at `https://robertgilto.github.io`.

### One-time setup

1. Create a **public** repository on GitHub named **exactly** `robertgilto.github.io`
   (do not initialize it with a README — this repo already has history).

2. From this directory, point the repo at GitHub and push:

   ```bash
   git remote add origin git@github.com:robertgilto/robertgilto.github.io.git
   git push -u origin main
   ```

   (If you prefer HTTPS instead of SSH:
   `git remote add origin https://github.com/robertgilto/robertgilto.github.io.git`)

3. Wait ~1–2 minutes. For **user sites** (`<user>.github.io`), GitHub Pages is
   enabled automatically from the `main` branch root.

4. Visit **https://robertgilto.github.io** — your site is live. 🚀

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

- All copy is sourced from the profile brief — no invented experience.
- The GitHub contact link is a placeholder (`href="#"`) until
  `github.com/robertgilto` exists. Search the HTML for the `TODO:` comment to
  update it.
