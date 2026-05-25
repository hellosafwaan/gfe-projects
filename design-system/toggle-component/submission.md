# Toggle Component

**Toggle component with two sizes and four interactive CSS states**

---

## Summary

CSS-only toggle using input[type=checkbox], chained pseudo-classes, and stacked box-shadows for four interactive states across two sizes.

---

## Implementation Details

### Tech stack and approach

Built with vanilla HTML and CSS — no JavaScript. The toggle uses `<input type="checkbox">` as the semantic base, visually hidden with the accessible hidden technique, paired with a `<span class="toggle-track">` sibling styled via the adjacent sibling combinator (`+`). The thumb is a `::after` pseudo-element. All four states (default, hover, focus, disabled) are handled entirely in CSS using chained pseudo-classes.

### Useful resources and lessons learnt

- `appearance: none` strips all browser-native checkbox styling — required before custom styling can work
- `box-shadow` doesn't affect the box model, making it the right choice for focus rings and border simulations on sized containers
- The adjacent sibling combinator (`+`) is essential for CSS-only form state: `input:checked + .toggle-track`
- `:focus-visible` shows focus rings only on keyboard navigation — `:focus` also triggers on mouse clicks which looks wrong
- Visually hiding an input (`position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0)`) preserves keyboard accessibility unlike `display: none`
- `:has()` enables parent-based styling in pure CSS — used here for `cursor: not-allowed` on the label when the input is disabled

### Notes/questions for community

- Is it standard practice to use `box-shadow` instead of `border` for focus rings in design system components, or are there cases where `outline` is preferred?
- The disabled ON and disabled OFF states look identical in the design — is this intentional for design systems (no visual distinction between states when disabled)?
- For the `transition` on the thumb, both `left` and `right` are listed — does the browser animate both simultaneously when switching between them, or only the one that changes?
