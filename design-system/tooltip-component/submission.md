# Tooltip Component

**Tooltip component with 9 position variants built in pure CSS**

---

## Summary

CSS-only hover via :hover descendant selector, 9 BEM variants, and a rotated ::after square for directional arrows.

---

## Implementation Details

### Tech stack and approach

Built with HTML and CSS only — no JavaScript. Hover interaction is handled entirely through the `.tooltip-trigger:hover .tooltip` descendant combinator. The tooltip is hidden by default (`display: none`) and shown when its wrapper is hovered.

Nine position variants are implemented as BEM modifiers (`tooltip--top-start`, `tooltip--right`, etc.), each using `position: absolute` relative to the `.tooltip__content` parent. The directional caret is a 12×12px square `::after` pseudo-element rotated 45° and half-tucked outside the content box edge — same rotation for all directions, only the offset coordinates change per variant.

### Useful resources and lessons learnt

- **`transform` order matters** — `translateX(-50%) rotate(45deg)` vs `rotate(45deg) translateX(-50%)` give completely different results. Transforms apply right-to-left, so the later-listed transform defines the axis for earlier ones.
- **CSS cascade conflicts with `position` properties** — setting `bottom: 100%` on the base `.tooltip` class leaked into right/left/bottom variants. Fixed by explicitly overriding with `bottom: auto; margin-bottom: 0;` where needed.
- **`::after` requirements** — `content: ""` is mandatory (without it the element doesn't exist), and `display: block` is required for `width`/`height` to apply (default is inline).
- **Flip arrow visibility logic** — instead of hiding the arrow for `--none` via an extra utility class, hide by default on `--none` and show explicitly on all named variants with a grouped selector.
- **`white-space: nowrap`** prevents tooltip text from collapsing and wrapping inside a narrow container — easy to overlook until it breaks.

### Notes/questions for community

- The CSS-only `:hover` approach doesn't support keyboard focus (`Tab` navigation). What's the cleanest way to extend this — `:focus-within` on the trigger? Or does it require JS at that point?
- The reference implementation uses `transition: opacity` on a `.visible` class for a fade-in effect. Is there a clean way to achieve a fade-in on `display` toggle in CSS without the JS class swap?
- When would you recommend the JS approach (reference/index.js) over CSS-only for a tooltip in a real design system?
