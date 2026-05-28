# Checkbox Component

**Checkbox component with 9 visual states using CSS pseudo-classes and SVG icons**

---

## Summary

CSS checkbox using visually hidden input, sibling combinators for 9 states, and SVG background-image icons for checkmark and dash.

---

## Implementation Details

### Tech stack and approach

Built with vanilla HTML, CSS, and minimal JavaScript. The native `<input type="checkbox">` is visually hidden using the accessibility-safe hidden pattern, preserving keyboard focus and native state. A sibling `<span>` handles all visual rendering. All 9 states (3 value × 3 interaction) are driven entirely by CSS pseudo-classes (`+` and `~` combinators) with no JavaScript class toggling. The indeterminate state is activated via one line of JS setting `input.indeterminate = true`. Checkmark and dash icons are SVG files rendered via `background-image` on a sized `::after` pseudo-element.

### Useful resources and lessons learnt

- `:indeterminate` is a CSS-only pseudo-class but requires JS (`input.indeterminate = true`) to trigger — there's no HTML attribute for it
- The `~` general sibling combinator was needed for the disabled label because `.checkbox__label` is not directly adjacent to the input
- `background-size: contain` and `background-repeat: no-repeat` are always needed when using an SVG as a background-image on a sized element
- Scoping `::after` rules to a specific state (`input:checked + .checkbox__box::after`) prevents icons from leaking into other states
- The double `box-shadow` focus ring (`0 0 0 1px` inner + `0 0 0 4px` glow) has zero layout impact — better than `outline` for design fidelity
- `:focus-visible` instead of `:focus` ensures the focus ring only appears for keyboard navigation, not mouse clicks

### Notes/questions for community

- The reference solution styled the `<input>` directly with `appearance: none` and used `::after` for icons. Is this approach more or less reliable across browsers compared to the visually hidden input + sibling span pattern?
- Is there a CSS-only way to trigger the indeterminate state without JavaScript, or is `input.indeterminate = true` always required?
- When would you reach for `:focus` over `:focus-visible` in a real production component?
