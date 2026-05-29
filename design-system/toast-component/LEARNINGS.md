# Toast Component — Learnings

## Concepts Learned

### CSS `transition`
Animates a CSS property change smoothly over time instead of snapping instantly. Applied when a class is added or removed.

```css
#toast-demo {
  transition: top 0.5s ease, opacity 0.5s ease;
}
```

Format: `transition: property duration timing-function`. The timing function (`ease`, `linear`, `ease-in-out`) controls the speed curve — `ease` starts fast and slows at the end, making motion feel natural.

### CSS timing functions
Control the acceleration curve of a transition. `ease` is the right default for most UI animations — it feels natural because it decelerates as the element settles into place.

### `transitionend` DOM event
Fires when a CSS transition finishes. Used here to clean up after the exit animation — remove `.hide` so the toast resets to its original hidden state, ready to fire again.

```js
toast.addEventListener('transitionend', () => {
  if (toast.classList.contains('hide')) {
    toast.classList.remove('hide');
  }
});
```

The `if` guard prevents the handler from firing after the entrance transition (only clean up after `.hide`).

### Fixed toast overlay pattern
The live toast uses two layers:
1. **Outer wrapper** (`#toast-demo`) — `position: fixed; width: 100%; display: flex; justify-content: center` — transparent full-viewport overlay
2. **Inner pill** (`.toast.toast--success`) — the visible component with colours and border-radius

Starting hidden with `top: -100px; opacity: 0`, transitioning to `top: 20px; opacity: 1` on `.show`.

```css
#toast-demo {
  position: fixed;
  top: -100px;
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: top 0.5s ease, opacity 0.5s ease;
}
#toast-demo.show { top: 20px; opacity: 1; }
#toast-demo.hide { top: -100px; opacity: 0; }
```

### Viewport vertical centering
```css
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
`min-height: 100vh` makes the container fill the full viewport. Flex then centres the child both horizontally and vertically. One of the most-used layout patterns in real projects.

### `role="alert"` and `aria-live` for notifications
Live regions announce content changes to screen readers without requiring focus.

```html
<div id="toast-demo" role="alert" aria-live="assertive" aria-atomic="true">
```

- `role="alert"` — screen reader announces content immediately when it appears
- `aria-live="assertive"` — interrupts current announcement (redundant with `role="alert"` but used for compatibility)
- `aria-atomic="true"` — reads the whole region as one unit, not just the changed part

Goes on the **live toast wrapper only** — not on static comparison elements.

### CSS specificity: ID beats class
An ID selector (`#toast-demo`) has higher specificity than a class selector (`.toast--success`). Adding `background: transparent` to `#toast-demo` overrode the pill's background from `.toast--success`. Fix: keep the fixed overlay and the pill as separate elements.

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `toast__error-label`, `toast__error-message` | Variant name baked into element name | Element names describe structure, not variant — use `toast__badge`, `toast__message` |
| `--sucess` modifier typo | Missing second `s` | `--success` |
| `justify-content: center` on `.toast` | Confused main axis alignment for cross axis | `justify-content: flex-start` (or omit — it's default) |
| `align-items: flex-start` | Right property, wrong value — pins to top not centre | `align-items: center` |
| Font styles scoped under `.toast--success .toast__badge` | Repeated styles would be needed for every variant | Typography goes on `.toast__badge` base; only `color` varies per variant |
| `rgb(0,0,0,0.10)` instead of `rgba` | Recurring — opacity requires `rgba` | Always `rgba` for any colour with opacity |
| `'transitioned'` event name | Typo — no such event | `'transitionend'` |
| `background: transparent` on `#toast-demo` killed pill colour | ID specificity beat `.toast--success` class | Separate overlay (`#toast-demo`) from pill (`.toast.toast--success`) — two elements |
| ARIA on all 4 static toasts | Good intent, wrong application — screen reader announces all on load | `role="alert"` only on the live toast wrapper |

---

## Patterns to Reuse

**Viewport vertical centering:**
```css
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Fixed toast overlay + slide animation:**
```css
#toast {
  position: fixed;
  top: -100px;
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: top 0.5s ease, opacity 0.5s ease;
}
#toast.show { top: 20px; opacity: 1; }
#toast.hide { top: -100px; opacity: 0; }
```

**JS show/hide with cleanup:**
```js
function showToast(duration = 7500) {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, duration);
  toast.addEventListener('transitionend', () => {
    if (toast.classList.contains('hide')) toast.classList.remove('hide');
  });
}
```

---

## What You Did Well

1. **JS function nearly perfect on first try** — only a single `'transitioned'` typo. The structure (querySelector, classList, setTimeout, transitionend guard) was all correct without prompting.
2. **Checked the reference before implementing animation** — asked to read the reference solution before writing the JS. Evidence-based development instinct.
3. **Error variant colours applied correctly** — remembered that badge and message use *different* colours on error (`#991b1b` vs `#dc2626`) without being reminded.
4. **Recognised `justify-content` was wrong when questioned** — didn't dig in defensively, quickly understood why `flex-start` was correct.

