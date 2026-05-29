# Design Notes — Modal Dialog Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Token | Value | Usage |
|---|---|---|
| Overlay background | `rgba(10, 10, 10, 0.70)` | Full-screen backdrop behind modal |
| Card background | `#ffffff` | Modal dialog surface |
| Title text | `#171717` | Modal heading |
| Body text | `#525252` | Modal body/description |
| Close icon | `#525252` | X button vector fill |
| Secondary button bg | `#ffffff` | "No" button background |
| Secondary button border | `#e5e5e5` | "No" button border |
| Secondary button text | `#171717` | "No" button label |
| Primary button bg | `#4338ca` | "Yes" button (primary variant) |
| Primary button text | `#ffffff` | "Yes" button label |
| Danger button bg | `#dc2626` | "Yes/Confirm" button (danger variant) |
| Danger button hover bg | `#b91c1c` | Danger button hover state |
| Primary button hover bg | `#3730a3` | Primary button hover state |

## Typography

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Modal title | Noto Sans | 18px | 600 (SemiBold) | 28px |
| Modal body | Noto Sans | 14px | 400 (Regular) | 20px |
| Button label | Noto Sans | 16px | 500 (Medium) | 24px |

## Spacing & Dimensions

**Card (modal dialog):**
- Width: 343px (fixed; same on desktop, tablet, and mobile)
- Corner radius: 8px
- Padding: 24px all sides
- Internal gap (between Text section and Action row): 32px

**Text section (title + body):**
- Gap between title row and body: 8px

**Title row (heading text + close button):**
- Direction: horizontal, space-between feel (title takes remaining width, close button is 24×24px)
- Gap: 8px

**Action row (buttons):**
- Direction: horizontal
- Gap between buttons: 12px
- Each button: ~141.5px wide × 44px tall
- Button padding: 10px top/bottom, 16px left/right
- Button corner radius: 4px

**Button shadow (both buttons):**
```
box-shadow:
  0 1px 2px -1px rgba(0, 0, 0, 0.10),
  0 1px 3px 0px rgba(0, 0, 0, 0.10);
```

## Component Variants

### Primary (default)
- "No" button: white bg, `#e5e5e5` border, `#171717` text
- "Yes" button: `#4338ca` bg (indigo), `#ffffff` text

### Danger
- "No" button: same as primary — white bg, `#e5e5e5` border, `#171717` text
- Confirm button: `#dc2626` bg (red), `#ffffff` text

## Responsive Behaviour

The card width is **343px fixed** across all three breakpoints. Only the positioning changes:
- Desktop (1440px): card is centred horizontally and vertically in the overlay
- Tablet (768px): card is centred
- Mobile (375px): card has `16px` horizontal margin (fits 343px inside 375px viewport)

The overlay always fills 100% of the viewport (`width: 100%; height: 100%; position: fixed`).
