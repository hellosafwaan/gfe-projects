# Toggle Component — Learnings

## Concepts Learned

### `appearance: none` — strips browser native styling
Removes all browser-default rendering from a form element. Required before you can style checkboxes, radio buttons, or selects from scratch.
```css
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none; /* Safari */
}
```

### CSS Combinators
Four ways to select elements based on their relationship in the DOM:
```css
div p      /* descendant — p anywhere inside div */
div > p    /* child — p directly inside div */
div + p    /* adjacent sibling — p immediately after div */
div ~ p    /* general sibling — any p after div at same level */
```
The `+` combinator was used throughout this project: `input:checked + .toggle-track`.

### Pseudo-classes on form elements
```css
input:checked       /* when checkbox is ticked */
input:disabled      /* when input is disabled */
input:focus-visible /* keyboard focus only — not mouse clicks */
input:not(:disabled) /* any input that is NOT disabled */
```

### Chaining pseudo-classes
Multiple pseudo-classes can be stacked on one element — all must be true at the same time:
```css
input:not(:disabled):focus-visible:checked + .toggle-track
```
Read: "an input that is not disabled, AND keyboard-focused, AND checked — then target the track next to it."

### `:has()` — CSS parent selector
Style a parent element based on what's inside it. No JavaScript needed.
```css
.toggle:has(input:disabled) {
  cursor: not-allowed;
}
```
Read: "a `.toggle` that contains a disabled input."

### Visually hidden technique
Hides an element visually while keeping it accessible to keyboard users and screen readers. Never use `display: none` on interactive form elements.
```css
input[type="checkbox"] {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

### `box-shadow` as a border replacement
`border` affects the box model — with `box-sizing: border-box`, it shrinks the inner space. `box-shadow` is purely decorative and never affects layout.
```css
/* Simulates a 1px border + 4px ring — no layout impact */
box-shadow:
  0 0 0 1px #9ca3af,
  0 0 0 4px rgba(157, 164, 174, 0.2);
```
Use this whenever a border would interfere with the sizing of child elements.

### `::after` pseudo-element for the thumb
Creates the thumb visually without extra HTML. Requires `content: ""` and `position: absolute`.
```css
.toggle-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 9999px;
}
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `.input:checked` | Dot makes it a class selector — looking for `class="input"`. No dot for element selectors. | `input:checked` |
| Used space instead of `+` multiple times | Space = descendant (inside). Track is a sibling, not a child. | `input:disabled + .toggle-track` |
| Sized the label, not the track | `width/height` on `.toggle--sm` instead of `.toggle--sm .toggle-track` | Move dimensions to the track |
| `display: none` on input | Removes input from accessibility tree — can't Tab to it, screen readers skip it | Visually hidden technique |
| `border: 1px solid transparent` | With `box-sizing: border-box`, border eats into inner space — thumb overflowed the track | Replace with `box-shadow` approach |
| `:focus-visible` on the label | Label doesn't receive keyboard focus — the input does | `input:focus-visible + .toggle-track` |
| Wrong selector order | `input:checked + .toggle:hover .toggle-track` — `.toggle` is the parent, not a sibling of input | `.toggle:hover input:checked + .toggle-track` |
| `rgb` instead of `rgba` | `rgb` has no alpha channel — opacity value was ignored | `rgba(0, 0, 0, 0.10)` |
| Missing `px` and misplaced comma in box-shadow | `0 1px 2px -1, rgb(...)` — splits one shadow incorrectly at the comma | `0 1px 2px -1px rgba(...)` |
| `.toggle-md` vs `.toggle--md` | Inconsistent BEM naming — double dash is the modifier convention | `.toggle--md` |

---

## Patterns to Reuse

**Toggle HTML structure — label wrapping pattern**
```html
<label class="toggle toggle--md" for="switch-1">
  <input id="switch-1" type="checkbox" role="switch">
  <span class="toggle-track"></span>
</label>
```
Clicking anywhere on the label triggers the checkbox. The span is styled as the visual toggle.

