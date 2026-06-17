# AGENTS.md

## Project Overview
This is a static website for Leslie Simon Talent, a boutique executive recruiting and career intelligence firm. The main page is `index.html`; related assets live in the same folder.

The site is currently a mostly single-file HTML/CSS/JavaScript project with local image assets:

- `index.html`
- `leslie-simon-talent.html`
- `leslie-simon.jpg`
- `leslie-simon-portrait.jpg`
- `HANDOFF-claude-code.md`

Read `HANDOFF-claude-code.md` before making changes. It contains the original Claude Code handoff, design references, color tokens, pending tasks, and local run instructions.

## Current Product Shape
- Three-column layout: left sidebar navigation, scrollable main content, right tips panel.
- Hero section with large editorial headline, firm description, contact form, and proof stats.
- About section with boutique recruiting narrative and 15-step search process.
- Leslie bio section with local photo support.
- AI tools tab with placeholder outputs.
- Tips feed with candidate and corporate tabs.
- Sign-up/login modal using in-memory JavaScript only.
- Chat drawer with Forum, Message Leslie, and Claude AI tabs.
- Accessibility target: WCAG 2.1 AA.

## Development Notes
- Prefer plain HTML, CSS, and vanilla JavaScript unless a task clearly requires a framework.
- Keep the project easy to open locally as static files.
- Preserve existing visual direction: refined executive recruiting, editorial, warm neutral metals, not a generic SaaS landing page.
- Do not remove accessibility features such as skip links, labels, ARIA attributes, visible focus states, and contrast-conscious color choices.
- Keep image references relative so the project remains portable.
- Do not add secrets or API keys directly to the HTML.

## Local Run Commands
From this folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/index.html
```

If testing the alternate file:

```text
http://localhost:8080/leslie-simon-talent.html
```

## Testing Checklist
Before finishing user-facing changes:

- Open the page in a browser.
- Check desktop and mobile widths.
- Verify navigation links still scroll to the correct sections.
- Verify forms, tabs, modals, and chat drawer interactions still work.
- Confirm no visible text overlaps or spills out of buttons/cards/panels.
- Confirm local images render correctly.
- Check browser console for JavaScript errors.

## Pending Ideas From Claude Handoff
- Replace simulated AI tool outputs with real backend/API calls.
- Add real form submission through a provider such as Resend, SendGrid, or Formspree.
- Add responsive mobile behavior for the sidebar and right panel.
- Add background check integration for corporate vetting.
- Add LinkedIn profile paste/import flow.
- Add video interview prep module.
- Deploy as a static site, for example with Netlify.
