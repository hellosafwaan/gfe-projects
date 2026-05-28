# Design Notes — Toast Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Variant | Background | Badge text | Message text |
|---|---|---|---|
| Success | `#f0fdf4` | `#15803d` | `#15803d` |
| Error | `#fef2f2` | `#991b1b` | `#dc2626` |
| Warning | `#fffbeb` | `#b45309` | `#b45309` |
| Info | `#f9fafb` | `#525252` | `#525252` |

Badge background: `#ffffff` (all variants)

> Note: Error is the only variant where badge text and message text differ (`#991b1b` vs `#dc2626`).

## Typography

- Font family: `Noto Sans`
- All text (badge label + message): 14px / 20px line-height, font-weight 500 (Medium)
- Style guide token: `text-sm` = 0.875rem / 1.25rem

## Spacing & Dimensions

**Toast container (outer pill):**
- Height: 32px
- Border-radius: 2000px (fully rounded pill)
- Padding: `4px 10px 4px 4px` (asymmetric — left 4, right 10)
- Gap (between badge and message area): 12px
- Layout: horizontal flex, center-aligned

**Badge (inner white pill):**
- Height: 24px
- Border-radius: 9999px (fully rounded pill)
- Padding: `2px 10px`
- Background: `#ffffff`
- Box-shadow: `0 1px 2px -1px rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.1)`

**Content area:**
- Gap: 4px (horizontal flex)

## Component Structure

Each toast has two parts:
1. **Badge** — white pill with variant label ("Success", "Error", "Warning", "Info")
2. **Message** — plain text to the right of the badge

```
[  Success  ] Your content successfully added!
```

## Sample Copy (from Figma)

| Variant | Badge label | Message |
|---|---|---|
| Success | Success | Your content successfully added! |
| Error | Error | Your content successfully deleted! |
| Warning | Warning | Your image is 5Mb, it may load longer! |
| Info | Info | Your content is publicly visible |

## Variants

All 4 variants share the same structure and dimensions. Only colors change:
- Background fill of the outer pill
- Text color of the badge label
- Text color of the message

## Viewports

- Desktop: 1440px — toasts centered horizontally
- Tablet: 768px — same structure
- Mobile: 375px — same structure
- All viewports show toasts with 200px top/bottom padding in the design

## Behavior (from brief)

- Toast appears from the **top of the screen**
- Smooth entrance and exit transitions (slide/fade in/out from top)
- Duration is configurable via JavaScript
- Auto-dismisses after duration
