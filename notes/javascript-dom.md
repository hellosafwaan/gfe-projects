# JavaScript DOM Reference

## Selecting elements

```javascript
document.querySelector('.class')     // first matching element
document.querySelectorAll('.class')   // all matching elements (NodeList)
document.getElementById('id')        // by ID
```

### Selector syntax
- `#id` — selects by id
- `.class` — selects by class
- Common mistake: using `#` when you mean `.` — returns null silently

---

## Traversing the DOM

### closest()
Walks up the DOM tree from an element and returns the nearest ancestor matching a selector. Use in event handlers to get the wrapper without selecting it separately by ID.

```javascript
element.addEventListener('input', (event) => {
  const group = event.target.closest('.textarea-group');
  group.classList.add('textarea-group--exceeded');
});
```

Use `closest()` whenever you need to go from a child element (e.g. the input that fired the event) up to a parent wrapper.

---

## Event listeners

```javascript
element.addEventListener('click', () => {
  // runs when element is clicked
});
```

**Common event names:**
- `'click'` — mouse click or tap
- `'input'` — value changes in input field
- `'submit'` — form submitted
- `'keydown'` — key pressed

**Key rule:** `addEventListener` uses `'click'`, NOT `'onclick'`. The `on` prefix is for HTML attributes only (`<button onclick="...">`). This is a very common first-time mistake.

---

## classList

Toggle CSS classes on elements via JavaScript — the standard way to drive UI state.

```javascript
element.classList.add('open')      // adds class
element.classList.remove('open')   // removes class
element.classList.toggle('open')   // adds if absent, removes if present
element.classList.contains('open') // returns true/false
```

**Pattern — show/hide with a class:**
```css
.mobile-menu { display: none; }
.mobile-menu.open { display: flex; }
```
```javascript
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});
```

Use `toggle` when one button controls both open and close. Use `add`/`remove` when separate buttons handle each action.

---

## setTimeout

Runs a function after a delay (in milliseconds).

```js
setTimeout(() => {
  // runs after 3000ms
}, 3000);
```

Use for auto-dismissing toasts, debouncing, or anything that needs to happen after a delay. Returns a timer ID you can pass to `clearTimeout()` to cancel.

---

## transitionend event

Fires on an element when a CSS transition finishes. Use for cleanup after exit animations.

```js
toast.addEventListener('transitionend', () => {
  if (toast.classList.contains('hide')) {
    toast.classList.remove('hide'); // reset after exit animation
  }
});
```

The `classList.contains` guard is important — `transitionend` fires after both the entrance and exit transitions. Without the guard, it would incorrectly clean up after the entrance too.

Note: fires once per transitioned property — if `top` and `opacity` both transition, the event fires twice.

---

## event.target vs event.currentTarget

Used for "click outside to close" behaviour on overlays, modals, and dropdowns.

- **`event.target`** — the element that was actually clicked (where the click originated)
- **`event.currentTarget`** — the element the listener is attached to

```js
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeModal(); // only fires when clicking the overlay itself, not its children
  }
});
```

Click events bubble up the DOM — clicking inside the card still reaches the overlay listener. `event.target` tells you where the click actually started, so you can ignore clicks that originated inside the card.

Use this pattern anywhere you need "click outside to dismiss": modals, dropdowns, sidebars, tooltips.

---

## Passing functions to event listeners

When passing a function to `addEventListener`, the event object is passed as the first argument automatically:

```js
// WRONG — event object becomes the `variant` argument
button.addEventListener('click', showModal);

// CORRECT — wrap in arrow function to pass your own arguments
button.addEventListener('click', () => showModal('primary', title, description));
```

Always wrap in an arrow function when the handler needs specific arguments.

---

## Event delegation

One listener on a parent catches events from all children. Use `event.target.closest()` to identify which child triggered it.

```js
menu.addEventListener('click', (event) => {
  const item = event.target.closest('.dropdown__item');
  if (!item) return;
  selectItem(item);
});
```

More scalable than adding a listener to each item. Also works for dynamically added children.

---

## document.activeElement

Returns the element that currently has keyboard focus.

```js
const focused = document.activeElement;
const index = Array.from(items).indexOf(focused);
```

Use in keyboard handlers (`keydown`) — `event.target` is not reliable for keyboard events. Use `document.activeElement` instead.

---

## Array.from() on NodeLists

`querySelectorAll` returns a NodeList — not a real array. It doesn't have `indexOf`, `map`, `filter` etc.

```js
const items = Array.from(document.querySelectorAll('.item'));
const index = items.indexOf(document.activeElement);
```

Always convert with `Array.from()` before using array methods.

---

## data-* attributes and dataset

Store custom metadata on HTML elements. Any attribute starting with `data-` is yours to name.

```html
<button data-tab="account">Account</button>
<li data-value="public">Public</li>
```

Read in JS via `dataset` — the `data-` prefix becomes `dataset.` and the rest stays the same:

```js
button.dataset.tab    // → "account"
item.dataset.value    // → "public"
```

Use to connect interactive elements to their targets without hardcoding IDs in JS. Common pattern: `data-tab` → `getElementById(value + "-panel")`.

---

## setAttribute / removeAttribute

Set or remove HTML attributes on elements at runtime.

```js
element.setAttribute('aria-selected', 'true');
element.setAttribute('hidden', '');
element.removeAttribute('hidden');
```

Use for ARIA attributes that must stay in sync with visual state, and for toggling the `hidden` attribute to show/hide panels accessibly.

---

## element.contains()

Returns `true` if the argument is the element itself or a descendant. Used for outside-click detection.

```js
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !trigger.contains(event.target)) {
    close();
  }
});
```

---

## HTML attributes vs DOM properties

These look similar but are different things.

**HTML attribute** — written in markup, always a string, sets the *initial* state:
```html
<input type="checkbox" checked>
```

**DOM property** — a JavaScript property on the element object, can be any type, reflects *current* state:
```js
input.checked // true or false right now
```

The classic example — after a user clicks a checkbox:
```js
input.getAttribute('checked') // still "" (the original HTML, unchanged)
input.checked                 // false (the current truth)
```

**Key rule:** Attributes set the default. Properties reflect what's happening right now. They can get out of sync.

### `indeterminate` — property only, no attribute
Some DOM properties have no HTML attribute at all. `indeterminate` on a checkbox is one — you can only set it via JS:
```js
input.indeterminate = true  // shows a dash, neither checked nor unchecked visually
```
There's nothing to write in HTML to trigger it. This is why it always requires JavaScript.