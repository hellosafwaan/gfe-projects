# Modal Dialog Component

**Modal dialog with primary and danger variants, event-target close**

---

## Summary

Two-variant modal using fixed overlay, classList toggle, showModal() JS API, and event.target outside-click detection.

---

## Implementation Details

### Tech stack and approach

Built with semantic HTML, vanilla CSS, and vanilla JavaScript — no frameworks or libraries. The modal uses a two-layer structure: a `position: fixed` overlay covering the viewport, and a centered white card inside it. Visibility is toggled via a `.show` class added/removed by JavaScript. A `showModal(variant, title, description)` function handles both the `primary` (indigo) and `danger` (red) variants by swapping button classes and labels dynamically.

### Useful resources and lessons learnt

- `position: fixed` with `top/right/bottom/left: 0` is the standard full-screen overlay pattern — cleaner than `width: 100%; height: 100%`
- `flex-shrink: 0` on the close icon prevents it from compressing when the title text is long — essential for any fixed-size element next to text in a flex row
- `event.target === overlay` is the correct check for "click outside to close" — the click bubbles up, but `event.target` reveals where it actually landed
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` is the complete ARIA pattern for modal dialogs — screen readers announce the title when the modal opens
- `aria-hidden` should be `"false"` when the modal is open and `"true"` when closed — backwards from what feels intuitive

### Notes/questions for community

- Is `aria-hidden` on the dialog element the right approach, or should it go on the overlay? The reference implementation used it differently.
- For the danger variant, should the button label change ("Delete" vs "Yes") or stay consistent? I went with "Delete" for danger — curious what others used.
- What's the cleanest way to add a CSS fade transition to this modal given it uses `display: none` — do you need to switch to `opacity` + `pointer-events: none` instead?
