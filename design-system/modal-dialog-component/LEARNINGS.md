# Modal Dialog Component — Learnings

## Concepts Learned

### Two-layer modal structure
A modal is always two elements — not one. The overlay fills the viewport and dims the page; the card sits centered on top.

```html
<div class="modal-overlay">   <!-- full-screen dimmed layer -->
  <div class="modal">         <!-- white card -->
    ...
  </div>
</div>
```

The overlay uses `position: fixed` pinned to all four edges. The card is centered with flexbox on the overlay.

```css
.modal-overlay {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(10, 10, 10, 0.70);
}
```

---

### Show/hide modal with a class toggle
Same pattern as the navbar and toast — `display: none` by default, a `.show` class enables it.

```css
.modal-overlay { display: none; }
.modal-overlay.show { display: flex; }
```

```js
function showModal() { modalOverlay.classList.add('show'); }
function closeModal() { modalOverlay.classList.remove('show'); }
```

---

### role="dialog", aria-modal, aria-labelledby
The full modal ARIA pattern — first time using it hands-on.

```html
<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  id="modal"
>
  <p class="modal__title" id="modal-title">Are you sure?</p>
```

- `role="dialog"` — tells screen readers this is a dialog
- `aria-modal="true"` — tells screen readers to ignore everything outside
- `aria-labelledby` — links the dialog to its title by ID; screen reader announces it when modal opens

---

### aria-hidden toggling
When a modal opens, set `aria-hidden="false"` on the dialog element. When it closes, set `aria-hidden="true"`. This tells screen readers whether the dialog is active.

```js
modal.setAttribute('aria-hidden', 'false'); // on open
modal.setAttribute('aria-hidden', 'true');  // on close
```

---

### flex-shrink: 0 — preventing flex children from shrinking
In a flex row, all children can shrink by default to share available space. When the title is long, the close button gets squeezed.

`flex-shrink: 0` locks an element to its defined size — it will never compress, no matter how much its siblings need space.

```css
.modal__close {
  width: 24px;
  height: 24px;
  flex-shrink: 0; /* never squishes — stays 24×24 always */
}
```

Use this pattern on: icons, avatars, badges, buttons — anything with a fixed size sitting next to text.

---

### showModal() — JS-driven variant switching
A function that accepts a `variant` parameter and dynamically applies the right button class and label.

```js
function showModal(variant, title, description) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  modalAction.classList.remove('btn--primary', 'btn--destructive');
  modalAction.classList.add(`btn--${variant}`);
  modalAction.textContent = variant === 'primary' ? 'Yes' : 'Delete';

  modal.setAttribute('aria-hidden', 'false');
  modalOverlayElement.classList.add('show');
}
```

Always `remove` the previous variant classes before `add`ing the new one — otherwise both pile up.

---

### Event target checking — "click outside to close"
Click events bubble up the DOM. When the user clicks the dark overlay, the click lands on `.modal-overlay`. When they click inside the card, the click lands on a child element — but it still bubbles to the overlay listener.

`event.target` tells you where the click actually landed. Check it's the overlay itself before closing:

```js
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
```

- `event.target` — the element that was actually clicked (where the click originated)
- `event.currentTarget` — the element the listener is attached to

This pattern is used everywhere: modals, dropdowns, sidebars — any "click outside to dismiss" behaviour.

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `modal_content` single underscore | BEM typo — CSS class didn't match HTML | Always `__` for BEM elements |
| `aria-labelledby="some-id"` | Placeholder left in — pointed to nothing | Give the title a real `id` and use it |
| `triggerButton.addEventListener('click', showModal)` | Passed function reference — click event object was passed as `variant` arg | Wrap in arrow function: `() => showModal('primary', ...)` |
| `modalAction` undefined | Used before selecting it | Add `document.getElementById('modalPrimaryAction')` |
| `aria-hidden = 'true'` on open | Backwards — hid the modal from screen readers when it should be visible | `'false'` on open, `'true'` on close |
| `classList.add` without removing previous | Variant classes pile up on repeated open | Always `.remove('btn--primary', 'btn--destructive')` first |
| Extra `)` on `getElementById` call | Syntax error crashed the whole script | Careful with bracket matching |

---

## Patterns to Reuse

