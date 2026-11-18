# N&D Insurance — Website

Static marketing website for N&D Insurance. Plain HTML, CSS and JavaScript — no build step, no framework. Works on GitHub Pages, Netlify, Namecheap hosting or any web host.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `auto.html` | Auto insurance |
| `homeowners.html` | Home insurance |
| `life.html` | Life insurance |
| `business.html` | Business insurance |
| `about.html` | About Nader and the team |
| `contact.html` | Contact info, message form, map |
| `quote.html` | Step-by-step quote request |

```
styles.css         shared styles and animations
main.js            quote form + scroll animation fallback
logo-*.png, favicon.png  logos and site icon
```

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `nd-insurance-website`).
2. Upload everything in this folder (drag and drop on the repo page, or use `git push`).
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<username>.github.io/nd-insurance-website/`.

### Use your own domain (Namecheap)

1. In **Settings → Pages → Custom domain**, enter the domain (e.g. `www.yourdomain.com`) and save. GitHub creates a `CNAME` file.
2. In Namecheap → **Domain List → Manage → Advanced DNS**, add:
   - `CNAME` record: host `www` → value `<username>.github.io`
   - `A` records: host `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Back in GitHub Pages, tick **Enforce HTTPS** once it's available.

## Before going live — fill in the placeholders

Search all files for `[` to find every placeholder:

- `[PHONE]`, `[EMAIL]`, `[STREET ADDRESS]`, `[CITY]`, `[ZIP]`, `[HOURS]`
- `[LANGUAGES]`, `[LICENSE #]`
- Nader's bio, team names and roles
- `[GOOGLE REVIEWS LINK]` and the three client reviews — **real reviews only**, with permission
- `[REQUIRED CARRIER DISCLOSURE]` in the footer — get the exact wording from the carrier and have the site approved before launch

Phone links use `tel:[PHONE]` — replace with digits only, e.g. `tel:+14695551234`.

## Adding photos

Every photo spot is a `<div role="img" ...>` with a `[PHOTO: ...]` label describing the shot. To swap one in:

1. Upload the image to the top level of the repository (JPG or WebP, under ~400 KB; hero images about 2400 px wide).
2. In that div's `style`, replace the `background: linear-gradient(...)` with
   `background: url('your-photo.jpg') center / cover no-repeat;`
3. Delete the `<span>[PHOTO: ...]</span>` label inside it, and update `aria-label` to describe the photo.

## Receiving form submissions

GitHub Pages can't process forms by itself. Use a free service like [Formspree](https://formspree.io):

- **Quote form:** create a form, then paste its URL into `QUOTE_ENDPOINT` at the top of `main.js`.
- **Contact form:** replace `[FORM ENDPOINT, ...]` in `contact.html` with the same kind of URL.

## Map

In Google Maps, find the office → **Share → Embed a map** → copy the `<iframe>` and paste it in place of the `[PHOTO: Google Map ...]` block on `contact.html` (give the iframe `width="100%" height="100%" style="border:0"`).

## Effects

- Sticky menu (desktop), word-by-word headlines, slow hero zoom, gold button shimmer
- Cards lift on hover; sections rise in on scroll (CSS scroll animations in Chrome/Edge, JavaScript fallback elsewhere)
- All motion is turned off for visitors with "reduce motion" enabled
