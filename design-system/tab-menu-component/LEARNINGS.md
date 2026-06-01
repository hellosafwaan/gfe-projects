# Tab Menu Component — Learnings

## Concepts Learned

### Data Attributes
Custom attributes you define yourself — anything starting with `data-`. Stored on HTML elements, read in JS via `dataset`.

```html
<button data-tab="account">Account</button>
```
```js
button.dataset.tab  // → "account"
```

Use to connect interactive elements to their controlled targets without hardcoded IDs in JS.

---

### Invisible Border Trick — Layout-Shift-Free Active State
Give all buttons a transparent border so the border space is always allocated. Active state just changes the colour — no layout shift.

```css
.tabs__trigger {
  border: 1px solid transparent; /* always present, invisible */
  padding: 9px 15px;
}
.tabs__trigger--active {
  border-color: #e5e5e5; /* same space, now visible */
}
```

Alternative: `box-shadow: inset 0 0 0 0.5px #e5e5e5` — decorative, zero box-model impact.

---

### CSS Specificity and Show/Hide Pairs
When using class-based show/hide, the hiding rule and the showing rule must have equal specificity — or the more specific hiding rule wins silently.

```css
/* ❌ Bug — 2-class selector overrides 1-class selector */
.tabs__panels > .tabs__panel { display: none; }  /* 0,2,0 — WINS */
.tabs__panel--active { display: block; }          /* 0,1,0 — LOSES */

/* ✅ Equal specificity — document order wins */
.tabs__panel { display: none; }
.tabs__panel--active { display: block; }
```

---

### `hidden` Attribute for Accessible Panel Show/Hide
The HTML `hidden` attribute hides an element visually AND from the accessibility tree. Better than CSS-only `display: none` for screen reader support.

```html
<div class="tabs__panel" hidden>...</div>
```
```js
panel.removeAttribute('hidden');    // show
panel.setAttribute('hidden', '');   // hide
```

If using `hidden` in HTML, JS must also toggle it — not just the CSS class.

---

### ARIA Tablist Pattern
Full semantic pattern for accessible tab components:

```html
<div role="tablist" aria-label="Tabs">
  <button role="tab" aria-selected="true" aria-controls="account-panel">Account</button>
  <button role="tab" aria-selected="false" aria-controls="security-panel">Security</button>
</div>
<div id="account-panel" role="tabpanel">...</div>
```

JS must keep `aria-selected` in sync on every tab switch:
```js
activeTab.setAttribute('aria-selected', 'false');
item.setAttribute('aria-selected', 'true');
```

---

### `font-family: inherit` on Buttons
Browsers don't pass `font-family` from `body` to `<button>`. Without it, buttons use the browser default — not your design system font. Always add.

```css
.tabs__trigger {
  font-family: inherit;
}
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| Used `nav` for tab container | `nav` implies navigation to another page/section. Tabs swap content in-place. | Use `div` + `role="tablist"` |
| `border: 1px solid #e5e5e5` on active without matching default | Adding a border on click shifts the button size by 2px | Add `border: 1px solid transparent` to the default state |
| `background: #ffffff` on the default trigger | Active state colour was set as the default | Default → `background: transparent`; active → `background: #ffffff` |
| `pointer-events: none` + `cursor: not-allowed` together | They contradict — `pointer-events: none` means the cursor change never fires | Use one. `cursor: not-allowed` is enough; `<button disabled>` already blocks clicks natively |
| 2-class hide selector overriding 1-class show selector | `.tabs__panels > .tabs__panel` (specificity 0,2,0) beat `.tabs__panel--active` (0,1,0) | Equal specificity: `.tabs__panel { display: none }` + `.tabs__panel--active { display: block }` |
| `aria-selected="true"` on Security (non-active tab) | Only the active tab gets `"true"` — all others are `"false"` | Non-active tabs get `aria-selected="false"` by default |
| `aria-controls="account"` not matching panel ID | Panel ID was `account-panel`, not `account` | `aria-controls` value must exactly match the target element's `id` |
| Added `hidden` to HTML without updating JS | JS only toggled the CSS class — `hidden` attribute persisted, panels stayed hidden | JS must also call `removeAttribute('hidden')` / `setAttribute('hidden', '')` |

---

## Patterns to Reuse

