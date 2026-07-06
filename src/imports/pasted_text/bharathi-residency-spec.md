# Bharathi Residency — Website Feature Spec

**Property:** Bharathi Residency, Electronic City Phase 2, Bengaluru
**Owners:** Murali Babu — 9790377717 | Akshay Kumar M — 9994400311
**Amenities:** Lift, Cauvery/Corporation water + Borewell, Semi-furnished units, Friendly owners on-site

---

## 1. Unit Mix & Floor-Wise Availability

This is the core of the site — a **live-style availability table**, not just a photo gallery. Renters searching for a flat want to see vacancy status at a glance.

| Floor | Units | Status (editable) |
|---|---|---|
| Ground Floor (GF) | 1 × 2BHK, 1 × Shop | ⬜ Vacant / 🟩 Occupied |
| First Floor (FF) | 1 × 1BHK, 1 × 2BHK | ⬜ / 🟩 |
| Second Floor (SF) | 1 × 1BHK, 1 × 2BHK | ⬜ / 🟩 |
| Third Floor (TF) | 1 × 1BHK, 1 × 2BHK | ⬜ / 🟩 |
| Fourth Floor | 1 × 1BHK | ⬜ / 🟩 |

**Total:** 4 × 1BHK, 4 × 2BHK, 1 Shop

- Use a simple color-coded grid (green = occupied, grey = vacant, gold = "vacating soon") so a visiting lead instantly knows what's open without calling first.
- Update this manually each time a unit is vacated/filled — even a plain table on the page works, doesn't need to be automated.

---

## 2. Pages

1. **Home** — hero photo of the building, quick pitch (lift, water supply, semi-furnished, friendly owners), floor availability snapshot, contact CTA
2. **Floor Plans & Availability** — the table above, expanded with photos per unit
3. **Photo Gallery** — organized by:
   - Building exterior / entrance / lift
   - Each unit type (1BHK, 2BHK) — kitchen, hall, bedroom, bathroom
   - Shop space (if GF shop is for lease)
   - Common areas (terrace, parking, water tank/borewell setup)
4. **For Prospective Tenants** (the "leads visiting seeking rent" page) — this is the one you specifically asked for. Based on your standard rental agreement format, display the terms as a **template** (unit-specific details left as blanks/dashes, filled in per flat when a lead enquires):

   **Rental Terms & Conditions (template)**
   - Monthly rent: ₹ **— / month**, payable on or before the 10th of every English calendar month
   - Advance/security deposit: ₹ **—** (paid in cash, interest-free, refundable at vacating)
   - Agreement period: **11 months** from date of move-in, renewable with mutual consent and a **5% rent enhancement** on renewal
   - Usage: **Residential purpose only** — no subletting or unauthorized alterations
   - Electricity & water charges: paid by tenant directly to the concerned department (water billed at **— /litre** where applicable)
   - Notice period: **1 month's notice** on either side required to end tenancy
   - Damages: tenant responsible for repair costs; deducted from deposit if unpaid
   - Painting charges: **one month's rent** (or equivalent) payable/deducted at vacating
   - Unit includes: **— hall, — kitchen, — bedroom(s), attached bathroom**, with electricity & water connection
   - Fittings provided: **— fans, — geyser, — light points** (varies per unit — confirm at viewing)

   - **Documents needed to move in**: ID proof (Aadhaar/PAN), address proof, passport photos, police verification (if required)
   - Move-in checklist: what's fitted vs. what tenant needs to bring
   - Full signed agreement is prepared per-unit at the time of leasing (on stamp paper, registered as per Karnataka norms) — the site should state clearly that this page is a **summary of standard terms**, not the final legal agreement
5. **Location & Connectivity** — map + what's nearby (tech parks, bus stops, hospitals, schools in E City Phase 2)
6. **Contact** — both owner numbers, WhatsApp click-to-chat, enquiry form

---

## 3. Enquiry Pop-up (as requested)

