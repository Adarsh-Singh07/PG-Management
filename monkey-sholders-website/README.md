# Monkey Sholders Co-living PG — Pitch Website (v2)

Live pitch site for Monkey Sholders Co-living PG, Nallurhalli, Whitefield, Bengaluru 560066.
Reverse-engineered from ff21.in and rebuilt to beat it — real property media only.

## Files
- `index.html` — main site (hero slideshow of real photos, pricing, Three.js 3D photo cylinder, real videos, Three.js 360° Street View pano viewer, amenities, real Google reviews, pinned move-in steps, location, FAQ, WhatsApp enquiry)
- `login.html` / `tenant.html` / `admin.html` — DIKOR-style demo dashboards (mock data)
- `assets/` — REAL media downloaded from the property's Google Maps listing (signed-in), enhanced (sharpen/colour/resize):
  9 photos + 2 video posters + `pano.jpg` (Street View equirect, panoid OaNF7J1yM3zPyQa2ubrs0Q) + `video-gym.mp4` (0:09) + `video-building.mp4` (0:10). Originals preserved locally in the project workspace (assets/raw).

## Media URLs
HTML hardcodes GitHub raw URLs for assets:
`https://raw.githubusercontent.com/Adarsh-Singh07/PG-Management/main/monkey-sholders-website/assets/<file>`
with automatic fallback to the local `assets/` path.

## Facts (client-confirmed 2026-10-17)
Twin ₹11,000 (was ₹12,000) · Single ₹18,000 (was ₹20,000) · all-inclusive (3 meals veg+non-veg, WiFi, electricity, housekeeping, laundry) · deposit ₹5,000 · booking ₹5,000 · notice 30 days · no minimum stay · 6 floors, co-living.
Contact: +91 80509 74846 (call + WhatsApp) · alt +91 98809 69606 — both verified on the property's signboard photos.
Google: 4.2★, 66 reviews.

## Deploy
Static site — Vercel project with root directory `monkey-sholders-website` in this repo, or any static host pointed at this folder.
