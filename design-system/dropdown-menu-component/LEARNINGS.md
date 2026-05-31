# Dropdown Menu Component — Learnings

## Concepts Learned

### Custom dropdown vs native `<select>`
Native `<select>` is inaccessible to style. Custom dropdowns use `<button>` + `<ul>` + `<li>` with full CSS and JS control.
```html
<button class="dropdown__trigger">Privacy options</button>
<ul class="dropdown__menu" role="listbox">
  <li role="option">Public</li>
</ul>
```

### `tabindex="0"` — making non-interactive elements focusable
`<li>` elements aren't in the tab order by default. `tabindex="0"` adds them to the natural tab sequence.
```html
<li class="dropdown__item" tabindex="0">Public</li>
```
`tabindex="-1"` = JS-only focus (used in focus traps). `tabindex="0"` = natural tab order.

### `opacity` + `pointer-events` for animatable show/hide
`display: none` can't be transitioned. Use `opacity: 0` + `pointer-events: none` for animatable visibility.
```css
.dropdown__menu {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown__menu.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

### Event delegation
One listener on the parent catches clicks from any child, using `event.target.closest()` to identify which item was clicked.
```js
dropdownMenuElement.addEventListener('click', (event) => {
  const item = event.target.closest('.dropdown__item');
  if (!item) return;
  selectItem(item);
});
```
More efficient than looping and adding a listener to each item.

### `Array.from()` on NodeLists
`querySelectorAll` returns a NodeList — not a real array. Convert to use array methods like `indexOf`.
```js
const items = Array.from(dropdownItemElements);
const index = items.indexOf(document.activeElement);
```

### `document.activeElement`
Returns the currently focused element. Used for keyboard navigation to know which item has focus.
```js
const currentFocusedElement = document.activeElement;
```

### `element.contains()` for outside click detection
```js
document.addEventListener('click', (event) => {
  if (!dropdownMenuElement.contains(event.target) && !dropdownTriggerElement.contains(event.target)) {
    closeDropdown();
  }
});
```
`contains()` returns true if the element is the node itself or a descendant of it.

### ARIA for custom dropdowns
```html
<button aria-haspopup="listbox" aria-expanded="false">...</button>
<ul role="listbox">
  <li role="option" aria-selected="false">...</li>
  <li role="option" aria-selected="true">...</li>
