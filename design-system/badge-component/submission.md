# Badge Component — Design System

**A pill-shaped badge component with 5 color variants and 3 sizes, built as a reusable design system primitive using BEM and semantic HTML.**

---

## Summary

Five semantic color variants (neutral, error, warning, success, brand) × three sizes built with BEM modifier composition, inline-flex, and WCAG contrast-checked color tokens.

---

## Implementation Details

### Tech stack and approach

Pure HTML and CSS — no JavaScript needed for a purely visual, non-interactive component.

The core pattern is the same BEM modifier composition used in the button component: a `.badge` base class owns the shared structure (border-radius, border-width, font-weight, display), while `.badge--error` and `.badge--sm` are independent modifier axes that combine freely. Adding a new color or size is one new class with three properties.

The key element choice is `<span>` over `<div>`. Badges are inline labels that sit next to text, inside table cells, or beside headings. A `<div>` would break layout by forcing a new line. `display: inline-flex` on the base class then lets the badge use flexbox internally for alignment while still behaving as an inline element externally.

The border is split across two rules intentionally — `border: 1px solid` in the base sets the structure, and `border-color` in each variant sets the theme. This avoids repeating `1px solid` in every variant class.

One discovery during build: `align-items: stretch` (the flex default) on the row container was causing all badges to stretch to the height of the tallest sibling. Adding `align-items: center` to the row fixed this and let each badge render at its natural padding-driven height.

Accessibility: ran WCAG AA contrast checks on all five variants. Four pass comfortably. The error variant (#dc2626 on #fef2f2) comes in at 4.38:1, just below the 4.5:1 threshold — this is a design token issue rather than an implementation issue, flagged for the designer.

### Useful resources and lessons learnt

- `inline-flex` is the correct display value for inline components like badges — `flex` turns the element block-level and breaks surrounding layout
- `align-items: stretch` is the invisible flex default — always add `align-items: center` to rows containing mixed-height siblings
- `border-radius: 9999px` is the standard pill convention — works at any size without knowing the element's height
- Splitting `border: 1px solid` (base) from `border-color` (variant) is a cleaner pattern than repeating the full border shorthand in every variant
- WCAG AA contrast (4.5:1) should be verified on every color combination — light-on-light combinations like error badges are the most likely to fail

### Notes/questions for community

- The error variant's color tokens from the design spec fail WCAG AA at 4.38:1 — is it common practice to override design tokens for accessibility, or do you raise it with the designer and ship as-is?
- Is there a case for adding `role="status"` or `aria-label` to badges that convey dynamic information (e.g. a notification count), or is the text content always sufficient?
- For a design system, would you scope badge CSS under a namespace (e.g. `.ds-badge`) to avoid collisions, or is BEM flat naming enough?