**Tab switching with event delegation + ARIA sync:**
```js
tabsList.addEventListener('click', (event) => {
  const activeTab = document.querySelector('.tabs__trigger--active');
  const item = event.target.closest('.tabs__trigger');
  if (!item || item === activeTab) return;

  activeTab?.classList.remove('tabs__trigger--active');
  activeTab?.setAttribute('aria-selected', 'false');
  item.classList.add('tabs__trigger--active');
  item.setAttribute('aria-selected', 'true');

  const currentPanel = document.querySelector('.tabs__panel--active');
  currentPanel?.classList.remove('tabs__panel--active');
  currentPanel?.setAttribute('hidden', '');

  const nextPanel = document.getElementById(`${item.dataset.tab}-panel`);
  nextPanel.classList.add('tabs__panel--active');
  nextPanel.removeAttribute('hidden');
});
```

**Invisible border trick:**
```css
.tabs__trigger { border: 1px solid transparent; }
.tabs__trigger--active { border-color: #e5e5e5; }
```

**Specificity-safe show/hide:**
```css
.tabs__panel { display: none; }
.tabs__panel--active { display: block; }
```

---

## What You Did Well

1. **Event delegation on first attempt** — listened on the container, used `closest()`, added the early-return guard. Almost no iteration needed.
2. **Optional chaining on nullable references** — used `currentPanelElement?.classList.remove()` and `?.setAttribute()` consistently and correctly.
3. **Chose `:disabled` pseudo-class over a modifier class** — recognised the semantic pseudo-class was better than a custom `--disabled` modifier. Good instinct.
4. **Proactively added ARIA roles** — added `role="tab"` and `role="tabpanel"` before being asked, showing growing ARIA awareness.

---

## What to Improve

- **Check for layout shift when toggling borders** — if a border or padding appears/disappears on interaction, add a transparent placeholder by default.
- **Map `aria-controls` to actual element IDs** — write the attribute after the target element exists, not from memory. Verify the match.
- **HTML + JS in sync** — when adding `hidden` to HTML, immediately think: "where in JS do I remove this?"
- **Specificity before writing show/hide pairs** — count classes. The show rule needs ≥ specificity as the hide rule.

---

## Interview Connections

- **Event delegation** — "How would you handle clicks on dynamically generated list items?" One listener on the parent + `closest()`.
- **CSS specificity** — "Why isn't my class applying?" is a real debugging task. Counting 0,X,0 specificity is expected.
- **ARIA tablist pattern** — increasingly asked at accessibility-conscious companies.
- **`font-family: inherit` on buttons** — a classic "why does my button font look different?" gotcha.
- **`data-*` attributes** — appear in virtually every DOM manipulation interview question.

---

## How You Thought

- **Started with `nav` for the tab container** — good instinct toward semantics, but the distinction between navigating (changing location) vs swapping content in-place wasn't yet clear. Corrected quickly.
- **"Is `data-tab` something internal to HTML?"** — genuine gap in mental model for custom attributes. Good question. Applied correctly immediately after explanation.
- **"I know BEM, I'm struggling to name it"** — BEM mechanics understood, but vocabulary for naming new component parts is still building. Normal — naming is genuinely hard.
- **Chose `:disabled` pseudo-class unprompted** — showed semantic thinking, not just "I'll add a class."
- **Didn't catch `pointer-events: none` + `cursor` conflict** — they look like they'd both apply but fight each other. Subtle.
- **Added `aria-selected` to HTML but missed the JS update** — ARIA HTML is getting more natural; the habit of tracing HTML attributes to their JS sync point isn't fully automatic yet.

---

## Carry-Forward Questions

- What's the correct keyboard navigation pattern for tabs? (Arrow keys to move between tabs, Tab to enter the panel)
- Should `disabled` tabs be in the tab order at all, or excluded with `tabindex="-1"`?
- When using the `hidden` attribute, does CSS `display: block` reliably override it across all browsers?

---

## What to Practice More

- **CSS specificity counting** — before writing a show/hide pair, count the selectors.
- **ARIA HTML-to-JS sync** — when adding an ARIA attribute to HTML, immediately trace where JS must update it.
- **BEM naming for new components** — spend 30 seconds mapping all parts before writing any CSS.
