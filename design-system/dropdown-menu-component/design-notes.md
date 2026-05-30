# Design Notes — Dropdown Menu Component

> Extracted from Figma. Use this as the source of truth for all visual values during implementation.

## Colors

| Usage | Value |
|---|---|
| Trigger background | `#ffffff` |
| Trigger border | `#e5e5e5` |
| Trigger text | `#171717` |
| Trigger chevron icon | `#171717` |
| Menu card background | `#ffffff` |
| Item text (default) | `#171717` |
| Item background (default) | transparent |
| Item background (hover) | `#fafafa` |
| Item background (selected) | `#f9fafb` |
| Item border (focus) | `#c7d2fe` |
| Prefix icon fill | `#171717` |
| Checkmark icon fill | `#171717` |

## Typography

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Trigger label | Noto Sans | 14px | 500 (Medium) | 20px |
| Item label | Noto Sans | 14px | 500 (Medium) | 20px |

## Spacing & Dimensions

### Trigger Button
| Property | Value |
|---|---|
| Width | 272px |
| Height | 36px |
| Padding | 8px top/bottom, 12px left/right |
| Gap (label ↔ chevron) | 4px |
| Border | 0.5px solid `#e5e5e5` |
| Border radius | 4px |
| Drop shadow | `0 1px 2px -1px rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.1)` |

### Menu Card
| Property | Value |
|---|---|
| Width | 272px (matches trigger) |
| Background | `#ffffff` |
| Border radius | 8px |
| Padding | 8px all sides |
| Gap from trigger | 4px |
| Drop shadow | `0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)` |

### Menu Item (container)
| Property | Value |
|---|---|
| Width | 256px (card inner: 272 - 8 - 8) |
| Height | 36px |
| Padding | 8px all sides |
| Gap between items | 8px |

### Item Inner (Name row)
| Property | Value |
|---|---|
| Width | 240px (item inner: 256 - 8 - 8) |
| Height | 20px |
| Gap (icon ↔ label) | 12px |
| Icon size | 20×20px |
| Checkmark icon size | 20×20px |

## Icons (Remixicon)

| Item | Icon name |
|---|---|
| Public | `ri-global-line` (globe-line) |
| Unlisted | `ri-list-unordered` (mist-fill) |
| Private | `ri-lock-2-line` |
| Trigger chevron | `ri-arrow-down-s-line` |
| Selected checkmark | `ri-checkbox-circle-fill` |

## Component States

| State | Visual Change |
|---|---|
| Default | Transparent bg, `#171717` text |
| Hover | Background `#fafafa` |
| Focus | Background `#fafafa`, border `#c7d2fe` |
| Selected | Background `#f9fafb`, checkmark icon visible on right |
| Disabled | Text `#a3a3a3` (approx), no interaction |

## Structure Summary

```
.dropdown
  .dropdown__trigger (button)
    label text
    chevron icon
  .dropdown__menu (hidden by default)
    .dropdown__list
      .dropdown__item × N
        prefix icon (20×20)
        label text
        checkmark icon (only when selected)
```
