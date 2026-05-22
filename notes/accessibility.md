# Accessibility Reference

> **Status: Partial.** `aria-expanded`, focus trap, and overlay patterns were applied by the coach (navbar). `aria-describedby` was implemented hands-on (text-input-component).

---

## aria-expanded

Tells screen readers whether a toggle button is currently open or closed. Without it, a screen reader just announces "button" — the user has no idea what state the menu is in.

```html
<button aria-expanded="false" aria-controls="mobile-menu">Open menu</button>
```

```javascript
// Update it in JS every time the state changes
hamburger.setAttribute('aria-expanded', 'true');   // when opening
hamburger.setAttribute('aria-expanded', 'false');  // when closing
```

**Rule:** Any button that shows/hides something needs `aria-expanded`.

---

## aria-controls

Links a button to the element it controls. Screen readers use this to let the user jump directly to the controlled element.

```html
<button aria-controls="mobile-menu">Open menu</button>
<div id="mobile-menu">...</div>
```

The `id` on the target and the `aria-controls` value must match exactly.

---

## role="dialog" and aria-modal

Used on overlay elements (modals, mobile menus) that sit on top of the rest of the page. Tells screen readers: "this is a focused context — don't read the content behind it."

```html
<div role="dialog" aria-modal="true" aria-label="Navigation menu">
  <!-- menu content -->
</div>
```

- `role="dialog"` — declares this is a dialog/overlay
- `aria-modal="true"` — tells screen readers to ignore everything outside
- `aria-label` — gives the dialog a name (since it has no visible heading)

---

## Focus management

When an overlay opens, focus should move into it. When it closes, focus should return to the element that opened it. Without this, keyboard users lose their place.

```javascript
function openMenu() {
    mobileMenu.classList.add('open');
    closeButton.focus(); // move focus into the menu
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.focus(); // return focus to where the user was
}
```

**Rule:** Opening an overlay → focus goes in. Closing it → focus returns to the trigger.

---

## Escape key to close

Keyboard users expect `Escape` to dismiss any overlay — modals, menus, dropdowns. It's a standard convention.

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
    }
});
```

**Rule:** Any overlay needs an Escape listener.

---

## Focus trap

When an overlay is open, Tab should cycle only through the elements inside it — not escape to the page behind. Without a focus trap, a keyboard user can tab out of the menu into the hidden page.

```javascript
const focusableSelectors = 'a[href], button:not([disabled])';

mobileMenu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = [...mobileMenu.querySelectorAll(focusableSelectors)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus(); // Shift+Tab on first → wrap to last
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus(); // Tab on last → wrap to first
    }
});
```

**How it works:**
- `querySelectorAll(focusableSelectors)` finds all focusable elements inside the menu
- If the user presses Tab on the last one, wrap back to the first
- If the user presses Shift+Tab on the first one, wrap to the last
- `e.preventDefault()` stops the browser's default Tab behaviour (moving to next element outside the menu)

**Common focusable selectors:** `a[href]`, `button:not([disabled])`, `input`, `select`, `textarea`, `[tabindex]`

---

## aria-describedby

Links an input to its hint or error message. Screen readers announce the hint text when the field is focused.

```html
<input id="input-error" aria-describedby="hint-error" type="text" />
<p id="hint-error">This is an error message.</p>
```

- Goes on the `<input>`, pointing to the hint's `id`
- The hint element just needs an `id` — no aria attribute on it
- Common mistake: putting `aria-describedby` on the hint instead of the input

---

## Checklist for any overlay/modal

- [ ] `role="dialog"` and `aria-modal="true"` on the overlay element
- [ ] `aria-expanded` on the trigger button, updated on open/close
- [ ] `aria-controls` on the trigger pointing to the overlay's `id`
- [ ] Focus moves into the overlay when it opens
- [ ] Focus returns to the trigger when it closes
- [ ] Escape key closes it
- [ ] Focus is trapped inside while open
