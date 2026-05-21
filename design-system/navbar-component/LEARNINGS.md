# Navbar Component — Learnings

## Concepts Learned

### Media queries — mobile-first
Media queries apply CSS conditionally based on screen width. Mobile-first means writing default styles for mobile and overriding at larger breakpoints with `min-width`.

```css
/* Mobile default */
.navbar__content { display: none; }

/* Desktop override */
@media (min-width: 1024px) {
  .navbar__content { display: flex; }
}
```

Always prefer `min-width` over `max-width` — it's mobile-first and progressively enhances upward.

### position: fixed for overlays
`position: fixed` removes an element from document flow and pins it to the viewport. Setting all four sides to `0` makes it cover the full screen.

```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

Use this for modals, overlays, and mobile menus that need to appear above page content.

### display: none / display: flex toggle
The cleanest way to show/hide an element without animation. Default to `display: none`, then override to `display: flex` with a class toggled by JavaScript.

```css
.mobile-menu { display: none; }
.mobile-menu.open { display: flex; }
```

### JavaScript DOM manipulation
Three methods used in this project:
- `document.querySelector('.class')` — selects a single element
- `element.addEventListener('click', callback)` — listens for events
- `element.classList.add('open')` / `.classList.remove('open')` — toggles classes

```javascript
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});
```

**Key gotcha:** `addEventListener` uses `'click'`, NOT `'onclick'`. The `on` prefix is for HTML attributes only.

### display: block on <a> for full width
`<a>` is inline by default — it only takes up as much width as its text. `display: block` makes it stretch to fill the parent's full width. Used for mobile menu links.

```css
.mobile-menu__link {
  display: block; /* takes full width of parent */
}
```

### Grouping pseudo-class selectors
When two elements share the same interaction states, group them rather than duplicating:

```css
.navbar__link:hover,
.mobile-menu__link:hover {
  color: #171717;
}
```

### flex: 1 to fill remaining space
On a flex child, `flex: 1` makes it grow to fill all available space. Used on `.navbar__content` and `.navbar__links` to push buttons to the right edge.

---

## Mistakes Made

| Mistake | Fix |
|---|---|
| `navbar__link` class on `<li>` instead of `<a>` — done twice (desktop AND mobile) | Always put the class on the `<a>`, never the `<li>`. Browser default link styles override inherited values from `<li>`. |
| `hidden` HTML attribute on hamburger — reminded 5+ times | `hidden` permanently hides the element. Use CSS `display: none` controlled by media queries instead. |
| `onclick` / `onlick` typo in addEventListener | `addEventListener` takes `'click'` not `'onclick'`. The `on` prefix is for HTML event attributes only. |
| `margin` instead of `padding` on `.navbar` | `margin` moves the element inward — the white background wouldn't span full width. `padding` keeps the element full width and pushes content inward. |
| `gap` on `.navbar` (not a flex container) | `gap` only works on flex/grid containers. It belongs on `.navbar__inner`. |
| Tried to nest `<button>` inside `<a>` | Invalid HTML — interactive elements cannot contain other interactive elements. Style the `<a>` directly. |
| `cta-container` — not BEM | Renamed to `navbar__actions` — element of the navbar block. |
| Forgot `display: flex` on `.navbar__logo` | `<a>` is inline — creates phantom baseline gap below images. Always add `display: flex` to `<a>` tags wrapping only images or SVGs. This was missed a second time after learning it in the badge project. |
| Forgot `outline: none` on focus states | Any custom focus style must include `outline: none` to remove the browser default blue ring. |
| Duplicate `.navbar__content` rule blocks | Merged into one block. Having two separate blocks for the same selector is confusing and error-prone. |
| `<buttonbtn>` typo in HTML | Typo — `<button>` not `<buttonbtn>`. |

---

## Patterns to Reuse

**Mobile-first responsive toggle:**
```css
.element { display: none; }

