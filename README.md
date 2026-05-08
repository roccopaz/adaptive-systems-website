# Adaptive Systems LLC — Front-end Site

Static, multi-page site for Adaptive Systems LLC (Nashville, TN). Vanilla
HTML/CSS/JS. No build step. No CDN dependencies. Section 508 / WCAG 2.1 AA
target. Print stylesheet for the capabilities page. Honeypot-only spam
protection on the contact form.

## Folder structure

```
/
├── index.html                  Home
├── capabilities.html           Capabilities (3 practice areas, services)
├── about.html                  About / Leadership
├── past-performance.html       Past performance ledger + template card
├── contact.html                Contact / teaming form
├── styles/
│   ├── main.css                All visual styles (scoped via CSS variables)
│   └── print.css               Print stylesheet (auto-loaded via media=print)
├── scripts/
│   └── main.js                 Mobile nav + form validation + honeypot
├── assets/
│   ├── logo.svg                Brand mark (SVG, swap with final logo)
│   ├── sdvosb-badge.svg        Placeholder SDVOSB badge
│   └── Adaptive-Systems-Capability-Statement.pdf   ← swap with real PDF
├── robots.txt
├── sitemap.xml
└── README.md
```

## What needs to be replaced before launch

These are the placeholders the friend / Ray needs to fill in. Search the
codebase for the literal string in **bold** to find each spot.

| Placeholder                | Files                              | Notes |
|----------------------------|------------------------------------|-------|
| **UEI**                    | `index.html`, footer of every page | Currently rendered as `—— —— —— ——` with a "Pending" pill. Replace the dashes with the 12-character UEI when SAM.gov registration completes. |
| **CAGE Code**              | `index.html`, footer of every page | Currently rendered as `—— —— ——` with a "Pending" pill. Replace dashes with the 5-character CAGE. |
| **SDVOSB designation**     | All pages — header, hero, trust bar, footer | Currently labeled "Pending". When VetCert approves, remove the "Pending" pill and update the relevant copy. |
| **NAICS codes**            | All pages, trust bar + footer | Defaults: 541330, 541611, 611512, 541990. Confirm or replace. |
| **Capability statement PDF** | `assets/Adaptive-Systems-Capability-Statement.pdf` | A placeholder file is in the repo to prevent broken download links. Replace with the real PDF; keep the same filename to avoid editing all five HTML files. |
| **Leadership bios**        | `about.html` — search for `[ Principal Name ]` | Four placeholder bio cards. Replace name, role, photo `<div class="bio__photo">`, and bio text. |
| **Leadership photos**      | `about.html` | Photos render as a dashed grey placeholder. To swap, replace the `<div class="bio__photo">` with `<img src="assets/leader-1.jpg" alt="..." class="bio__photo" />` (use the same dimensions: 96×120). |
| **Past performance entries** | `past-performance.html` — search for `<article class="contract-card">` | The page contains one template card. Duplicate the `<article>` block for each new awarded contract. Field order is fixed (Customer / Contract Type / PoP / Value / Description / Outcome). |
| **Contact form backend**   | `scripts/main.js` | Form validates client-side and shows a success message; **it does not POST anywhere yet.** Wire to the chosen handler (Formspree, Netlify Forms, AWS SES, etc.). The honeypot field is named `website` — your handler should silently drop submissions that include a value for that field. |
| **Domain in `sitemap.xml` and `robots.txt`** | `sitemap.xml`, `robots.txt` | Both reference `https://adaptivesystems.info/`. Confirm the production domain matches. |
| **Logo**                   | `assets/logo.svg` | Geometric placeholder mark. Replace with the final brand mark (SVG preferred for resolution + load speed). The header is sized for a 36×36 mark. |
| **Social links**            | Footer of every page | Not currently rendered. If LinkedIn or other social presence becomes appropriate, add a fifth column to the `<div class="site-footer__cols">`. |

## Accessibility

- One H1 per page; H2/H3 nest logically.
- Skip link on every page (first focusable element).
- All form fields have visible labels.
- Visible focus outline (2px gold) honors WCAG 2.1.
- Color contrast: body text passes 4.5:1; large text passes 3:1; gold accent
  is used only at large/decorative scale or against navy (passes 3:1).
- No CAPTCHA — honeypot only — to avoid breaking screen readers.
- `prefers-reduced-motion` is respected (no animations declared site-wide).

## Browser support

- Modern Chrome / Edge / Firefox / Safari.
- Reasonable degradation on older locked-down government Chrome / Edge.
- No `:has()`, no container queries, no view transitions, no bleeding-edge
  CSS. CSS variables are used (Edge 16+ / Chrome 49+ / Safari 9.1+).
- ES5-compatible JS — no arrow functions, template literals, `let`/`const`
  in user code paths, or `fetch`. Will run on older locked-down browsers.

## Performance

- No web fonts. System font stack only.
- No third-party JS. No analytics by default. (Add Google Analytics or
  Plausible after legal review if desired — both can be added with a
  single `<script>` tag near `</body>` on each page.)
- Total page weight < 50KB excluding the capability statement PDF.
- Initial paint target: under 2 seconds on government broadband.

## Print

The print stylesheet at `styles/print.css` is loaded with `media="print"`.
It hides nav/footer/CTAs and reformats the capabilities page for letter-size
printing — useful when contracting officers print capability statements.

## Third-party dependencies

**None.** Intentional, per the requirement to avoid CDN failures on
government networks. If you later add a form-backend service or analytics,
document them here.

## Local dev

There is no build step. Open any HTML file directly, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## License / ownership

© 2026 Adaptive Systems LLC. All rights reserved.
