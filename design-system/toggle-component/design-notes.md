# Design Notes — Toggle Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Usage | Value |
|---|---|
| Track — default OFF | `#e5e7eb` |
| Track — default ON | `#4338ca` |
| Track — hover/focus OFF | `#d1d5db` |
| Track — hover/focus ON | `#3730a3` |
| Track — disabled (both states) | `#f3f4f6` |
| Track border — hover/focus OFF | `#9ca3af` (1px) |
| Track border — hover/focus ON | `#4f46e5` (1px) |
| Focus ring — hover/focus OFF | `rgba(157, 164, 174, 0.20)` spread 4px |
| Focus ring — hover/focus ON | `rgba(68, 76, 231, 0.12)` spread 4px |
| Thumb — all enabled states | `#ffffff` |
| Thumb — disabled | `#d1d5db` |
| Page background | `#ffffff` |

## Typography

No text labels on the toggle itself. The style guide uses `#171717` for state labels (decorative only, not part of the component).

## Spacing & Dimensions

| Property | Small | Medium |
|---|---|---|
| Track width | `36px` | `44px` |
| Track height | `20px` | `24px` |
| Track border-radius | `9999px` (pill) | `9999px` (pill) |
| Track padding | `2px` all sides | `2px` all sides |
| Thumb size | `16×16px` | `20×20px` |
| Thumb border-radius | `9999px` (circle) | `9999px` (circle) |

**Showcase layout (the page itself):**
- 2 columns (OFF, ON) with `24px` gap
- 2 rows (small top, medium bottom) with `24px` gap
- Content centered in viewport

## Component States

### Default (initial)

**OFF:**
- Track: `#e5e7eb`, no border
- Thumb: `#ffffff`, position left
- Thumb shadow: `box-shadow: 0 1px 2px -1px rgba(0,0,0,0.10), 0 1px 3px 0 rgba(0,0,0,0.10)`

**ON:**
- Track: `#4338ca`, no border
- Thumb: `#ffffff`, position right
- Thumb shadow: `box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)`

### Hover

**OFF:**
- Track: `#d1d5db`
- Track border: `1px solid #9ca3af`
- Track ring: `box-shadow: 0 0 0 4px rgba(157, 164, 174, 0.20)`
- Thumb shadow: `box-shadow: 0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.10)`

**ON:**
- Track: `#3730a3`
- Track border: `1px solid #4f46e5`
- Track ring: `box-shadow: 0 0 0 4px rgba(68, 76, 231, 0.12)`
- Thumb shadow: `box-shadow: 0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.10)`

### Focus

Visually identical to hover — same track colors, border, and ring. Applied on keyboard focus.

### Disabled

**Both OFF and ON (same appearance):**
- Track: `#f3f4f6`, no border, no ring
- Thumb: `#d1d5db` (grayed out, no shadow)
- Cursor: `not-allowed`

## Variants

| Variant | Track | Thumb | Size |
|---|---|---|---|
| Small | 36×20px | 16×16px | — |
| Medium | 44×24px | 20×20px | — |

Both variants share the same state logic — only track and thumb dimensions differ.
