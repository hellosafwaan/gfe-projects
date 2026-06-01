# Tab Menu Component

**Tab Menu Component with BEM, ARIA tablist, and event delegation**

---

## Summary

Tab switching with event delegation, transparent border trick, hidden attribute toggle, and full ARIA tablist semantics.

---

## Implementation Details

### Tech stack and approach

Vanilla HTML, CSS, and JavaScript. BEM class naming throughout (`tabs`, `tabs__list`, `tabs__trigger`, `tabs__panel`). Tab switching uses event delegation on the list container — one listener handles all tabs via `event.target.closest()`. Show/hide is driven by a CSS class pair (`tabs__panel` / `tabs__panel--active`) plus the HTML `hidden` attribute for screen reader support. Full ARIA tablist pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, and `aria-controls` — all kept in sync by JavaScript on every tab switch.

### Useful resources and lessons learnt

- **Invisible border trick** — giving all buttons `border: 1px solid transparent` by default prevents layout shift when the active state adds a visible border; no need for `box-shadow: inset`
- **Specificity trap** — a 2-class hide selector (`.parent > .child`) overrides a 1-class show selector (`.child--active`); always use equal-specificity pairs for show/hide
- **`font-family: inherit` on buttons** — browsers don't automatically inherit `font-family` from `body` on `<button>` elements; always declare it explicitly
- **`hidden` attribute vs CSS-only** — `hidden` hides from the accessibility tree, not just visually; but if used in HTML, JS must also toggle it alongside any CSS class
- **ARIA tablist sync** — `aria-selected` must be updated in JS on every tab click, not just set once in HTML

### Notes/questions for community

- Is there a standard way to handle keyboard navigation in tab menus? (Arrow keys between tabs, Tab to move into the panel)
- Should a `disabled` tab be excluded from the tab order entirely with `tabindex="-1"`, or left in for discoverability?
- Does CSS `display: block` reliably override the `hidden` attribute across all browsers, or is the `removeAttribute('hidden')` approach safer?
