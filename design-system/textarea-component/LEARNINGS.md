# Textarea Component — Learnings

## Concepts Learned

### `input` event for real-time updates
Fires on every value change — typing, pasting, deleting. More reliable than `keydown` for tracking value length.
```js
textarea.addEventListener('input', (event) => {
  const count = event.target.value.length;
});
```

### `event.target.value.length` for character count
`event.target` is the element that triggered the event. `.value` is the current text. `.length` is the character count.

### `closest()` for DOM traversal
Walks up the DOM tree from an element and returns the nearest ancestor matching a selector. Essential for event-driven class toggling.
```js
const group = event.target.closest('.textarea-group');
group.classList.add('textarea-group--exceeded');
```

### BEM modifier classes for state management
One modifier class on the parent wrapper controls all child styles — border, counter color, error message visibility.
```css
.textarea-group--error .textarea-group__input { border-color: #fca5a5; }
.textarea-group--error .textarea-group__character-count { display: none; }
.textarea-group--error .textarea-group__error-message { display: block; }
```

### Counter/error message swap pattern
Both elements live in the DOM, CSS hides the inactive one. Toggling a class on the wrapper swaps them.
```html
<span class="textarea-group__character-count">0/500</span>
<span class="textarea-group__error-message">This field is required</span>
```

### `::placeholder` pseudo-element
Styles the placeholder text separately from the actual input text.
```css
.textarea-group__input::placeholder { color: #737373; }
.textarea-group__input:disabled::placeholder { color: #a3a3a3; }
```

### `resize: none` on textarea
Prevents the user from dragging the textarea to a different size — required for design-system components.

### Focus ring via `box-shadow`
Two layered shadows create the inner border + outer glow. `outline: none` suppresses the browser default first.
```css
.textarea-group__input:focus {
  outline: none;
  box-shadow: 0 0 0 1px #444ce7, 0 0 0 4px rgba(68, 76, 231, 0.12);
}
```

### Two separate error focus rings
Normal error focused → indigo ring. Exceeded focused → red ring. Override the base `:focus` styles with a more specific selector.
```css
.textarea-group--exceeded .textarea-group__input:focus {
  box-shadow: 0 0 0 1px #d92d20, 0 0 0 4px rgba(217, 45, 32, 0.12);
}
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `maxlength` appeared not to work | Whitespace between `>` and `</textarea>` counted as content, eating into the limit | Close tag with no whitespace: `></textarea>` |
| `maxlength` hard refresh suggested | Wrongly assumed browser cache, missed the whitespace issue | Check textarea content before blaming the browser |
| `querySelector('#...')` returned null | Used `#` (id selector) for a class — should be `.` | `document.querySelector('.textarea-group__character-count')` |
| `textAreaDefault.textContent = ...` | Updated the textarea element instead of the counter span | `textareaCounter.textContent = ...` |
| `textAreaDefault.classList.add(...)` | Added class to the textarea instead of the wrapper group | `textAreaGroup.classList.add(...)` |
| `event.target.closet(...)` | Typo — `closet` instead of `closest` | `event.target.closest(...)` |
| `.texarea-group__label` in CSS and HTML | Missing `t` in `textarea` | `.textarea-group__label` |
| `.textarea-group-exceeded` | Missing double dash — BEM modifier uses `--` not `-` | `.textarea-group--exceeded` |
| `border` on `.textarea-group--error` | Applied border to wrapper div, not the input inside | `.textarea-group--error .textarea-group__input { border: ... }` |
| Error focused ring initially wrong | Stated indigo ring — Figma showed red `#d92d20` | Always verify in Figma before stating values |

---

## Patterns to Reuse

**State-driven class system (BEM modifier on wrapper)**
```html
<div class="textarea-group textarea-group--error">
```
```css
.textarea-group--error .textarea-group__input { /* border */ }
.textarea-group--error .textarea-group__error-message { display: block; }
```
One class on the parent controls everything inside it.

**DOM traversal to wrapper in an event handler**
```js
const group = event.target.closest('.textarea-group');
group.classList.add('textarea-group--exceeded');
```
Use `closest()` instead of selecting the wrapper separately by ID.

