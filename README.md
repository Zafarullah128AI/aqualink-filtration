# AquaLink Filtration — professional website (Entrepreneurship A-2)

Website for the A-2 assignment (due Monday 16 November 2026). Built from the
A-1 proposal / Business Model & Feasibility form. Supplier names, review counts
and plan prices are illustrative; the Rs 250 example bottle, 10% commission,
launch areas and year-1 figures are from the A-1 form.

## What it does
- Area filter + name search: FB Area, Gulshan, North Karachi, Gulistan-e-Jauhar (the 4 launch areas)
- 12 suppliers, prices Rs 160–350 per 19-litre bottle (within the proposal's
  Rs 130–400 range), ratings, reviews, delivery times, lab-tested badge, since year
  and bottles delivered
- Sort by lowest price / highest rating / fastest delivery
- Subscription plans: Weekly Saver (4 bottles/mo), Family Plan (8/mo), Office Plan
  (20/mo) — prices from the Rs 250 example bottle; choosing a plan fills the
  order form as a weekly recurring delivery
- Order form: quantity, one-time or weekly recurring, delivery day, name/address/phone
- Live order summary showing the 10% commission split (e.g. Rs 250 bottle →
  supplier Rs 225, AquaLink Rs 25). First-order Rs 50 off is deducted
  from the total on the first order placed on the device. Cash on delivery.
- My orders saved in the browser (localStorage) with order ID and a status
  timeline (Placed → Accepted → Out for delivery → Delivered), an
  "Update status" button and Cancel (before out for delivery)
- Why AquaLink features, "How it works" (4 steps), FAQ, founder section
  (Zafarullah Shah, 24BS(IT)128, SBBU), contact form + contact info,
  and the year-1 plan (20 partners, 3,000 bottles/month, Rs 502,500 revenue,
  ~Rs 436,500 profit, break-even ~2,500 bottles / ~5 months)

## Files
- `index.html`, `styles.css`, `app.js` — plain static site, no build step, no server needed
- Uses the Plus Jakarta Sans font from Google Fonts (falls back to system fonts offline)

## Live site
https://stunning-babka-5d5f64.netlify.app (deployed via Netlify Drop)

## How to get the working link for Classroom (2 minutes, free)
Option A — Netlify Drop (easiest, no account needed to try):
1. Open https://app.netlify.com/drop in your browser.
2. Drag the whole `aqualink-website` folder (or the zip) onto the page.
3. Copy the link it gives you (e.g. https://aqualink-....netlify.app) and paste it
   in your Classroom A-2 submission. (Re-deploy after any change to update the link.)

Option B — GitHub Pages: create a repo, upload these 3 files, enable Pages.

Option C — just to show it in class / in the recording: double-click `index.html`
— it works opened directly from the folder, no server needed.

## To test locally
`cd aqualink-website && python3 -m http.server 8002` then open http://localhost:8002