@media (min-width: 1024px) {
  .element { display: flex; }
}
```

**Full-screen fixed overlay:**
```css
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #ffffff;
  display: none;
  flex-direction: column;
}
.overlay.open { display: flex; }
```

**JavaScript menu toggle:**
```javascript
const menu = document.querySelector('.mobile-menu');
const openBtn = document.querySelector('.navbar__hamburger');
const closeBtn = document.querySelector('.mobile-menu__close');

openBtn.addEventListener('click', () => menu.classList.add('open'));
closeBtn.addEventListener('click', () => menu.classList.remove('open'));
```

**Full-width link in a list:**
```css
.mobile-menu__link {
  display: block;
  text-decoration: none;
  color: #171717;
}
```

**Buttons pinned to bottom of flex column:**
```css
.mobile-menu__links { flex: 1; } /* pushes actions down */
.mobile-menu__actions { margin-top: auto; }
```

---

## What You Did Well

- **BEM instinct is developing** — you caught `cta-container` yourself and asked about the right name. That's the right habit.
- **Semantic HTML** — used `<nav>`, `<ul>/<li>/<a>` for links, `<button>` for actions, `aria-label` on icon buttons. All correct.
- **Reused existing work** — pulled button component styles directly instead of rewriting them. Smart.
- **Mobile-first choice** — chose `min-width` over `max-width` without being pushed. Shows understanding.
- **Grouped selectors** — combined `.navbar__link:hover, .mobile-menu__link:hover` on your own. Clean instinct.
- **Asked the right questions** — challenged the `gap` placement, questioned the `<button>` nesting before implementing, verified BEM names. These are senior-level habits.

---

## What to Improve

- **Class always goes on `<a>`, never `<li>`** — this happened twice. Before styling any link, ask: is the class on the element that gets the styles, or its parent?
- **`outline: none` with every custom focus style** — make it a reflex. Custom focus style = always add `outline: none`.
- **`display: flex` on `<a>` wrapping images** — missed this twice now. Any `<a>` containing only an image or SVG needs `display: flex` to kill the baseline gap.
- **`addEventListener` uses `'click'` not `'onclick'`** — practice this. The `on` prefix is HTML-only.
- **Clean up dead code** — commented-out properties stayed in the CSS for too long. Delete, don't comment out.

---

## Interview Connections

- **`position: fixed`** — "how would you build a modal overlay?" This is the answer.
- **Media queries** — "explain mobile-first design" — `min-width` approach shows you understand progressive enhancement.
- **`classList.add/remove/toggle`** — the standard DOM API for state-driven UI. Appears in nearly every JS interview question involving UI interaction.
- **`display: block` on inline elements** — "why isn't my link taking full width?" Common question.
- **`flex: 1`** — "how do you push an element to the end of a flex row?" — either `margin-left: auto` or `flex: 1` on the preceding element.

---

## Carry-forward Questions

- When should you use `classList.toggle('open')` vs separate `.add` and `.remove` calls?
- How do you close the mobile menu when the user clicks outside of it?

---

## Unlearned Gap — Accessibility

The following accessibility features were added to the navbar **by the coach, not by you**. You did not implement or learn them during this project. They are documented in `notes/accessibility.md` for when you're ready to learn them properly.

**What was added:**
- `aria-expanded` on the hamburger — announces open/closed state to screen readers
- `aria-controls` — links the button to the element it controls
- `role="dialog"` + `aria-modal="true"` on the mobile menu
- Focus management — focus moves into the menu on open, returns to hamburger on close
- Escape key closes the menu
- Focus trap — Tab cycles only within the open menu, not to the page behind

**Where to learn it:** `notes/accessibility.md`

---

## What to Practice More

- **Class placement on `<a>` vs `<li>`** — do two more projects and consciously check this each time
- **`addEventListener` event names** — `'click'`, `'input'`, `'submit'`, `'keydown'` — no `on` prefix
- **`outline: none` reflex** — add it immediately whenever you write a `:focus` rule
- **JavaScript DOM manipulation** — this was your first real JS interaction; do one more project with JS to solidify `querySelector`, `addEventListener`, `classList`
