

# Itinerary Section Implementation Plan

## Overview

The `ItinerarySection` component exists but is not being used anywhere in the application. This plan implements a dynamic, database-connected Featured Itinerary section on the homepage that showcases a popular safari package's day-by-day journey.

---

## Current Issues

1. **Component Not Used**: `ItinerarySection.tsx` is not imported in `Index.tsx` or any page
2. **Static Hardcoded Data**: The component has a fixed 3-day Maasai Mara itinerary instead of fetching from the database
3. **No Package Selection**: Users can't see different package itineraries
4. **Disconnect from Database**: The `packages` table has rich `itinerary` JSONB data that's unused here

---

## Implementation Strategy

### 1. Convert to Dynamic Component

Transform `ItinerarySection` to fetch and display a featured package's itinerary from the database:

- Fetch the highest-rated or most-booked package automatically
- Display the actual itinerary data from the `packages.itinerary` JSONB column
- Show real pricing (`price_resident` and `price_non_resident`)
- Link to the full package detail page

### 2. Add Package Selector Tabs

Allow users to preview itineraries from multiple popular packages:

- Display 3-4 package tabs (e.g., "Maasai Mara", "Amboseli", "Diani Beach")
- Tab switching loads that package's itinerary dynamically
- Visual indicator for currently selected package

### 3. Enhance Visual Design

Match the premium aesthetic of the recently updated components:

- Glass-morphism sidebar card for pricing
- Timeline with gradient day markers
- Highlight pills with category colors
- Meals and accommodation badges
- Animated transitions when switching packages

### 4. Add to Homepage

Import and position the component in `Index.tsx`:

- Place after `PopularPackages` section for logical flow
- Users see packages → then see what a typical experience looks like

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/ItinerarySection.tsx` | Complete rewrite - add database fetching, package tabs, dynamic rendering |
| `src/pages/Index.tsx` | Add import and include `<ItinerarySection />` component |

### Data Flow

```text
usePackages hook → Filter top 4 packages → Display tabs
                                        ↓
               Selected package → Render itinerary timeline
                                → Show included items
                                → Show pricing
```

### Component Structure

```text
ItinerarySection
├── Section Header (uppercase label + title)
├── Package Selector Tabs (4 packages)
├── Two-Column Layout
│   ├── Left: Timeline
│   │   ├── Day markers with numbers
│   │   ├── Title + description cards
│   │   ├── Highlight pills
│   │   └── Meals/accommodation badges
│   └── Right: Sticky Sidebar
│       ├── What's Included (with icons)
│       ├── Pricing (Resident/Non-Resident)
│       └── CTA buttons (View Full Package, Request Quote)
```

### Responsive Behavior

- **Desktop**: Side-by-side timeline and pricing card
- **Tablet**: Stack with pricing card above timeline
- **Mobile**: Full-width stacked, tabs become horizontal scroll

---

## Visual Design Elements

### Package Tabs
- Horizontal pills with package names
- Active tab: Primary background, bold text
- Inactive tabs: Muted background, hover effect

### Timeline Cards
- Day number in primary-colored circle
- Connecting line between days
- Glass-effect card with shadow
- Highlight pills in primary/10 background
- Meals icon row (Breakfast, Lunch, Dinner badges)

### Pricing Sidebar
- Sticky positioning (top-32)
- "What's Included" with mapped icons
- Price display with resident/non-resident split
- Primary CTA: "View Full Package" (links to detail page)
- Secondary CTA: "Request Quote" (scrolls to contact)

---

## Expected Outcomes

- **Homepage Completion**: The itinerary section will be visible and functional
- **Dynamic Content**: Fetches real package data from the database
- **User Engagement**: Interactive tabs let users explore different safari options
- **Conversion Path**: Clear CTAs guide users to booking or inquiry
- **Visual Consistency**: Matches the premium aesthetic of other homepage sections

