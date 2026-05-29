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

## role="switch" for toggle components

When using `<input type="checkbox">` as a toggle switch, add `role="switch"` to tell screen readers it's a switch (on/off), not a checkbox (checked/unchecked).

```html
<input type="checkbox" role="switch" id="toggle-1">
```

Without it, screen readers announce "checkbox" — with it, they announce "switch, off" / "switch, on".

---

## Visually hidden inputs — keeping form elements accessible

Never use `display: none` on interactive inputs. It removes them from the accessibility tree.
Use the visually hidden technique instead:

```css
input[type="checkbox"] {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

The input stays keyboard-focusable and screen reader readable. See `css-properties.md` for the full pattern.

---

## :focus-visible for keyboard-only focus rings

```css
input:focus-visible + .toggle-track {
  box-shadow: 0 0 0 4px rgba(68, 76, 231, 0.12);
}
```

`:focus-visible` shows the ring only when navigating by keyboard — not when clicking with a mouse. Preferred over `:focus` for custom focus rings on form controls.

---

## role="alert" and aria-live for notifications (toast)

Live regions announce content changes to screen readers without requiring focus.

```html
<div id="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <!-- toast content -->
</div>
```

- `role="alert"` — screen reader announces the content immediately when it appears; implies `aria-live="assertive"`
- `aria-live="assertive"` — interrupts current announcement; used alongside `role="alert"` for browser compatibility
- `aria-live="polite"` — waits for the user to be idle before announcing (use for non-urgent updates)
- `aria-atomic="true"` — reads the entire region as one announcement, not just the changed part

**Key rule:** Only add to the **live/functional** element. Static comparison copies of a component do NOT get `role="alert"` — screen readers announce live regions on page load, which would be noisy.

---

## Checklist for any overlay/modal

- [ ] `role="dialog"` and `aria-modal="true"` on the overlay element
- [ ] `aria-expanded` on the trigger button, updated on open/close
- [ ] `aria-controls` on the trigger pointing to the overlay's `id`
- [ ] Focus moves into the overlay when it opens
- [ ] Focus returns to the trigger when it closes
- [ ] Escape key closes it
- [ ] Focus is trapped inside while open
