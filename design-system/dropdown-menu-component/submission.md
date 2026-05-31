# Dropdown Menu Component

**Custom dropdown with ARIA listbox pattern, event delegation, and CSS opacity animation**

---

## Summary

Custom dropdown with opacity animation, event delegation for selection, keyboard navigation, and full ARIA listbox semantics.

---

## Implementation Details

### Tech stack and approach

Vanilla HTML, CSS, and JavaScript. The trigger is a reused `btn--secondary` button component. The menu uses `opacity` + `pointer-events` instead of `display: none` to enable CSS transitions. Item selection uses event delegation on the menu parent rather than per-item listeners. Keyboard navigation uses `document.activeElement` and `Array.from(NodeList).indexOf()` for ArrowUp/ArrowDown focus movement.

### Useful resources and lessons learnt

- `display: none` cannot be transitioned — use `opacity: 0` + `pointer-events: none` for animatable show/hide
- Event delegation with `event.target.closest()` is cleaner and more scalable than looping over items to add listeners
- `tabindex="0"` is required to make `<li>` elements keyboard-focusable — they're not interactive by default
- For keyboard handlers, use `document.activeElement` not `event.target` — mouse clicks set the target, keyboard events don't
- Stylesheet load order matters: the last-loaded stylesheet wins on equal-specificity rules
- `Array.from()` is needed to use `indexOf` on a NodeList — NodeLists don't have all array methods

### Notes/questions for community

- When should you use `role="menu"` + `role="menuitem"` vs `role="listbox"` + `role="option"`? I used listbox because the items are selectable options, but I'm not sure when to draw the line.
- Is there a clean way to handle keyboard navigation that also opens the dropdown when ArrowDown is pressed while focus is on the trigger?
- Does `pointer-events: none` on the hidden menu also block keyboard events, or only mouse events?
