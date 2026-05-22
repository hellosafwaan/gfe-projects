# Design Notes — Text Input Component

> Extracted from Figma during project setup. Use this as the source of truth for all visual values during implementation. Do not re-read Figma unless something is missing.

---

## Colors

| Color | Usage |
|---|---|
| `#fafafa` | Input background (all states) |
| `#e5e5e5` | Input border — Normal, Filled, Error states |
| `#f5f5f5` | Input border — Disabled state (same as background, looks borderless) |
| `#404040` | Label text |
| `#737373` | Placeholder text, hint text (normal), disabled hint text |
| `#a3a3a3` | Icon color (normal, filled, focused, disabled), disabled placeholder text |
| `#171717` | Input value text (filled/focused) |
| `#444ce7` | Focus ring color (border + outer glow) |
| `#dc2626` | Error hint text, error icon color |
| `#d92d20` | Error focus ring color |
| `#101828` | Subtle drop shadow on focused state |

---

## Typography

| Element | Size | Weight | Line height | Color |
|---|---|---|---|---|
| Label | 14px | 500 (Medium) | 20px | `#404040` |
| Input value | 14px | 400 (Regular) | 20px | `#171717` |
| Placeholder | 14px | 400 (Regular) | 20px | `#737373` |
| Hint text | 14px | 400 (Regular) | 20px | `#737373` (normal) / `#dc2626` (error) |

Font family: Noto Sans

---

## Spacing & Dimensions

| Property | Value |
|---|---|
| Input height | 40px |
| Input padding | `10px 14px` (top/bottom / left/right) |
| Input border-radius | `4px` |
| Input border width | `1px` |
| Gap — label to input | `6px` |
| Gap — input to hint text | `6px` |
| Gap — icon to text inside input | `8px` |
| Input width | `340px` (content area, all breakpoints) |

---

## Component States

| State | Border | Background | Box-shadow | Icon color | Hint text color |
|---|---|---|---|---|---|
| Normal | `1px solid #e5e5e5` | `#fafafa` | — | `#a3a3a3` | `#737373` |
| Filled | `1px solid #e5e5e5` | `#fafafa` | — | `#a3a3a3` | `#737373` |
| Focused | none | `#fafafa` | `0 0 0 1px #444ce7, 0 0 0 4px rgba(68,76,231,0.12), 0 1px 2px rgba(16,24,40,0.05)` | `#a3a3a3` | `#737373` |
| Error | `1px solid #e5e5e5` | `#fafafa` | — | `#dc2626` | `#dc2626` |
| Error focused | none | `#fafafa` | `0 0 0 1px #d92d20, 0 0 0 4px rgba(217,45,32,0.12)` | `#dc2626` | `#dc2626` |
| Disabled | `1px solid #f5f5f5` | `#fafafa` | — | `#a3a3a3` | `#737373` |

---

## Variants

### Default
Plain input — label on top, input box, hint text below. No icon.

### Icon leading
Icon on the left inside the input box. Gap between icon and text: `8px`. Extra left padding on input to accommodate icon.

---

## Layout (all breakpoints)

Content area is `340px` wide and centered on all three breakpoints:
- Desktop (1440px): centered at `550px` from left
- Tablet (768px): centered at `214px` from left
- Mobile (375px): `17.5px` margin each side

Vertical padding on the page frame: `112px` top and bottom.
