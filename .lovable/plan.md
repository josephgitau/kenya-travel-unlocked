

# Mobile Header Dropdown & Contact Info Update Plan

## Overview

This plan addresses three distinct issues:
1. **Transparent Mobile Header Dropdown** - The mobile navigation menu has no background when overlaying the hero section, making text unreadable
2. **Trust Badge Update** - Replace "TRA Licensed" and "KATO Member" badges with "East Africa Tour Guides & Drivers Association"
3. **Contact Info Update** - Change phone to 0722792069 and email to erickokungu90@gmail.com across all files

---

## Issue 1: Mobile Header Dropdown Transparency

### Problem
On tablet and mobile devices, when the mobile menu opens over the hero section (which has an image background), the menu content blends with the hero image because the menu container lacks a solid background.

### Root Cause
The mobile menu container at line 182-231 in `Header.tsx` inherits the transparent header background when at the top of the page (homepage). The menu items need their own opaque background.

### Solution
Add a solid background with blur effect to the mobile menu container that activates regardless of scroll position:
- Apply `bg-card/95 backdrop-blur-lg` to the mobile menu wrapper
- Add `rounded-xl` with slight margin for visual polish
- Ensure proper contrast for all text

---

## Issue 2: Trust Badges Update

### Current State
Footer displays two trust badges:
- "TRA Licensed - Tourism Authority"
- "KATO Member - Verified Operator"

Also mentioned in the bottom bar license text.

### Required Change
Replace both badges with a single new badge:
- "East Africa Tour Guides & Drivers Association" (EATGDA)

### Files Affected
- `src/components/Footer.tsx` (lines 200-220 for badges, line 434 for license text)

---

## Issue 3: Contact Information Updates

### New Contact Details
| Field | Old Value | New Value |
|-------|-----------|-----------|
| Phone | Various (+254700000000, +254712345678) | +254 722 792 069 |
| WhatsApp | 254700000000 | 254722792069 |
| Email | info@awilisafaris.co.ke | erickokungu90@gmail.com |

### Files to Update

| File | Changes |
|------|---------|
| `src/components/WhatsAppButton.tsx` | Update phone number |
| `src/components/Header.tsx` | Update tel: links and display number |
| `src/components/ContactSection.tsx` | Update phone, email, and WhatsApp link |
| `src/components/Footer.tsx` | Update phone numbers and email |
| `src/pages/DestinationGuide.tsx` | Update WhatsApp and tel links |
| `src/pages/SafariQuiz.tsx` | Update WhatsApp link |
| `src/pages/Privacy.tsx` | Update email and phone |
| `src/pages/Terms.tsx` | Update email and phone |
| `src/pages/Cancellation.tsx` | Update email, phone, and WhatsApp |
| `src/components/SEO.tsx` | Update telephone in schema |

---

## Technical Details

### Header.tsx Mobile Menu Fix (lines 182-231)

Add background classes to the mobile menu container:

```text
Current:  <div className={`lg:hidden overflow-hidden...
Updated:  <div className={`lg:hidden overflow-hidden...
            <nav className="py-4 mt-4 bg-card/95 backdrop-blur-lg rounded-xl p-4...
```

### Footer.tsx Trust Badge Changes

Replace the two badge divs (lines 201-220) with single EATGDA badge:
- Icon: Users or Award icon
- Title: "EATGDA Member"
- Subtitle: "Certified Tour Guides"

Update bottom bar license text (line 434):
- From: "Licensed by Tourism Regulatory Authority (TRA) • Kenya Association of Tour Operators (KATO) Member"
- To: "East Africa Tour Guides & Drivers Association (EATGDA) Member"

### Contact Updates Summary

All occurrences of:
- `254700000000` → `254722792069`
- `+254 700 000 000` → `+254 722 792 069`
- `+254 712 345 678` → `+254 722 792 069`
- `+254 798 765 432` → Remove (keep single number)
- `info@awilisafaris.co.ke` → `erickokungu90@gmail.com`
- `privacy@awilisafaris.co.ke` → `erickokungu90@gmail.com`
- `bookings@awilisafaris.co.ke` → `erickokungu90@gmail.com`

---

## Expected Outcomes

1. **Mobile Menu Visibility** - Menu text will be clearly readable with solid background, regardless of hero image behind it
2. **Updated Trust Badge** - Footer will display EATGDA membership instead of TRA/KATO
3. **Consistent Contact Info** - All phone and email references across the site will show the new contact details

