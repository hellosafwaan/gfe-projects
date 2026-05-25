# Design Notes — Tooltip Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Role | Hex | Tailwind |
|---|---|---|
| Tooltip background | `#0a0a0a` | neutral-950 |
| Tooltip text | `#ffffff` | white |
| Arrow fill | `#0a0a0a` | neutral-950 (matches background) |
| Page/canvas background | `#ffffff` | white |

## Typography

| Property | Value |
|---|---|
| Font family | Noto Sans |
| Font size | 12px (0.75rem / text-xs) |
| Font weight | 500 (Medium) |
| Line height | 16px (1rem) |
| Text color | `#ffffff` |

## Spacing & Dimensions

| Property | Value |
|---|---|
| Content padding | 8px top/bottom, 12px left/right |
| Content border-radius | 8px |
| Content height (no-wrap text) | 32px |
| Content width (example text) | 111px (auto) |
| Arrow shape | 12×12px square, rotated 45° → visible as 6px tall strip |
| Arrow border-radius | 1px |

## Drop Shadow

Two layered shadows applied to the tooltip wrapper:

```
box-shadow:
  0px 4px 6px -4px rgba(0, 0, 0, 0.1),
  0px 10px 15px -3px rgba(0, 0, 0, 0.1);
```

## Component Variants

### Position: None (no arrow)
- Only the content box is rendered
- `border-radius: 8px`, padding `8px 12px`

### Position: Top (arrow points ↓ toward trigger below)
- Layout: VERTICAL — content box on top, arrow strip at bottom
- Arrow strip is a 28px-wide frame containing the rotated square
- Alignment (start/center/end) shifts where in that strip the arrow sits

### Position: Bottom (arrow points ↑ toward trigger above)
- Layout: VERTICAL — arrow strip on top, content box below
- Alignment (start/center/end) applies same as top

### Position: Right (arrow points ← toward trigger on the left)
- Layout: HORIZONTAL — arrow strip on left, content box on right
- Arrow container rotated -90° from the top variant

### Position: Left (arrow points → toward trigger on the right)
- Layout: HORIZONTAL — content box on left, arrow strip on right
- Arrow container rotated 90° from the top variant

## Alignment (top and bottom positions only)

| Alignment | Arrow position |
|---|---|
| start | Arrow near left/start edge of tooltip |
| center | Arrow centered on tooltip |
| end | Arrow near right/end edge of tooltip |

The alignment is achieved by shifting the arrow container's horizontal position within the VERTICAL tooltip layout (counterAxisAlign: MIN / CENTER / MAX in Figma).
