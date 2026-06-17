# Leslie Simon Recruiting — Claude Code Handoff

## Project
Single-file website for a boutique executive recruiting firm. File lives at:
`~/Downloads/leslie-simon-talent.html`  
(or wherever you saved it from Cowork — open in Finder to confirm path)

## What's built
- Three-column layout: left sidebar nav | scrollable main | right tips panel
- **Hero:** ON Partners-style bold split layout — large headline left, firm description + "Start a Conversation" contact form right, proof stats strip below
- **About section:** boutique firm narrative + 15-step search process (from Dynamic Synergy)
- **Leslie's bio section:** real career story, photo slot (`leslie-simon.jpg` in same folder)
- **AI Tools tab:** Resume polish, LinkedIn enhancement, Executive Summary, Cover Letter (Claude API placeholder outputs, fashion industry — "Morgan A. Reyes" example)
- **Tips feed:** right panel, candidate + corporate tabs, JS data arrays
- **Accounts:** sign-up / login modal (JS in-memory, no localStorage)
- **Chat drawer:** three tabs — Forum, Message Leslie, Claude AI
- **WCAG 2.1 AA:** skip link → `#main-content`, all form inputs have `<label>`, `aria-*` on interactive elements, focus rings via `--focus-ring` CSS var, contrast ≥ 4.5:1 verified

## Color tokens (CSS custom properties)
```
--s900:#1e2a30  --s800:#2c3a42  --s700:#3d4f59  --s600:#4e6270
--s400:#7a9099  --s200:#c5d2d8  --s100:#dde6ea  --s50:#eef3f5
--bg:#e8edf0
--cu700:#8a5c38  --cu600:#b0733f  --cu500:#c49a6c
--cu400:#d4b48a  --cu300:#e8d0b0  --gold:#c8a96e
```

## Real contact info (already in file)
- Email: hello@lesliesimonrecruiting.com  
- LinkedIn: linkedin.com/in/lesliesimonrecruiting  
- Location: Denver, CO · National Reach

## Photo
Leslie's photo should be saved as `leslie-simon.jpg` in the same folder as the HTML. The `<img>` tag already references it; there's an initials fallback if missing.

## What's pending / next tasks
1. **Wire up Claude API** — replace simulated AI tool outputs with real `fetch()` calls to `https://api.anthropic.com/v1/messages`
2. **Background check integration** — Checkr or Sterling API for corporate vetting tab
3. **LinkedIn scrape/import** — paste-in candidate profile → auto-populate AI polish form
4. **Video interview prep module** — firm-specific question banks, AI coaching feedback
5. **Real form submission** — hero contact form + contact section → email via Resend/SendGrid or Formspree
6. **Responsive / mobile** — sidebar collapses to hamburger (button exists, CSS `@media` needed)
7. **Deploy** — suggested: Netlify drag-and-drop (free, instant HTTPS at lesliesimonrecruiting.com)

## Design references
- Layout template: bakasan.art (sidebar nav style)
- Hero pattern: ON Partners website
- Content/process: Dynamic Synergy (sites.google.com/a/laceos.com/dynamicsynergy/)
- Accessibility standard: WCAG 2.1 AA

## To run locally
```bash
cd /path/to/folder/with/html/file
python3 -m http.server 8080
# open http://localhost:8080/leslie-simon-talent.html
```