</ul>
```
JS must keep `aria-expanded` and `aria-selected` in sync with visual state.

### `flex: 1` on a flex child
Makes a child grow to fill all remaining space in the flex container — useful for pushing the last item (checkmark) to the far right.
```css
.dropdown__item-label { flex: 1; }
```

### CSS specificity and stylesheet load order
When two rules target the same element, the one in the stylesheet that loads **last** wins. Reorder `<link>` tags to control which stylesheet takes precedence.

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `dropdown__menu__item` class name | Chained three BEM levels — BEM doesn't do this | Renamed to `dropdown__item` |
| `btn-md` (single dash) | Class didn't match `btn--md` in the stylesheet — no size styles applied | Fixed to `btn--md` |
| `dropdown_item-label` (single underscore) | Typo meant `flex: 1` never applied — checkmark didn't push right | Fixed to `dropdown__item-label` |
| `position: relative` on menu not wrapper | Needs to be on `.dropdown` so the menu positions relative to the trigger | Moved to `.dropdown` |
| `classList.toggle` for selection | Clicking an already-selected item would deselect it — no selection state | Changed to `remove` all then `add` on clicked item |
| `selectItem` defined before `closeDropdown` | `const` functions aren't hoisted — `closeDropdown` wasn't available yet | Moved `closeDropdown` above `selectItem` |
| `event.target` for Enter key handler | Keyboard events don't set `event.target` to the focused item | Used `document.activeElement` instead |
| Space vs no-space combinator | `.dropdown__menu .show` targets a child named `show` — not the menu with both classes | Changed to `.dropdown__menu.show` (no space) |
| `display: none` for show/hide animation | `display` can't be transitioned — menu snapped on/off | Replaced with `opacity` + `pointer-events` pattern |

---

## Patterns to Reuse

**Animatable show/hide (opacity + pointer-events)**
```css
.element { opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
.element.show { opacity: 1; pointer-events: auto; }
```

**Event delegation with closest()**
```js
parent.addEventListener('click', (event) => {
  const item = event.target.closest('.item-class');
  if (!item) return;
  // handle item
});
```

**Outside click to close**
```js
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !trigger.contains(event.target)) {
    close();
  }
});
```

**Keyboard navigation in a list**
```js
const items = Array.from(querySelectorAll('.item'));
const index = items.indexOf(document.activeElement);
if (event.key === 'ArrowDown' && index < items.length - 1) items[index + 1].focus();
if (event.key === 'ArrowUp' && index > 0) items[index - 1].focus();
```

**Stylesheet load order for overrides**
Load base stylesheets first, project stylesheets last. Later = higher specificity at equal weight.

---

## What You Did Well

- **Questioned the extra `<div>` wrapper** — correctly identified that the `<ul>` itself was the menu container and the wrapper wasn't needed.
- **Instinctively suggested `flex: 1`** to push the checkmark right — right answer, even without knowing exactly why it worked.
- **Refactored `selectItem` unprompted** — spotted the repeated selection logic and proposed extracting it before being asked.
- **Chose `outline` over `border` for focus** — correctly reasoned that `outline` doesn't affect layout, showing solid box model understanding.

---

## What to Improve

- **Slow down on BEM class names** — `btn-md`, `dropdown_item-label` typos caused invisible bugs. Write class names carefully, check HTML against CSS before moving on.
- **Check `const` declaration order** — functions that call other functions must be declared after their dependencies.
- **Space vs no-space combinator** — still confusing `.parent .child` (descendant) vs `.parent.child` (same element). Read every selector aloud before writing it.
- **Clarify `event.target` vs `document.activeElement`** — mouse clicks set `event.target` to the clicked element; keyboard events don't. Use `document.activeElement` for keyboard handlers.

---

## Interview Connections

- **Custom dropdown vs `<select>`** — "Why not just use `<select>`?" is a real interview question. Answer: styling limitations, icon support, custom interactions.
- **Event delegation** — "How would you handle clicks on a dynamic list?" — one listener on parent, `closest()` to find the target. More performant than per-item listeners.
- **ARIA for interactive components** — `aria-haspopup`, `aria-expanded`, `role="listbox"`, `role="option"`, `aria-selected` — all expected in a senior frontend interview.
- **`opacity` + `pointer-events` for animation** — "How would you animate a dropdown?" — `display` can't transition; `opacity` + `pointer-events: none` is the correct answer.
- **`tabindex` values** — `0` = natural tab order, `-1` = JS-only focus. Common accessibility interview question.

---

## How You Thought

- Started with "conditionally rendering" the dropdown — this is a React concept. Had to shift to the vanilla pattern: always in DOM, toggle a class to show/hide.
- Correctly identified the extra `<div>` wrapper wasn't needed — good structural instinct before writing any code.
- Suggested `flex: 1` by instinct without knowing what it did — the instinct was right, and understanding came after.
- Initially used `classList.toggle` for selection — logical at first but missed the edge case of clicking an already-selected item.
- Questioned stylesheet load order when `justify-content: space-between` wasn't working — correctly diagnosed it as a specificity/order issue and found the fix (swapping `<link>` order).
- Needed prompting on `document.activeElement` vs `event.target` for keyboard handlers — the distinction between "what was clicked" vs "what is focused" wasn't intuitive yet.

---

## Carry-forward Questions

- When `aria-expanded` is toggled, does a screen reader re-announce the button label automatically, or do you need `aria-live`?
- How would you implement keyboard navigation that also opens the dropdown on ArrowDown when focus is on the trigger?
- `pointer-events: none` prevents clicks — does it also block keyboard events on the hidden menu?
- When would you use `role="menu"` + `role="menuitem"` instead of `role="listbox"` + `role="option"`?
- How would you handle a dropdown with 50+ items — would you virtualise the list?

---

## Unlearned Gaps (if any)

None — all features in this project were implemented by Safwaan.

---

## What to Practice More

- BEM class name accuracy — slow down when typing, check HTML matches CSS before running
- CSS combinator space vs no-space — write every selector aloud before saving
- Keyboard vs mouse event handling — `event.target` (mouse) vs `document.activeElement` (keyboard)