---

## What to Improve

- **`rgba` over `rgb`** — every project. If there's opacity, it's `rgba`. Make this automatic.
- **Read BEM names aloud before committing** — "toast underscore underscore error dash label" sounds wrong. Element names describe the element's role, never the variant.
- **Understand `justify-content` vs `align-items` before writing** — `justify-content` = main axis (horizontal in a row), `align-items` = cross axis (vertical in a row). Know this without needing to be corrected.
- **CSS specificity awareness** — before adding `background: transparent` to an ID, ask: what else on this element has a background that this might override?

---

## Interview Connections

- **CSS `transition`** — extremely common interview question: "How would you animate this without JavaScript?" The answer is almost always transitions + class toggling.
- **Fixed overlay pattern** — toasts, modals, drawers all use this. Understanding `position: fixed; width: 100%` as a viewport overlay is a fundamental pattern.
- **`aria-live` regions** — accessibility interviews increasingly ask about dynamic content announcements. `role="alert"` is the specific answer for notifications.
- **Viewport centering** — "how do you centre something vertically on the page?" is one of the most asked CSS interview questions. `min-height: 100vh + flex + align-items: center` is the clean answer.
- **CSS specificity** — ID vs class specificity conflicts come up in debugging questions. "Why isn't my style applying?" is often a specificity issue.

---

## How You Thought

- **Started with variant names in element names** — assumed `toast__error-label` was correct because the element "belonged to" the error variant. Shifted after understanding that BEM elements describe structure, and the variant modifier belongs on the block.
- **Thought `justify-content: center` would vertically centre** — assumed "center" always means both axes. Needed to connect `justify-content` = main axis and `align-items` = cross axis before this clicked.
- **Assumed `background: transparent` was a safe override** — didn't realise ID specificity would silently kill the variant background. The fix (separating overlay from pill) was the right structural lesson.
- **Good instinct: asked to see the reference before implementing animation** — rather than guessing, chose to look at a working example first. This is how experienced developers actually work.
- **Good instinct: asked "is this in the brief?"** — questioned whether multi-variant JS was required before building it. Scope awareness is a real interview and job skill.
- **ARIA placement was right instinct, wrong target** — wanted all toasts to be accessible, which is correct thinking. The gap was understanding that static comparison elements don't need live region roles.

---

## Carry-forward Questions

- What's the difference between `aria-live="assertive"` and `aria-live="polite"`? When would you use `polite` instead?
- How would you queue multiple toasts? The current implementation only shows one at a time.
- `transitionend` fires once per transitioned property — so `top` and `opacity` both fire it. Does the guard (`contains('hide')`) prevent the double-fire correctly, or could there be a race condition?
- How would you trigger different variants via JS, not just success? Would you pass `variant` and `message` as arguments to `showToast()`?

---

## What to Practice More

- **`justify-content` vs `align-items`** — write a few flex layouts from scratch and name the axis before adding each property
- **CSS specificity** — ID vs class vs element ordering — be able to predict which rule wins before testing in the browser
- **`rgba` as default** — stop writing `rgb` for coloured shadows and overlays
