# Text Input Component — Learnings

---

## Concepts Learned

### BEM naming (Block, Element, Modifier)

Keeps class names predictable and scope-safe across complex components.

```html
<div class="input-group input-group--error">
  <label class="input-group__label">...</label>
  <div class="input-group__field">
    <input class="input-group__input">
    <div class="input-group__icon">...</div>
  </div>
  <p class="input-group__hint">...</p>
</div>
```

- `__` = child element of block
- `--` = modifier (state or variant) on the **block**, not the element
- Descendant selector: `.block--modifier .block__element` (space = descendant; no space = same element with both classes)

### Absolute icon inside relative field

`<input>` can't have children, so icons must be siblings in a wrapper.

```css
.input-group__field { position: relative; }
.input-group__icon {
  display: flex;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}
```

`top: 50%` moves the top edge to the midpoint. `translateY(-50%)` pulls it back up by half its own height. Without the transform, the icon sits below center.

### Custom focus ring with `box-shadow`

`box-shadow` supports multiple layers and spread radius — `outline` doesn't.

```css
.input-group__input:focus {
  outline: none;
  border-color: transparent;
  box-shadow:
    0 0 0 1px #444ce7,
    0 0 0 4px rgba(68, 76, 231, 0.12),
    0 1px 2px 0 rgba(16, 24, 40, 0.05);
}
```

Must add `outline: none` and `border-color: transparent` — otherwise the browser outline and existing border both show through.

### `display: flex` on SVG wrapper divs

Inline SVGs sit on the text baseline — browsers reserve descender space below, making the div taller than the SVG. `display: flex` removes the baseline context.

```css
.input-group__icon { display: flex; }
```

### `width: 100%` on form elements

`<input>` doesn't auto-stretch like block divs. Always add explicitly.

### `aria-describedby` for hint/error text

```html
<input id="input-error" aria-describedby="hint-error" />
<p id="hint-error">This is an error message.</p>
```

`aria-describedby` goes on the `<input>`, pointing to the hint's `id`. Screen readers announce the hint when the field is focused.

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `font-size: 14` | Missing `px` unit — browser ignored the declaration | `font-size: 14px` |
| `box-shadow: 0 0 0 1 #444ce7` | Non-zero shadow values need `px` — entire property silently ignored | `0 0 0 1px #444ce7` |
| `.input-group--disabled.input-group__icon` | No space = "same element has both classes" — wrong selector, no effect | `.input-group--error .input-group__icon` (space for descendant) |
| Duplicate `:disabled` rules | `cursor: not-allowed` and `border-color` written in separate rules | Merged into one `.input-group__input:disabled` rule |
| `aria-describedby` on the hint `<p>` | Put the attribute on the wrong element | Moved to `<input>`, gave `<p>` an `id` instead |
| `input-group__input-icon` class name | Double "input" — not a real BEM element name | Renamed to `input-group__leading-icon` |
| Hardcoded `fill="#A3A3A3"` on leading icon SVG | CSS can't control hardcoded fill — color won't respond to state changes | `fill="currentColor"` |
| Said `height: 40px` was redundant | Forgot to add the 2px border — `10 + 20 + 10 = 40` but actual height is `10 + 20 + 10 + 1 + 1 = 42px` | Add `height: 40px` — with `box-sizing: border-box` this pins border inside the box, matching Figma's `stroke-align: inside` |

---

## Patterns to Reuse

**Icon inside input — absolute positioning**
```css
.field { position: relative; }
.icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); display: flex; }
.input { padding-right: 38px; } /* prevent text overlap */
```

**Multi-layer focus ring**
```css
:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 1px #444ce7, 0 0 0 4px rgba(68,76,231,0.12);
}
```

**BEM modifier affecting child elements**
```css
.block--modifier .block__element { ... }
```

**SVG color via currentColor**
```html
<svg fill="none"><path fill="currentColor" /></svg>
```
```css
.icon { color: #a3a3a3; } /* controls SVG color */
```

---

## What You Did Well

1. **Correctly identified the icon positioning problem early** — knew `<input>` can't have children and reached for the wrapper + absolute positioning approach without being told.
2. **Questioned `height: 40px`** — good instinct to ask whether padding alone was enough rather than just adding it blindly. It was redundant and you caught it.
3. **Consistent BEM naming throughout** — `input-group`, `input-group__field`, `input-group__leading-icon` stayed clean and predictable across all four variants.
4. **Good instinct on the wrapper class question** — asked whether a generic wrapper was needed for the icon-leading variant, then correctly concluded it wasn't once the pattern was clear.

---

## What to Improve

- **Always add `px` units to non-zero CSS values** — missing units have failed silently twice now (`font-size` and `box-shadow`). Make it a habit to check units before saving.
- **Check which element gets `aria-*` attributes** — the attribute goes on the element that needs description, not the element doing the describing. Think: "who benefits from the description?"
- **Read BEM selectors out loud before writing** — `.block--modifier .block__element` (space = descendant). Saying it catches the missing-space mistake before it happens.

---

## Interview Connections

- **BEM naming** — frequently asked in component-focused interviews: "How do you structure CSS for a design system?" BEM is the standard answer with a concrete example.
- **Custom focus rings** — accessibility is increasingly tested. Know why `box-shadow` beats `outline` for layered rings.
- **`aria-describedby`** — WCAG AA compliance is a common requirement. Interviewers ask how form errors are communicated to screen readers — this is the answer.
- **`width: 100%` on form elements** — a classic gotcha question. "Why isn't my input stretching?" is something every frontend dev hits.
- **Absolute positioning for UI overlays** — the same `position: relative` parent + `position: absolute` child pattern applies to tooltips, dropdowns, badges, and icon buttons.

---

## How You Thought

**Assumption that turned out wrong:** Put `aria-describedby` on the hint `<p>` instead of the `<input>`. The mental model was "the hint describes itself" — but the attribute is about the input saying "this other element describes me."

**Good instinct:** When asked about `height: 40px`, you questioned whether `display: flex` could achieve the same thing. That's the right kind of question — pushing back on a proposed solution to understand the underlying mechanism. (The answer was: padding already gives you 40px, neither was needed.)

**Good instinct:** Asked whether a generic wrapper class was needed for the icon-leading variant before writing CSS. Showed component-design thinking — not just "how do I style this" but "what's the right structure."

**Gap revealed:** The initial BEM selector mistake (`.input-group--disabled.input-group__icon` with no space) showed the BEM modifier → descendant pattern wasn't fully internalized yet. The fix was quick once pointed out, but the muscle memory isn't there yet.

**Understanding shift:** Started thinking of `outline` as the natural focus indicator — ended the project with a clear model of why `box-shadow` is the better tool and exactly what `outline: none` + `border-color: transparent` is doing.

---

## Carry-forward Questions

- When should `aria-live="polite"` be added to error messages? In a real form where errors appear dynamically (on submit or on blur), the hint text needs to announce itself — `aria-describedby` alone isn't enough if the element appears after the field is focused.
- Is `.input-group__leading-icon` better than `.input-group__icon--leading` (modifier on the same class)? One approach is DRY but shares positioning logic that differs; the other duplicates some properties but is clearer.
- When does it make sense to use `role="alert"` on error messages instead of `aria-describedby`?

---

## Unlearned Gaps

None — all features in this project were implemented by the user.

---

## What to Practice More

- CSS units discipline — px on every non-zero value, especially in `box-shadow` and typography
- `aria-describedby` vs `aria-labelledby` vs `aria-label` — understand when to use each before the next form component
- BEM descendant selectors — write five examples from memory until the space-vs-no-space distinction is automatic
