# Text Input Component — Design System

**A real design system input field - States, icons, focus rings, and aria**

---

## Summary

4 states, 2 icon variants, BEM CSS, custom focus rings via box-shadow, and aria-describedby linking inputs to hint text.

---

## Implementation Details

### Tech stack and approach

Pure HTML and CSS — no JavaScript needed. All states are handled via CSS pseudo-classes (`:focus`, `:disabled`) and BEM modifier classes (`input-group--error`, `input-group--icon-leading`).

The structure uses a three-layer BEM hierarchy: `.input-group` (block) wraps `.input-group__label`, `.input-group__field`, and `.input-group__hint`. The field container holds the `<input>` and icon divs — keeping them siblings rather than nesting icons inside the input, since `<input>` is a void element that can't have children.

Icons are positioned absolutely inside `.input-group__field` (which is `position: relative`). `top: 50%` + `transform: translateY(-50%)` centers them vertically regardless of input height. `padding-right: 38px` and `padding-left: 38px` on the input prevent typed text from running under the icons.

The focus ring uses `box-shadow` instead of `outline` — `box-shadow` supports multiple layers and a spread radius, enabling the inner solid ring + outer glow pattern from the design. The input's border is set to `transparent` on focus so it doesn't bleed through the shadow.

Error state styling targets elements via the BEM modifier descendant pattern: `.input-group--error .input-group__icon` and `.input-group--error .input-group__hint`. The border color stays `#e5e5e5` in the error state — only the icon and hint text turn red. The error focus ring uses a different red (`#d92d20`) than the icon/hint red (`#dc2626`).

SVG icon colors are controlled via `fill="currentColor"` on the `<path>` — setting CSS `color` on the wrapper div propagates to the icon automatically, keeping color changes to a single CSS rule per state.

### Accessibility

- `<label for>` linked to `<input id>` on all inputs — clicking the label focuses the input
- `aria-describedby` on each input pointing to its hint `<p>` id — screen readers announce hint/error text when the field is focused
- Disabled state uses the native `disabled` HTML attribute — browsers handle keyboard exclusion and pointer events automatically

### Useful resources and lessons learnt

- `<input>` does not auto-stretch to fill its parent like block divs do — `width: 100%` is always required
- `display: flex` on an SVG wrapper div kills the phantom baseline gap — inline SVGs reserve descender space below them, making the div taller than the SVG
- `box-shadow` values with missing `px` units fail silently — the entire property is ignored with no error
- `padding` alone determines input height with `box-sizing: border-box` — `height` is redundant when padding + line-height already adds up to the target
- BEM modifier descendant selector needs a space: `.block--modifier .block__element` — no space means "same element has both classes," which is a different selector

### Notes/questions for community

- Is it better to have one shared `.input-group__icon` class for both trailing and leading icons (differentiated by modifier), or separate element classes like `input-group__leading-icon` and `input-group__icon`? The separate approach feels clearer but less DRY.
- For the error state, should `aria-live="polite"` be added to the hint `<p>` so screen readers announce it when it dynamically appears? In this static demo it's not needed, but in a real form it would be.
