# Design Notes — Tab Menu Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Hex | Tailwind | Used for |
|-----|----------|----------|
| `#ffffff` | white | Active tab background; page/panel background |
| `#171717` | neutral-900 | Active tab text |
| `#525252` | neutral-600 | Default (inactive) tab text |
| `#a3a3a3` | neutral-400 | Disabled tab text |
| `#fafafa` | neutral-50 | Hover + focus tab background |
| `#e5e5e5` | — | Active tab border (0.5px stroke) |
| `#e6e6e6` | neutral-200 | Listed in style guide as a border color |
| `#444ce7` | — | Focus ring (indigo box-shadow) |
| `#000000` | black | Panel content text |

## Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Tab label | Noto Sans | 16px | 500 (Medium) | 24px |
| Panel text | Noto Sans | 16px | 500 (Medium) | 24px |

## Spacing & Dimensions

### Tab chip — Medium size (height: 44px)
- `border-radius: 4px`
- Padding (default + active): `10px 16px`
- Padding (hover, focus, disabled): `10px 14px` _(2px narrower — may be a Figma auto-layout artifact; verify visually)_
- Internal gap (between icon slot and text): 6px (default/active), 4px (hover/focus/disabled)

### Tab strip container
- Direction: horizontal row
- Gap between chips: `8px`
- No background, no border on the container itself

### Content area
- Gap between tab strip and panel content below: `24px`
- Content column width in Figma demo: `300px` (treat as flexible/auto in implementation)

## Component States

### Default (inactive)
- Background: transparent
- Border: none
- Text: `#525252`

### Active (selected)
- Background: `#ffffff`
- Border: `0.5px solid #e5e5e5` (inside — use `box-shadow: inset 0 0 0 0.5px #e5e5e5` to avoid layout shift)
- Box shadow: `0px 1px 2px -1px rgba(0,0,0,0.10), 0px 1px 3px 0px rgba(0,0,0,0.10)`
- Text: `#171717`

### Hover
- Background: `#fafafa`
- Border: none
- Text: `#525252`

### Focus
- Background: `#fafafa`
- Box shadow (focus ring): `0px 0px 0px 4px rgba(68, 76, 231, 0.12)`
- `overflow: hidden` (Figma has clipsContent: true on this state)
- Text: `#525252`

### Disabled
- Background: transparent
- Border: none
- Text: `#a3a3a3`
- Not interactive (`pointer-events: none`, `cursor: default`)

## Variants

### Sizes
- **Medium** — 44px tall, 16px font, padding 10px/16px — confirmed in style guide and reference images
- **Small** — not shown in this file's style guide or any reference image. The `.Tab chips` master component lives in a linked library (node IDs `7287:xxxx`) that the Figma bridge can't resolve. The brief lists it as a requirement. Build medium first; revisit small by inspecting the component variants directly in Figma.

## Tab Content (from Figma demo)

Three tabs, with the following panel text:

**Account (default active tab):**
> The Account Management section provides a comprehensive view of your personal information and settings. Here, you can update your profile details, manage contact information, and customize your preferences to enhance your user experience.

**Security:**
> The Security Settings section is dedicated to protecting your account and personal data. Here, you can manage various security features to ensure your information remains safe and secure.

**Plan:**
> The Subscription Plan section provides details about your current plan and available upgrades. Here, you can review your plan's benefits, manage billing information, and explore other subscription options to find the best fit for your needs.
