# Textarea Component

**Textarea component with 8 states, live character counter, and full accessibility**

---

## Summary

Textarea with 8 visual states using CSS modifier classes, a live JS character counter, and aria-describedby for accessibility.

---

## Implementation Details

### Tech stack and approach

Vanilla HTML, CSS, and JavaScript. All state changes (error, exceeded, focused) are driven by BEM modifier classes on the wrapper — one class controls border, counter visibility, and error message via descendant selectors. The character counter updates in real-time via an `input` event listener using `event.target.value.length`.

### Useful resources and lessons learnt

- `closest()` is the clean way to traverse from an event target up to its wrapper — no need for separate ID selectors
- `box-shadow` is preferred over `border` for focus rings because it doesn't shift layout
- Whitespace between `>` and `</textarea>` counts as content — always close with `></textarea>` on the same line
- Two separate focus ring colors: indigo for normal focus, red (`#d92d20`) for error/exceeded focus — verified directly in Figma effects panel
- `display: none` / `display: block` toggling is the right pattern for counter ↔ error message swap
- `aria-describedby` on the textarea pointing to the footer span satisfies the WCAG accessibility requirement

### Notes/questions for community

- How would you handle a configurable `maxLength` per instance without hardcoding 500 in JS?
- Is there a cleaner pattern for wiring up multiple textarea instances on the same page without selecting each by ID?
- Should the exceeded counter also use `aria-live` to announce the limit to screen readers?
