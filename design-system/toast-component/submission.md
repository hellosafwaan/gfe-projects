# Toast Component

**Toast notification component with CSS transitions and ARIA live region**

---

## Summary

Four variant toast (success, error, warning, info) with slide-in animation via CSS transitions, class toggling, and aria-live.

---

## Implementation Details

### Tech stack and approach

Pure HTML, CSS, and vanilla JavaScript. Four variants styled with BEM modifiers — variant backgrounds and text colours scoped cleanly so shared typography lives on the base element. The live toast uses a two-element structure: a `position: fixed` full-viewport overlay that handles the slide animation, and the inner pill that carries the visual styling. Entrance and exit are driven by `.show`/`.hide` class toggles with a `transitionend` listener for cleanup.

### Useful resources and lessons learnt

- CSS `transition` animates property changes on class toggle — no JavaScript animation needed
- Separating the fixed overlay from the pill element avoids CSS specificity conflicts between ID and class selectors
- `transitionend` is the right hook for cleanup after exit animations — the `classList.contains` guard prevents it firing after the entrance transition
- `role="alert"` and `aria-live="assertive"` belong only on the live toast, not static comparison elements — screen readers announce live regions on page load
- Viewport vertical centering: `min-height: 100vh` + `display: flex` + `align-items: center` is the standard pattern
- `<p>` elements have default browser margins — always reset with `margin: 0` inside tightly-sized components

### Notes/questions for community

- How would you queue multiple toasts stacked at the top? Does each get its own fixed container, or does a single container manage the stack?
- `transitionend` fires once per transitioned property — with `top` and `opacity` both transitioning, does the guard reliably prevent double-firing across all browsers?
- When would you use `aria-live="polite"` over `"assertive"` for a toast? Are there cases where interrupting the screen reader would be wrong?
