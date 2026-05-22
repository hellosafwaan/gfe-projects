# Design Notes — Radio Cards Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| white | `#ffffff` | Normal & selected background |
| neutral-50 | `#fafafa` | Hover & focus background |
| neutral-100 | `#f5f5f5` | Disabled background |
| neutral-200 | `#e5e5e5` | Default border (normal, hover, focus) |
| neutral-400 | `#a3a3a3` | Disabled text & icon color |
| neutral-900 | `#171717` | Normal text & icon color |
| neutral-950 | `#0a0a0a` | Hover & focus text color |
| indigo-600 | `#4f46e5` | Selected border color |
| indigo (ring) | `rgba(68, 76, 231, 0.12)` | Focus ring shadow color |

## Typography

- **Font family:** Noto Sans
- **Font weight:** 500 (Medium) — all sizes, all states

| Size | Font Size | Line Height |
|------|-----------|-------------|
| SM   | 14px      | 20px        |
| MD   | 14px      | 20px        |
| LG   | 16px      | 24px        |
| XL   | 16px      | 24px        |
| 2XL  | 18px      | 28px        |

## Spacing & Dimensions

| Size | Padding (V × H) | Gap | Height | Icon Size | Border Radius |
|------|-----------------|-----|--------|-----------|---------------|
| SM   | 8px × 12px      | 4px | 36px   | 20px      | 4px           |
| MD   | 10px × 14px     | 4px | 40px   | 20px      | 4px           |
| LG   | 10px × 16px     | 6px | 44px   | 20px      | 4px           |
| XL   | 12px × 20px     | 6px | 48px   | 20px      | 4px           |
| 2XL  | 16px × 24px     | 10px | 60px  | 24px      | 4px           |

- **Border:** 1px solid, inside stroke alignment
- **Layout:** horizontal flex, items centered

## Component States

| State    | Background | Border         | Text color | Icon color | Extra                                      |
|----------|------------|----------------|------------|------------|--------------------------------------------|
| Normal   | `#ffffff`  | 1px `#e5e5e5`  | `#171717`  | `#171717`  | —                                          |
| Hover    | `#fafafa`  | 1px `#e5e5e5`  | `#0a0a0a`  | `#0a0a0a`  | —                                          |
| Focus    | `#fafafa`  | 1px `#e5e5e5`  | `#0a0a0a`  | `#171717`  | box-shadow: `0 0 0 4px rgba(68,76,231,0.12)` |
| Selected | `#ffffff`  | 1px `#4f46e5`  | `#171717`  | `#171717`  | —                                          |
| Disabled | `#f5f5f5`  | none           | `#a3a3a3`  | `#a3a3a3`  | cursor: not-allowed                        |

## Variants

Three icon layout variants (each works across all 5 sizes and all 5 states):
- **Text only** — label text, no icons
- **Left icon** — icon + text
- **Right icon** — text + icon
- **Both icons** — icon + text + icon

Icon is a 20px (or 24px on 2XL) square placeholder slot. The actual icon fills ~83% of that slot (e.g. 16.67px star icon inside a 20px container).