- Triggers **60 seconds after landing** on the site
- Copy idea: *"Looking for a flat in Electronic City Phase 2? Tell us what you need — we'll call you back."*
- Fields: Name, Phone, Preferred unit (1BHK / 2BHK / Shop), Move-in timeframe
- On submit: auto-send to WhatsApp (Murali Babu / Akshay) or email, so leads land directly with the owners
- Show once per visit only (don't re-trigger if dismissed)

---

## 4. Location & Map

- Embed the Google Maps pin for Bharathi Residency, Electronic City Phase 2 (use your share link: https://share.google/f6syv3lYzoMYDpXAA — grab the full address from that pin and drop it into the embed code)
- "Get Directions" button linking to Maps navigation
- Mention proximity to Electronic City Phase 1 & 2 tech parks, NICE Road, Hosur Road — big draw for IT-working tenants
- Add **LocalBusiness/Residence schema markup** with the address for local SEO

---

## 5. SEO for Electronic City Phase 2

Target phrases to weave into page titles, headers, and body copy:
- "1BHK for rent Electronic City Phase 2"
- "2BHK for rent Electronic City Phase 2"
- "semi furnished flat Electronic City Phase 2"
- "flat for rent near [nearby tech park/landmark]"
- "shop for rent Electronic City Phase 2"
- Google Business Profile listing for "Bharathi Residency" — critical for local map-pack visibility, more valuable than the website itself for a small rental property
- Encourage tenant reviews on Google (builds trust for future leads)

---

## 6. Trust & Practical Features

- **Owner contact cards** with both numbers — "friendly owners" is a real selling point in Bangalore rental hunting, make it visible, not buried
- **WhatsApp click-to-chat button** (sticky, mobile) — most flat-hunting in Bangalore happens over WhatsApp
- **Amenities checklist** — lift, borewell + corporation water (dual water source is a big deal in E City, call it out clearly), semi-furnished, parking (if available)
- **FAQ section**: Is water 24/7? Is parking available? Are pets allowed? Broker or no-broker? Any brokerage fee?
- **Testimonials from current/past tenants** if you can get 2-3 quotes — huge trust signal for a small independent property
- **Google Reviews widget** — embed your Google Business Profile reviews directly on the Home and Contact pages (via embed widget or simple "See our reviews on Google" button linking to the listing). For a small independent rental property, real Google reviews carry more trust than anything else on the site — prioritize getting a Google Business Profile set up if you don't have one yet, then embed it

---

## 7a. Mobile-Friendly Requirements (priority)

Since most leads will land on this site from a WhatsApp share or Google search on their phone, treat mobile as the primary experience, not an afterthought:
- Single-column layout on mobile — no side-by-side tables that force horizontal scrolling (the floor availability table should collapse into stacked cards on small screens)
- Large tap targets for the WhatsApp button, call button, and enquiry form fields
- Sticky bottom bar on mobile with **Call** and **WhatsApp** buttons always visible
- Compressed, fast-loading images (photos are the main content — don't let them slow the site down on mobile data)
- Popup should be sized to fit mobile screens without requiring zoom/scroll to close it

---

## 7. Inspiration References

| Reference | What to borrow |
|---|---|
| **Apartment/multifamily leasing sites (Market Apartments, Resident360)** | Clear floor-plan + availability grid as the centerpiece of the homepage, not buried in a subpage |
| **Real estate portal sites (NYC portal-style)** | Bold "Enquire Now" CTA directly on the hero image |
| **Vacation rental sites (Cape Town villa example)** | Full-width photo galleries per unit — treat each flat like its own mini listing |
| **General leasing best practice** | Action-driven CTA copy — instead of "Contact Us" use "Check Vacancy Now" or "Book a Visit Today" |
| **General leasing best practice** | Google Reviews embedded directly on site — the single strongest trust signal for small rental properties |

Overall direction: keep it simple and functional — a clean grid-based single page (or few pages) with big photos, a clear vacancy table, and the phone numbers/WhatsApp button visible everywhere. This isn't a luxury-brand site; it should feel like a well-organized, trustworthy local listing that answers "is there a flat available and how do I rent it" in under 30 seconds.

---

## 8. Nice-to-Have (Later)

- Simple "Notify me" opt-in for when a unit becomes vacant
- Rent payment reminders / online rent payment link (if you want to modernize collection)
- Tenant-only page listing maintenance contacts (plumber, electrician) once someone moves in