# Checkbox Component — Learnings

## Concepts Learned

### Visually hidden input pattern
Hides the native checkbox while keeping it focusable — required so `:checked`, `:indeterminate`, `:disabled`, `:focus-visible` still fire on the real input.

```css
.checkbox__input {
  position: absolute;
  width: 1px; height: 1px;
  margin: -1px; padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### CSS pseudo-class state chain
All visual states are driven entirely by CSS — no JS class toggling needed:

```css
input:checked + .checkbox__box { background-color: #4f46e5; }
input:indeterminate + .checkbox__box { background-color: #4f46e5; }
input:focus-visible + .checkbox__box { box-shadow: ...; }
input:disabled + .checkbox__box { background-color: #e5e5e5; }
input:disabled ~ .checkbox__label { color: #a3a3a3; }
```

### Adjacent vs general sibling combinator
- `+` targets the immediately next sibling (used for `.checkbox__box`)
- `~` targets any later sibling (used for `.checkbox__label` which is two steps away from the input)

### `::after` with SVG background-image
Checkmark and dash are SVG files rendered as `background-image` on a sized `::after` pseudo-element:

```css
input:checked + .checkbox__box::after {
  content: "";
  display: block;
  position: absolute;
  width: 9px; height: 7px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: url("../img/checkmark.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
```

### `indeterminate` DOM property
No HTML attribute exists — must be set via JS:

```js
input.indeterminate = true;
```

CSS responds via `:indeterminate` pseudo-class. Clicking the checkbox clears it automatically.

### Grouped selectors for shared states
When two states share the same styles, group them:

```css
input:checked + .checkbox__box,
input:indeterminate + .checkbox__box {
  background-color: #4f46e5;
  border: 1px solid #4f46e5;
}
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `max-width: 1440px` on container | Same width as the viewport — `margin: auto` had no visible effect | Use a smaller width, or use `flex` centering |
| `.checkbox__items` CSS with no matching HTML element | CSS class existed but the wrapper div wasn't in HTML yet | Added `<div class="checkbox__items">` wrapper |
| `input:checked + checkbox-box` | Missing `.` before the class name — twice | Always check prefix: `#` for id, `.` for class |
| `padding: 4px` on `.checkbox__box` | Misread Figma — padding was on the 24×24 wrapper, not the 16×16 visual box | No padding on the box; it's already the correct visual size |
| `::after` on `.checkbox__box` always | Checkmark appeared even on unchecked state | Scope it: `input:checked + .checkbox__box::after` |
| `border-radius: 1px solid #4f46e5` | Wrong property — `border-radius` takes a size only | Should have been `border: 1px solid #4f46e5` |
| `.checkbox__box:focus` for focus ring | `.checkbox__box` never receives focus — the input does | `input:focus-visible + .checkbox__box` |
| `input:checked + .checkbox__box:indeterminate` | `:indeterminate` must go on the `input`, not the box | `input:indeterminate + .checkbox__box` |
| Incomplete `.check` rule in CSS | Left a broken partial selector that invalidated rules below it | Always complete or delete partial rules |
| `inderminate` typo in JS | Property name wrong — silently failed, no error thrown | `indeterminate` (with two t's) |

---

## Patterns to Reuse

**Custom checkbox / toggle base structure:**
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" id="cb">
  <span class="checkbox__box"></span>
  <span class="checkbox__label">Label text</span>
</label>
```
Visually hidden input → custom visual span → label text. The `+` combinator connects input state to box styling.

**SVG as background-image on pseudo-element:**
```css
element::after {
  content: "";
  display: block;
  position: absolute;
  width: Xpx; height: Ypx;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: url("../img/icon.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
```
Use for any icon that needs to appear centered inside a styled element.

**Focus ring via double box-shadow:**
```css
box-shadow: 0 0 0 1px #444ce7, 0 0 0 4px rgba(68, 76, 231, 0.12);
```
Inner solid ring + outer glow. Zero layout impact.

---

## What You Did Well

- **Questioned the span** — asked "do I really need this?" before just accepting it. Correct first-principles instinct.
- **Grouped the checked/indeterminate selectors** independently — a cleaner pattern than duplicating the rule, spotted without prompting.
- **Used `~` correctly for the disabled label** — recognized that the label wasn't adjacent and picked the right combinator.
- **Pushed back on the global margin reset** — correctly identified `body { margin: 0 }` already covered it. Good reading of what actually matters vs. boilerplate.

---

## What to Improve

- **Always verify combinator choice before writing** — `+` vs `~` confusion caused mistakes in this project and has appeared in every project. Pause and ask: "is this the immediately next sibling, or any later sibling?"
- **Read Figma padding context carefully** — the 4px padding was on the wrapper, not the box. Before applying any spacing value, ask: which element in Figma does this belong to?
- **Complete or delete rules before moving on** — the broken `.check` selector invalidated CSS below it. Never leave partial rules.
- **Scope pseudo-element rules to the right state** — `::after` on the base class means it's always active. Ask: should this appear always, or only in a specific state?

---

## Interview Connections

- **Custom checkbox pattern** — a very common interview question. Interviewers want to see `appearance: none` or visually hidden input + sibling span, not reliance on native browser styling.
- **`:focus-visible` vs `:focus`** — interviewers increasingly ask this. `:focus` fires on mouse clicks too; `:focus-visible` is keyboard-only. Always use `:focus-visible` for custom focus rings.
- **CSS sibling combinators** — `+` and `~` appear in nearly every real design system component. Being fluent with them is expected at mid-level interviews.
- **`indeterminate` state** — the "Select all" pattern with an indeterminate parent checkbox is a very common take-home or live coding question.
- **No JS for visual state** — driving all 9 states via CSS pseudo-classes with zero JavaScript is the clean, interview-worthy approach.

---

## How You Thought

- **Started with the assumption that `.container` needed `max-width` for centering** — partially right (a constraint is needed), but 1440px was effectively the viewport width. The insight was that `flex` centering with `justify-content: center` doesn't need a width constraint at all.
- **Questioned whether `.checkbox__box` span was necessary** — this was the best instinct of the project. You correctly suspected the input alone could work with `appearance: none`. Understanding *why* it doesn't (no `::before`/`::after` on replaced elements) was the real lesson.
- **"Is this intermediate or indeterminate?"** — the spelling confusion suggests the concept was heard but not yet seen written. Now that you've typed `input.indeterminate` and `:indeterminate`, the spelling is locked in.
- **Asked why HTML attributes and DOM properties are different** — genuinely curious, not just moving on. This distinction is subtle and you recognised it mattered.
- **Tried `:indeterminate` on the box, not the input** — natural mistake. The mental model of "the box is what's indeterminate" makes sense visually, but the state lives on the input element.

---

## Carry-forward Questions

- When does `:focus` vs `:focus-visible` actually differ in practice — are there cases where you'd use `:focus` over `:focus-visible`?
- The reference solution used `appearance: none` directly on the `<input>` with `::after` for the checkmark. Does `::after` on an input work reliably in all browsers, or is the visually hidden + span approach more robust?
- `cursor: not-allowed` was applied via `input:disabled ~ *`. Does this cause the label element itself to show `not-allowed`, or only its siblings?
- When does `:indeterminate` apply to elements other than checkboxes? (progress bars, radio groups)

---

## Unlearned Gaps (if any)

- **SVG background-image technique** — the `background-image: url("../img/checkmark.svg")` approach was introduced by the coach. You used it correctly but didn't derive it independently. See `notes/css-properties.md` for the pattern.

---

## What to Practice More

- **CSS combinators** — `+` vs `~` has appeared in every project. Needs deliberate practice until it's instinctive.
- **Scoping pseudo-element rules to specific states** — placing `::after` on the wrong element/selector happened twice. Practice building state-by-state from the start.
- **Reading Figma layout context** — padding/spacing values need to be mapped to the correct element in code, not just copied as-is.
