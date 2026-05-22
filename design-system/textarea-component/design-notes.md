# Design Notes — Textarea Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Token | Hex | Usage |
|---|---|---|
| neutral-50 | `#fafafa` | Input background (all states) |
| neutral-200 | `#e6e6e6` | — |
| neutral-300 | `#e5e5e5` | Normal border |
| neutral-100 | `#f5f5f5` | Disabled border |
| neutral-500 | `#737373` | Placeholder text, character counter, hint text |
| neutral-400 | `#a3a3a3` | Disabled placeholder text |
| neutral-600 | `#525252` | — |
| neutral-700 | `#404040` | Label text |
| neutral-900 | `#171717` | Filled/active text |
| indigo-500 | `#444ce7` | Focus ring color |
| red-300 | `#fca5a5` | Error / char-exceeded border |
| red-600 | `#dc2626` | Error message text, exceeded char counter |
| white | `#ffffff` | Page background |

## Typography

All text uses **Noto Sans**.

| Element | Size | Weight | Line-height |
|---|---|---|---|
| Label | 14px | 500 (Medium) | 20px |
| Textarea text | 14px | 400 (Regular) | 20px |
| Placeholder text | 14px | 400 (Regular) | 20px |
| Character counter | 14px | 400 (Regular) | 20px |
| Error / hint message | 14px | 400 (Regular) | 20px |

## Spacing & Dimensions

- **Input padding:** 12px top/bottom, 14px left/right
- **Border radius:** 8px
- **Gap (label → input):** 6px
- **Gap (input → hint/counter row):** 6px
- **Textarea inner height:** ~108px (gives ~4 lines of text)
- **Component total height:** ~160px (normal), ~155px (error — slightly shorter textarea)
- **Content width on all breakpoints:** 340px (centered)

## Component States

### Normal
- Border: 1px solid `#e5e5e5`
- Background: `#fafafa`
- Placeholder: `#737373`
- Counter: `#737373`, right-aligned (e.g. `0/500`)

### Filled
- Border: 1px solid `#e5e5e5` (same as normal)
- Background: `#fafafa`
- Text: `#171717`
- Counter: `#737373`, right-aligned (e.g. `40/500`)

### Focused
- Border: **none** (removed)
- Background: `#fafafa`
- Box-shadow: `0 0 0 1px #444ce7, 0 0 0 4px rgba(68, 76, 231, 0.12)`
- Text: `#171717`
- Counter: `#737373`, right-aligned

### Disabled
- Border: 1px solid `#f5f5f5`
- Background: `#fafafa`
- Placeholder: `#a3a3a3`
- Label: `#404040` (unchanged)
- Counter: `#737373` (unchanged)
- No interaction

### Error (empty)
- Border: 1px solid `#fca5a5`
- Background: `#fafafa`
- Placeholder: `#737373`
- Error message: `#dc2626`, 14px, left-aligned (e.g. "This field is required")
- Counter replaced by error message

### Char Limit Exceeded
- Border: 1px solid `#fca5a5` (same as error)
- Background: `#fafafa`
- Text: `#171717`
- Counter: `#dc2626`, right-aligned (e.g. `502/500`)

### Error Focused
- Border: **none**
- Box-shadow: `0 0 0 1px #444ce7, 0 0 0 4px rgba(68, 76, 231, 0.12)` (same focus ring)
- Error message: `#dc2626`, left-aligned

### Error Filled
- Border: 1px solid `#fca5a5`
- Text: `#171717`
- Error message: `#dc2626`, left-aligned

## Variants

The component has one layout variant used across all states:
```
[Label]
[Textarea input box]
[Hint text / counter / error message]
```

The bottom row is:
- **Character counter only:** right-aligned, `#737373` (normal/filled/disabled/focused)
- **Error message only:** left-aligned, `#dc2626` (error states without char limit)
- **Exceeded counter:** right-aligned, `#dc2626` (char limit exceeded state)

## Layout (All Breakpoints)

- Desktop (1440px): content centered, width 340px
- Tablet (768px): content centered, width 340px
- Mobile (375px): content width 340px, side margins ~17.5px
