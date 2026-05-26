# Design Notes — Checkbox Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Hex | Tailwind | Usage |
|---|---|---|
| `#4f46e5` | indigo-600 | Checkbox fill + border (checked & indeterminate active) |
| `#444ce7` | — | Focus ring color (inner ring + outer glow) |
| `#525252` | neutral-600 | Label text (default) |
| `#a3a3a3` | neutral-400 | Label text (disabled) |
| `#d4d4d4` | neutral-300 | Unchecked checkbox border (default) |
| `#e5e5e5` | neutral-200 | Disabled checkbox fill + border |
| `#ffffff` | white | Checkmark / dash color; unchecked focused fill |

## Typography

| Element | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Label | Noto Sans | 16px (1rem) | 400 Regular | 24px (1.5rem) |

Figma label: `text-base  1rem / 1.5rem`

## Spacing & Dimensions

| Property | Value |
|---|---|
| Checkbox wrapper (hit area) | 24×24px |
| Checkbox visual box | 16×16px |
| Wrapper padding | 4px all sides |
| Border-radius | 4px |
| Gap (checkbox → label) | 12px |
| Checkmark icon | ~9×7px, centered in box |
| Indeterminate dash | 10×2px, centered, border-radius 4px |
| Border width | 1px (strokeAlign: inside) |

## Component States

### Unchecked

| Interaction | Fill | Border | Label | Shadow |
|---|---|---|---|---|
| Default | transparent | `#d4d4d4` 1px | `#525252` | — |
| Focused | `#ffffff` | `#4f46e5` 1px | `#525252` | Focus ring (see below) |
| Disabled | `#e5e5e5` | `#d4d4d4` 1px | `#a3a3a3` | — |

### Checked

| Interaction | Fill | Border | Label | Shadow |
|---|---|---|---|---|
| Default | `#4f46e5` | `#4f46e5` 1px | `#525252` | — |
| Focused | `#4f46e5` | `#4f46e5` 1px | `#525252` | Focus ring (see below) |
| Disabled | `#e5e5e5` | `#e5e5e5` 1px | `#a3a3a3` | — |

Checkmark: white SVG icon centered in 16×16 box.

### Indeterminate

| Interaction | Fill | Border | Label | Shadow |
|---|---|---|---|---|
| Default | `#4f46e5` | `#4f46e5` 1px | `#525252` | — |
| Focused | `#4f46e5` | `#4f46e5` 1px | `#525252` | Focus ring (see below) |
| Disabled | `#e5e5e5` | `#e5e5e5` 1px | `#a3a3a3` | — |

Dash: 10×2px white rectangle, border-radius 4px, centered in 16×16 box.

## Focus Ring

Applied via `box-shadow` on the checkbox box when focused:

```css
box-shadow: 0 0 0 1px #444ce7, 0 0 0 4px rgba(68, 76, 231, 0.12);
```

Two layers:
- Inner: 1px solid ring `#444ce7`
- Outer: 4px glow at 12% opacity

## Variants

No structural variants — single size only. The three value states (unchecked / checked / indeterminate) × three interaction states (default / focused / disabled) = 9 total visual combinations.