**Counter/error swap with CSS show/hide**
```css
.textarea-group__error-message { display: none; }
.textarea-group--error .textarea-group__character-count { display: none; }
.textarea-group--error .textarea-group__error-message { display: block; }
```

**Grouped selectors for shared styles**
```css
.textarea-group--error .textarea-group__input,
.textarea-group--exceeded .textarea-group__input {
  border: 1px solid #fca5a5;
}
```

---

## What You Did Well

1. **Immediately knew to use IDs for unique element selection** — `querySelector('#textarea-default')` was the right instinct without prompting.
2. **Questioned the char limit exceeded approach** — recognised that reusing `textarea-group--error` would break the counter display, and suggested a separate class before being told.
3. **Checked Figma directly** — opened Figma to verify the error focused ring color instead of accepting my initial (wrong) extraction.
4. **Consistent BEM naming** — maintained `__` for elements and `--` for modifiers throughout (once the typos were caught), which is real production convention.

---

## What to Improve

- **Read the exact error more carefully before guessing** — the `maxlength` issue was a whitespace-in-textarea content problem, not a browser cache issue. Check the simplest things first.
- **Verify selector type (`#` vs `.`) before running** — this came up twice. Make a habit: `#` = id, `.` = class. No exceptions.
- **Spell-check class names before saving** — `texarea`, `closet`, `textarea-group-exceeded` were all typos that caused bugs. Read class names character by character.
- **Don't assume design values from memory** — the error focused ring was wrong in my initial extraction. When in doubt, re-check Figma.

---

## Interview Connections

- **`input` event vs `change`** — `change` only fires on blur; `input` fires on every keystroke. Interviewers ask this when discussing real-time validation.
- **`closest()` for event delegation** — a core DOM API. Used in interview questions about handling events on dynamically generated lists.
- **CSS state management without JS** — using classes + descendant selectors to control UI state is a pattern interviewers look for. It separates concerns cleanly.
- **`aria-describedby`** — increasingly asked in accessibility rounds. Know: it goes on the input, the hint just needs an `id`.
- **`box-shadow` as a focus ring** — standard for design systems. Why not `border`? Border shifts layout. `box-shadow` doesn't.

---

## How You Thought

- **Started assuming `maxlength` was broken** — the real problem was whitespace content in the textarea. Another agent caught this. The fix was simple but the debugging instinct was to blame the wrong thing.
- **Confused `#` and `.` selectors** — selected `.textarea-group__counter` with `#`. Knew querySelector was right, didn't know the selector prefix rules yet. Good that you tried it first and debugged from the null result.
- **Good instinct on the counter/error swap question** — you asked "how do I know when to show the counter vs error message?" before being told. That's the right question to ask.
- **Good instinct on the exceeded class** — you proposed a separate `--exceeded` modifier instead of reusing `--error`. This showed you'd already understood that the states have different visual outputs (counter stays vs error message).
- **Confusion about `justify-content: flex-start`** — tried it thinking it would push content right; it pushed it left. This is the main axis confusion — cleared up by experimenting.
- **Initially unsure how to apply error state from HTML** — asked "how do I communicate this is an error?" The key shift: unlike `disabled`, error is not a native HTML attribute. You communicate it with a CSS class.

---

## Carry-forward Questions

- How would the character counter work if the limit was configurable per-instance (not hardcoded to 500)?
- How would you wire up JS to handle multiple textareas on the page without selecting them each by ID?
- How does `aria-live` work for announcing counter changes to screen readers?
- When should you use `aria-invalid="true"` on an error input vs just `aria-describedby`?

---

## Unlearned Gaps (if any)

- `aria-describedby` added by coach in final step — concept was in the notes already from text-input-component, but applying it to the textarea footer (where the pointed-to element changes between counter and error) wasn't worked through hands-on. See `notes/accessibility.md`.

---

## What to Practice More

- DOM traversal with `closest()` — use it in the next project without being reminded
- querySelector selector syntax (`#` vs `.`) — should be automatic by now
- Reading Figma effects panel for box-shadow values — did it this project but needed prompting
