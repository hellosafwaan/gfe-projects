# Button Component — Learnings

## Concepts Learned

### BEM Double-Dash Modifier Convention
- `btn` — base class (shared resets + layout)
- `btn--primary` — variant modifier (color, background)
- `btn--md` — size modifier (padding, font-size)
- Two independent modifier dimensions compose freely: `btn btn--primary btn--md`

### Padding Sets Height Naturally
Never set `height` explicitly on buttons. Let padding do it:
```
padding-top + line-height + padding-bottom = total height
10px + 20px + 10px = 40px (md)
```
If font changes, padding stays proportional. A fixed `height` clips.

### align-items: center on Flex Containers
Without `align-items: center` on a flex row, children stretch to fill the cross-axis height. On a button row with mixed sizes, you always need this to vertically center them against each other.

### font-family: inherit on Buttons
`<button>` is one of the few elements that doesn't inherit `font-family` from `body`. Browsers apply their own default (usually Arial). Always add `font-family: inherit` to the base button class.

### fill="currentColor" on SVG Icons
`fill="currentColor"` makes an SVG path inherit the CSS `color` property. One rule controls icon color across all states — hover, focus, disabled, and every variant automatically.

### rgba vs rgb
`rgba()` is required whenever you need opacity. `rgb()` has no alpha channel — writing `rgb(0,0,0,0.1)` silently fails in older browsers.

### Border Compensation Pattern
A border adds to height when no explicit `height` is set (even with `box-sizing: border-box` — that only applies when height is explicitly declared). To keep a bordered button the same height as an un-bordered one, reduce padding by the border-width on each side:
```css
.btn--secondary { border: 1px solid #e5e5e5; }
.btn--secondary.btn--md { padding: 9px 13px; } /* 10px - 1px border */
```

### column-gap vs gap
`gap` applies to both row and column gaps in flex. `column-gap` applies only between flex items on the main axis — use it when you want icon-to-text spacing without affecting row spacing.

### Link Variant Padding Override
`padding: 0` on a variant class overrides the size class padding because it comes later in the CSS. This is order-dependent — fragile if you reorganise the stylesheet. The double-class selector `.btn--link-color.btn--icon-only { padding: 0; }` overrides more precisely.

### Media Query for Responsive Layout
Mobile gets `width: 300px` so buttons wrap. Desktop (768px+) gets `width: auto` so they expand naturally in a row.

---

## Mistakes Made

| Mistake | Fix |
|---|---|
| `cursor: none` | `cursor: pointer` — `none` hides the cursor entirely |
| `rgb(68,76,231,0.12)` | `rgba()` — opacity requires the 4th channel |
| `rgba(217,45,32,12,0.12)` | Too many values — rgba takes exactly 4 |
| `btn-primary` (single dash) | `btn--primary` — BEM uses double dashes for modifiers |
| `.btn--primary:hover .btn--primary:focus` | Missing comma — space means descendant selector, not grouped selector |
| `font-size: 28px; line-height: 18px` on 2xl | Values were swapped — should be `font-size: 18px; line-height: 28px` |
| Duplicate `id="clip0_1_4737"` on SVGs | IDs must be unique per page — rewrote SVGs without clipPath |
| `btn--link-colr` | Typo — always double-check class names against your CSS |
| `btn--error` | Wrong variant name — it's `btn--destructive` |
| `border-radius: 4px` repeated in variant classes | Already defined in `.btn` — don't repeat what the base class covers |
| Link rows outside `.button__variants` div | Nesting error — always close parent divs before adding siblings |

---

## Patterns to Reuse

**Base button reset:**
```css
.btn {
  background: none;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  border-radius: 4px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

**Icon inheriting button color:**
```html
<svg fill="none"><path fill="currentColor" /></svg>
```

**Border compensation:**
```css
.btn--secondary { border: 1px solid; }
.btn--secondary.btn--md { padding: 9px 13px; } /* subtract border from padding */
```

**Icon-only override:**
```css
.btn--md.btn--icon-only { padding: 10px; }
.btn--link-color.btn--icon-only { padding: 0; } /* must come after */
```

---

## Interview Connections

- **BEM** — naming convention asked in almost every frontend interview; interviewers want to know you can scale CSS without specificity wars
- **Flexbox + align-items** — the most common layout question: "why are my items not centered?"
- **Pseudo-classes (:hover, :focus, :disabled)** — accessibility question: "how do you handle keyboard vs mouse users?"
- **box-sizing: border-box** — standard question: "what does border-box do?" Know the edge case: it only applies when height is explicitly set
- **SVG fill="currentColor"** — theming/icon question: "how do you make icons change color on hover without touching the SVG?"

---

## Carry-forward Questions

- When does `box-sizing: border-box` actually kick in for height? (Only when height is explicitly set)
- How does `height: 100%` behave on a flex child when the parent has no fixed height?
- What's the difference between `outline: none` and `outline: inherit`?

---

## What to Practice More

- **Selector syntax** — comma vs space vs no-space (grouped, descendant, compound) — still causing bugs
- **Reading Figma tokens** — mapping design panel values to CSS took a lot of back-and-forth
- **SVG structure** — viewBox, path coordinates, and when clipPath matters
- **Spotting nesting errors** — closing tags in the wrong place is hard to debug without a linter
