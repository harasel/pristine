# Pristine Headlight Heroes — Website

Premium static website for Pristine Headlight Heroes — mobile headlight restoration across the Bay Area.

## Stack
Pure HTML5 + CSS3 + Vanilla JavaScript. No build step. No frameworks.

## Hosting (GoDaddy / shared hosting)
Upload the entire `public/` directory contents to your hosting root (`public_html/`):

```
index.html
assets/
  css/style.css
  css/responsive.css
  js/script.js
  images/*.jpg / *.png
```

Works as-is on any static host.

## Sections
1. Sticky navigation (auto light/dark)
2. Cinematic hero with interactive Before/After slider
3. Trust cards
4. Before & After gallery (4 interactive comparisons)
5. Services
6. How It Works timeline
7. Photo upload + quote form
8. Appointment booking
9. Customer reviews
10. Service areas
11. FAQ accordion
12. Footer

## SEO
- Optimized title, meta description, OG/Twitter cards
- JSON-LD AutoRepair schema with aggregateRating
- Semantic HTML, alt text on every image
- Targets keywords: Headlight Restoration San Jose, Mobile Headlight Restoration, Bay Area Headlight Restoration, Foggy Headlight Repair

## Customizing
- Phone: search `(408) 555 0199`
- Email: search `hello@pristineheadlightheroes.com`
- Colors: `assets/css/style.css` → `:root`
- Add gallery items: duplicate a `.gallery-card` block in `index.html`

## WordPress / Elementor
Every section uses clean, reusable markup with semantic class names — directly portable to Elementor sections/columns.
