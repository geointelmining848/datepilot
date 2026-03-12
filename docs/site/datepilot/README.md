# DatePilot GitHub Pages Publish Guide

This folder is the source for DatePilot's public support/privacy pages.

## Expected public URLs
After publishing through the `geointelmining848/datepilot` repository Pages setup, these should resolve:

- `https://geointelmining848.github.io/datepilot/`
- `https://geointelmining848.github.io/datepilot/support.html`
- `https://geointelmining848.github.io/datepilot/privacy.html`

## Files
- `index.html` → lightweight redirect to support
- `support.html` → support page
- `privacy.html` → privacy policy

## Recommended GitHub Pages setup
1. Push this workspace to the `geointelmining848/datepilot` repository.
2. In GitHub repo settings, enable **Pages** with **GitHub Actions** as the source.
3. Keep the included workflow at `.github/workflows/datepilot-pages.yml`.
4. Push to `main` to publish updates automatically.

## Notes
- The mobile app already points its Settings links at these GitHub Pages URLs.
- If a custom domain is added later, update the app URLs and page links together.