**Fixed full-screen overlay:**
```css
.overlay {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Click-outside-to-close:**
```js
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) closeModal();
});
```

**JS-driven variant function:**
```js
function showModal(variant, title, description) {
  actionBtn.classList.remove('btn--primary', 'btn--destructive');
  actionBtn.classList.add(`btn--${variant}`);
  actionBtn.textContent = variant === 'primary' ? 'Yes' : 'Delete';
  overlay.classList.add('show');
}
```

**flex-shrink: 0 for fixed-size icons next to text:**
```css
.icon-button { width: 24px; height: 24px; flex-shrink: 0; }
```

---

## What You Did Well

- **Accessibility without prompting** — added `aria-label="Close"` to the close button before being asked. That's a genuine habit now.
- **Questioned the container structure** — pushed back on whether the overlay belonged inside `.container`. Right instinct; correct conclusion (it doesn't).
- **Proposed `showModal()` independently** — came up with a parameterised function before being told. Senior-level thinking.
- **BEM naming stayed consistent** — `modal__header`, `modal__content`, `modal__actions`, `modal__title`, `modal__description` — all correct first time.

---

## What to Improve

- **Don't leave placeholder values in** — `aria-labelledby="some-id"` shipped as-is. Get in the habit of completing every attribute before moving on.
- **Select elements before using them** — `modalAction` was referenced on line 17 before being declared. Read your variable list top-to-bottom before writing the logic.
- **`classList.remove` before `add` on toggle patterns** — whenever a class can switch between values (`btn--primary` vs `btn--destructive`), remove both first.
- **Wrap function references in arrow functions for event listeners** — `addEventListener('click', myFunc)` passes the event object as the first argument. Always `() => myFunc(args)`.

---

## Interview Connections

- **Modal / overlay pattern** — extremely common interview question. Knowing the two-layer structure (overlay + card), `position: fixed` all-four-edges, and flex centering is expected.
- **event.target vs event.currentTarget** — a classic interview question. "Click outside to close" is a standard coding challenge.
- **ARIA dialog pattern** — accessibility interviews ask about this directly. `role="dialog"` + `aria-modal` + `aria-labelledby` is the complete answer.
- **flex-shrink / flex-grow** — frequently asked in CSS interviews. Understanding that flex children shrink by default and how to prevent it is core flex knowledge.
- **aria-hidden** — toggling it correctly on open/close is part of accessible modal implementation, asked in senior frontend interviews.

---

## How You Thought

- **Didn't know what an overlay was** — first time building one. Once explained as "same as the toast wrapper, just bigger," clicked immediately.
- **Assumed "hiding from DOM" meant toggling display** — close but imprecise. The distinction between "removed from DOM entirely" vs "visually hidden" was new.
- **Good instinct on the container** — pushed back on removing it, knowing the trigger button needed to live somewhere. Correct.
- **Proposed showModal() before being asked** — didn't wait to be told how to handle variants. Jumped straight to a parameterised function. Strong instinct.
- **Didn't initially see that `addEventListener('click', showModal)` would break** — understood immediately once the reason was explained (event object as first arg).
- **aria-hidden backwards** — set `'true'` on open. Common first-time mistake — the mental model of "hidden = false when visible" hasn't fully clicked yet.

---

## Carry-forward Questions

- How does a focus trap work inside a modal? (Listed in stretch goals — not implemented)
- Should `aria-hidden` go on the overlay or the dialog card? (Used on the card here, reference used differently)
- What's the difference between `aria-hidden="true"` and `display: none` for screen readers?
- When should you use `inert` attribute instead of `aria-hidden` to block background content?
- How would you add a CSS transition (fade in/out) to the modal overlay — can `display: none` transition, or do you need `opacity`?

---

## Unlearned Gaps (if any)

None — all implemented hands-on. Focus trap and Escape key (stretch goals) were not built but were discussed conceptually.

---

## What to Practice More

- **`flex-shrink` / `flex-grow` / `flex-basis`** — only `flex-shrink: 0` was used here. The full flex shorthand needs more reps.
- **`aria-hidden` toggling** — got it backwards first time. Practice the pattern: `false` = visible to screen readers, `true` = hidden.
- **Variant switching with classList** — remove-then-add pattern needs to become automatic.
