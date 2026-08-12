# Leslie Simon Talent Partners — Site Guide

Static site for lesliesimonrecruiting.com (executive recruiting).
No build step, no frameworks: plain HTML + one CSS file + a little vanilla JS.

## Hosting & deploy

- Hosted on **GitHub Pages** from the root of the `main` branch.
- Custom domain: **lesliesimonrecruiting.com** (the `CNAME` file in this repo — never delete it). DNS lives at GoDaddy.
- **Deploy = `git push origin main`.** Changes are live in ~30–60 seconds.
- `.nojekyll` must stay in the repo root (it prevents GitHub's Jekyll processing).

## File map

- `index.html` — the real site: a one-page layout with all sections ("slides"): Hero → Brand Experience (marquee) → About → Services → Contact.
- `about.html`, `services.html`, `contact.html` — standalone copies of those sections.
  **Any copy or content change must be made in BOTH `index.html` and the matching standalone page.** They drift otherwise.
- `css/styles.css` — all styling. CSS variables at the top define the palette.
- `js/main.js` — nav toggle + contact form submission.
- `images/logos/` — brand marquee SVGs, all recolored to champagne gold (see below).
- `images/favicon.png` — browser-tab icon (bold LS monogram tile).

## The cache-busting ritual (required)

Browsers cache the stylesheet hard. **After ANY change to `css/styles.css`,
bump the version string on the stylesheet link in ALL FOUR html files:**

```html
<link rel="stylesheet" href="css/styles.css?v=20260720a">
```

Increment the date/letter (e.g. `20260720a` → `20260720b`). One command does all files:

```bash
perl -pi -e 's{(href="css/styles\.css\?v=)[^"]*"}{${1}NEWVALUE"}' index.html about.html services.html contact.html
```

HTML-only changes do not need a bump.

## Design system

- Fonts: **Cormorant Garamond** (serif — headlines) + **Montserrat** (sans — body), loaded from Google Fonts.
- Palette (CSS vars in `:root`): ink `#17262b` (charcoal text), gold `#b98516`,
  gold-dark `#93630b` (icons/labels), mist `#e7f1f3` (robin's-egg section bg).
  Champagne gold for the brand marquee artwork: `#b08d3f`.
- Decorative rules/borders: thin 1px lines in translucent champagne gold (`rgba(176,141,63,.35–.6)`).
- Standards: min 14px font, 4.5:1 contrast, responsive at 375 / 768 / 1280.

## Brand marquee (Experience section)

- Logos in `images/logos/` are official SVGs (mostly from Wikimedia) with every
  fill rewritten: colored elements → champagne gold `#b08d3f`, white "knockout"
  elements → `#e7f1f3` (must equal the section's solid background — that's why
  `.brandbar-page` has a flat background, not a gradient).
- MLB Players Association has no usable vector logo; it is typeset text (`.logo-mlbpa`).
- The marquee is two identical `.marquee-set` divs animated `translateX(-50%)`
  for a seamless loop; keep the two sets identical when adding/removing a logo.
- Size tiers: `.logo-lg` 46px / `.logo-md` 32px / `.logo-sm` 24px tall, `.logo-xw` 180px wide
  (for ultra-wide thin wordmarks). Pick the tier that makes a new logo look optically equal.

## Icon system (Areas of Expertise, Services)

Inline SVGs, stroke style: `viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"`, colored by the
parent's `color: var(--gold-dark)`. (Exception: the Fashion & Apparel dress-form
icon uses a custom viewBox and its own class `.icon-fashion`.)

## CSS gotcha that already bit us once

Media-query overrides like `.icon-strip { … }` LOSE to two-class base selectors
like `.icon-strip.icon-strip--expertise`. When adding a modifier class to a grid
strip, also add the two-class selector inside the 860px/760px media queries, or
the strip won't collapse on phones (content gets clipped by the section's
`overflow: hidden`).

## Workflow (how to make any change)

1. Preview locally first — serve the folder and check in a browser:
   ```bash
   python3 -m http.server 8010
   ```
   then open http://localhost:8010 (append `?bust=1` if you see stale content).
2. Make the edit (remember: index.html + standalone page; CSS bump if styles changed).
3. Check mobile (375px), tablet (768px), desktop (1280px) — especially for
   horizontal overflow/clipping on phones.
4. Commit with a clear message and push:
   ```bash
   git add -A && git commit -m "describe the change" && git push origin main
   ```
5. Verify live at https://lesliesimonrecruiting.com after ~60s (hard-refresh).

## Contact form

Web3Forms (`data-lead-form` in contact pages) posts to api.web3forms.com with an
access key embedded in the form. Emails go to the address configured in the
Web3Forms account. Site email: hello@lesliesimonrecruiting.com (Google Workspace;
MX/SPF/DKIM managed at GoDaddy).
