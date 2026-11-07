# Bunny — Portfolio

A single-page, dependency-free-at-runtime portfolio for **Bunny**, a frontend web developer. Built with HTML5, Tailwind CSS (compiled ahead of time), vanilla JavaScript, and an interactive HTML5 canvas graph demo.

**Live site:** <https://flr-bunny-dev.github.io/Portfolio/>

## Features

- Responsive glassmorphism UI with ambient gradients
- Interactive coordinate-graph sandbox (mouse, touch, and keyboard)
- Copy-to-clipboard email action with a legacy fallback
- Animated hover spotlight that respects `prefers-reduced-motion`
- Same-document View Transitions (`document.startViewTransition`) for in-page anchor navigation, with reduced-motion fallback
- No runtime third-party scripts, styles, or fonts
- Strict Content-Security-Policy, no inline JavaScript or inline event handlers
- Accessibility: skip link, landmarks, labels, visible focus rings, live regions, keyboard-operable canvas

## Project structure

```text
.
├── index.html                  # Markup only (no inline CSS/JS)
├── assets/
│   ├── css/styles.css          # Generated Tailwind build — do not edit by hand
│   ├── js/app.js               # All page behaviour
│   ├── fonts/                  # Self-hosted Inter + Orbitron (latin, woff2)
│   ├── img/                    # Avatar placeholder + favicon
│   └── vendor/fontawesome/     # Self-hosted Font Awesome 6.4.0 (CSS + woff2)
├── src/input.css               # Tailwind directives + custom component CSS
├── tailwind.config.js          # Theme, colours, animations, content paths
├── package.json                # Build scripts and pinned dev dependency
├── package-lock.json
├── robots.txt
└── sitemap.xml
```

## Local development

Requirements: Node.js 18+ (or any version supported by Tailwind CSS 3) and Python 3.

```bash
npm ci
npm run build     # compile src/input.css -> assets/css/styles.css
npm run serve     # http://127.0.0.1:8080
```

Use `npm run watch` while editing if you add or change Tailwind utility classes. The generated `assets/css/styles.css` is committed so GitHub Pages can serve it directly.

If you only edit content in `index.html` that does **not** introduce new Tailwind classes, a rebuild is not required.

## Customisation

| What | Where |
| --- | --- |
| Profile photo | `index.html` — change the `#avatar` `src`. The bundled `assets/img/avatar.svg` is a placeholder. |
| Email address | `index.html` — update `#emailText` **and** both `mailto:` links. Verify the address before publishing. |
| GitHub / project links | `index.html` — hero links, featured project, and footer. |
| Colours and animations | `tailwind.config.js` and `src/input.css`, then run `npm run build`. |
| Canonical / Open Graph URLs | `index.html`, `robots.txt`, and `sitemap.xml` if the deployment URL changes. |

## Security model

This is a static site, so there is no server-side input handling, database, authentication, or secrets. The hardening therefore focuses on supply chain, injection surface, and response policy.

What is in place:

- **No third-party runtime code.** Tailwind is compiled to static CSS instead of using the Tailwind Play CDN. Font Awesome, Inter, and Orbitron are served from this origin. A compromised CDN cannot execute JavaScript on the page.
- **No inline code.** All JavaScript lives in `assets/js/app.js`; all CSS lives in local stylesheets. There are no `onclick`/`onerror` handlers and no inline `<style>`/`<script>` blocks.
- **Content-Security-Policy** in a `<meta>` tag: `default-src 'none'`, scripts/styles/fonts/images restricted to `'self'`, no connections, objects, frames, forms, or base-url changes.
- **Safe DOM APIs.** User-controlled data is never written with `innerHTML`, `document.write`, or `eval`. The graph and clipboard features use `textContent` and the Canvas API.
- **Hardened external links.** Every `target="_blank"` link uses `rel="noopener noreferrer"` to prevent tabnabbing and referrer leakage.
- **Clipboard safety.** The Clipboard API is used in secure contexts, with a guarded `execCommand` fallback for older browsers. Failures are surfaced to the user.
- **Reduced motion.** Animations and transitions are disabled for visitors who request it.
- **Dependency hygiene.** Tailwind is pinned in `package.json`/`package-lock.json`. Run `npm audit` after dependency changes.
- **No secrets.** A scan of the full git history found no API keys, tokens, passwords, or private keys. Never commit `.env` files.

### GitHub Pages header limitation

GitHub Pages cannot set custom HTTP response headers. A CSP delivered with `<meta>` cannot enforce `frame-ancestors`, `report-uri`, or `sandbox`, so clickjacking cannot be fully prevented at the origin. If the site is later served through Cloudflare, Netlify, Vercel, or another proxy, add response headers such as:

```http
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

If you move to Cloudflare, a `_headers` file (Netlify/Cloudflare Pages) or a Transform Rule can apply these.

### Reporting a vulnerability

Please open a private security advisory on GitHub rather than a public issue: <https://github.com/FLR-Bunny-dev/Portfolio/security/advisories/new>.

## Accessibility

- Skip-to-content link
- Semantic landmarks (`main`, `header`, `footer`, `section`) and one `h1`
- Decorative Font Awesome icons are hidden from assistive technology; icon-only links have accessible names
- Visible `:focus-visible` outline
- Graph canvas is focusable and operable with arrow keys, Enter/Space, and Home
- Point updates are announced through an `aria-live` region
- Motion is disabled under `prefers-reduced-motion: reduce`

## Deployment

The repository is configured for GitHub Pages from the `main` branch root:

1. Commit the generated `assets/css/styles.css` and all assets.
2. Push to `main`.
3. In **Settings → Pages**, serve from the `main` branch, root folder.
4. Confirm HTTPS is enabled.

No build step runs on GitHub Pages, so always rebuild before committing CSS changes.

## Licence and attributions

- Site code: MIT — see [LICENSE](LICENSE).
- [Inter](https://github.com/rsms/inter) — SIL Open Font License 1.1 (`assets/fonts/LICENSE-Inter.txt`).
- [Orbitron](https://github.com/theleagueof/orbitron) — SIL Open Font License 1.1 (`assets/fonts/LICENSE-Orbitron.txt`).
- [Font Awesome Free 6.4.0](https://fontawesome.com) — Font Awesome Free License (`assets/vendor/fontawesome/LICENSE.txt`).
- [Tailwind CSS 3.4.17](https://tailwindcss.com) — MIT.
