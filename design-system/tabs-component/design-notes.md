# Design Notes — Tabs Component

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors

| Color | Hex | Usage |
|---|---|---|
| Indigo-700 | `#4338ca` | Active tab label text |
| Indigo-600 | `#4f46e5` | Active tab bottom indicator (default) |
| Indigo-800 | `#3730a3` | Active tab bottom indicator + text on hover/focus |
| Neutral-900 | `#171717` | Inactive tab label text on hover/focus; panel heading |
| Neutral-600 | `#525252` | Inactive tab label text (initial/default) |
| Neutral-300 | `#d4d4d4` | Inactive tab bottom border; tab container bottom border |
| Black | `#000000` | Panel body text |
| White | `#ffffff` | Page/container background |

## Typography

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Tab label | Noto Sans | 16px | Medium (500) | 24px |
| Panel body text | Noto Sans | 16px | Medium (500) | 24px |

## Spacing & Dimensions

- **Tab button height:** 36px
- **Tab button padding:** `top: 0 / right: 8px / bottom: 12px / left: 8px`
- **Gap between tabs:** 24px (horizontal, inside the tab list)
- **Gap between tab list and panel:** 24px (vertical)
- **Tab list width:** 300px (stretches to fill content width)
- **Content area width:** 300px

## Component States

### Inactive tab

| State | Bottom border | Label text |
|---|---|---|
| Initial | `#d4d4d4` | `#525252` |
| Hover | `#d4d4d4` | `#171717` |
| Focus | `#d4d4d4` (+ focus ring) | `#171717` |

### Active tab

| State | Bottom border | Label text |
|---|---|---|
| Initial | `#4f46e5` | `#4338ca` |
| Hover | `#3730a3` | `#3730a3` |
| Focus | `#3730a3` (+ focus ring) | `#3730a3` |

### Tab container

- Has a full-width bottom border: `#d4d4d4` (the background gray line under all tabs)
- The active tab's bottom border overlaps/replaces this line for its own width

## Variants / Screens

Three desktop screens shown, each representing a different active tab:

| Screen | Active tab | Panel content |
|---|---|---|
| Desktop – Account | Account | "The Account Management section provides a comprehensive view of your personal information and settings…" |
| Desktop – Security | Security | "The Security Settings section is dedicated to protecting your account and personal data…" |
| Desktop – Plan | Plan | "The Subscription Plan section provides details about your current plan and available upgrades…" |

The tab list contains **3 tabs**: Account, Security, Plan. Same design across Desktop, Tablet, and Mobile — no layout differences, just centered differently within each viewport.

## Notes

- `strokeWeight: "mixed"` on tab buttons = only the **bottom** stroke is set (the underline indicator)
- The tab container also has a bottom stroke — the active tab's indicator visually covers the container's gray line for its portion of the width
- Focus state likely requires a visible focus ring (`:focus-visible` outline) in addition to the state color change