**Visually hidden input**
```css
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

**CSS-only state via adjacent sibling combinator**
```css
input:checked + .toggle-track { background: #4338ca; }
input:checked + .toggle-track::after { left: auto; right: 2px; }
```
Zero JavaScript for the core toggle behavior.

**Stacked box-shadows for border + focus ring**
```css
box-shadow:
  0 0 0 1px #9ca3af,             /* border simulation */
  0 0 0 4px rgba(157,164,174,0.2); /* focus ring */
```

---

## What You Did Well

1. **Immediately chose `<input type="checkbox">`** — correct semantic instinct without being guided to it.
2. **Added `role="switch"` unprompted** — strong accessibility awareness from the start.
3. **Organized CSS with comments and BEM from early on** — the structure stayed clean throughout.
4. **Questioned whether box-shadow truly matched the Figma stroke** — challenged the abstraction and verified it was valid before accepting it.

---

## What to Improve

- **Combinator selection** — repeatedly used space (descendant) instead of `+` (adjacent sibling). Before writing any selector involving siblings, ask: "is this element inside or next to the other one?"
- **Which element receives the pseudo-class** — `:focus-visible` went on the label twice before going on the input. Always ask: "which element actually changes state?"
- **Box model before adding borders** — adding `border` inside a sized element shrinks the inner space. Check inner dimensions whenever adding borders to a container with positioned children.
- **`rgba` always for opacity** — `rgb` never accepts a 4th value. Default to `rgba` whenever opacity is involved.

---

## Interview Connections

- **`<input type="checkbox">` for toggles** — interviewers ask why not `<button>` or `<div>`. Answer: checkbox has built-in state, keyboard behavior, and form participation.
- **`:focus-visible` vs `:focus`** — common accessibility question. `:focus-visible` is the modern answer — keyboard-only ring, no ring on mouse click.
- **`appearance: none` for custom form styling** — standard technique asked in UI implementation rounds.
- **CSS-only state management** — toggle with zero JS is a strong signal. Shows understanding of what the browser provides for free.
- **Visually hidden vs `display: none`** — accessibility distinction that comes up whenever custom UI replaces a native form element.
- **`box-shadow` vs `border` for focus rings** — knowing why `box-shadow` doesn't affect layout shows box model depth.

---

## How You Thought

- **Started with `flex-end` to move the thumb right** — good instinct that it was a layout problem, wrong context. The thumb is absolutely positioned, not a flex child. Shifted to understanding `left: auto; right: 2px`.
- **Questioned naming the span class** — careful attention to code clarity before writing CSS. Good habit.
- **Added `role="switch"` naturally** — shows internalized accessibility thinking, not just following instructions.
- **Questioned whether box-shadow truly matched the Figma stroke** — healthy skepticism. It does match visually; the technique is a valid abstraction.
- **Kept confusing which element receives a pseudo-class** — both `:focus-visible` and `disabled` first went on the wrong element. Mental model gap: always ask "which element changes state?" not "which element is visible?"

---

## Accessibility Gap — Missing text labels

The toggle implementation is accessible in terms of keyboard behavior and screen reader state announcements. However, screen readers will only announce "switch, off" — not what the switch controls.

In production, each toggle needs either visible label text or `aria-label`:

```html
<label class="toggle toggle--md" for="switch-1">
  <input id="switch-1" type="checkbox" role="switch" aria-label="Enable notifications">
  <span class="toggle-track"></span>
</label>
```

For a design system showcase this is acceptable — the component itself is correct, consumers are responsible for passing a meaningful label when using it in a real form.

---

## Carry-forward Questions

- Can CSS `transition` animate both `left` and `right` simultaneously on the same element? (The thumb uses both properties depending on state.)
- When does `:has()` have browser support issues worth worrying about in production?
- What's the difference between `clip` and `clip-path` in the visually hidden technique — and why does the older `clip` property still get included?

---

## Unlearned Gaps

- **`:has()` parent selector** — introduced by coach, not discovered or iterated on hands-on. See `notes/css-properties.md` for reference. (GAP AREA — not yet learned hands-on)

---

## What to Practice More

- CSS combinator selection — write selector patterns from scratch without looking them up
- Chained pseudo-classes — practice reading complex selectors aloud before writing them
- Box-shadow syntax — offsets, blur, spread, color in the right order every time
