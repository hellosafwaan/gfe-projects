# Tabs Component — Learnings

## Concepts Learned

### `margin-bottom: -1px` — tab indicator overlap trick
The active tab's bottom border needs to visually sit on top of the tab list's bottom border. Since both are at different vertical positions (button border is inside the container, list border is outside), a `-1px` bottom margin pulls the button down 1px so its border aligns with the list border.

```css
.tabs__trigger {
  border-bottom: 1px solid transparent;
  margin-bottom: -1px; /* pulls button down into the list's border zone */
}
.tabs__trigger--active {
  border-bottom: 2px solid #4f46e5; /* covers the gray list border */
}
```

### `overflow-x: auto` implicitly sets `overflow-y`
CSS doesn't allow one axis to be `visible` while the other is non-visible. Setting `overflow-x: auto` automatically changes `overflow-y` from `visible` to `auto` as well. This creates a scroll container that clips child overflow — including the `-1px` margin extension on tab buttons.

Fix: remove `overflow-x: auto` when not needed, or use the `::after` pseudo-element approach for scrollable tabs (no margin extension required).

### `border-bottom: 2px` vs `::after` for the indicator
Two valid approaches:

**Direct border-bottom (simpler):**
```css
.tabs__trigger--active {
  border-bottom: 2px solid #4f46e5;
}
```
Works cleanly when no overflow clipping is in play. Fewer lines, no positioning.

**`::after` pseudo-element (for scrollable tabs):**
```css
.tabs__list { position: relative; }
.tabs__list::after {
  content: ''; position: absolute;
  bottom: 0; left: 0; right: 0; height: 1px;
  background-color: #d4d4d4;
}
.tabs__trigger { position: relative; z-index: 1; }
.tabs__trigger--active { border-bottom: 2px solid #4f46e5; }
```
Required when `overflow-x: auto` is on the tab container — no negative margin needed, no clipping issue.

### `hidden` attribute in HTML as initial state
Inactive panels start with `hidden` in HTML. JS adds `hidden` when deactivating a panel and removes it when activating one. This is consistent — both the initial state and the JS-driven state use the same mechanism.

```html
<div id="security-panel" role="tabpanel" hidden>...</div>
```
```js
currentPanel.setAttribute('hidden', '');
nextPanel.removeAttribute('hidden');
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| Incomplete Security button | Moved on before adding `role`, `aria-selected`, `aria-controls`, `data-tab` | Complete every attribute on an element before moving to the next |
| Wrong `data-tab` on Plan button | `data-tab="security"` instead of `data-tab="plan"` | Match `data-tab` to the tab name |
| Two tabs with `aria-selected="true"` | Both Account and Plan had `true` | Only the default active tab is `true`; all others must be `false` |
| BEM typo `tabs_panel` | Single underscore — silently broke CSS selector | `tabs__panel` (double underscore) |
| Active tab text wrong color | Used `#4f46e5` (the border color) instead of `#4338ca` (the text color) | Border and text use different indigo shades — check design notes |
| `overflow-x: auto` clipping indicator | `overflow-x: auto` implicitly sets `overflow-y: auto`, clipping the `-1px` button extension | Remove `overflow-x: auto` when not needed |
| `outline: none` on `:focus-visible` | Removed the browser focus ring for keyboard users — defeats the purpose of `:focus-visible` | Either omit `outline: none`, or replace with a styled custom ring |

---

## Patterns to Reuse

**Tab indicator overlap (no overflow involved):**
```css
.tabs__list { border-bottom: 1px solid #d4d4d4; }
.tabs__trigger { border-bottom: 1px solid transparent; margin-bottom: -1px; }
.tabs__trigger--active { border-bottom: 2px solid #4f46e5; }
```

**Tab indicator for scrollable containers (`::after` approach):**
```css
.tabs__list { overflow-x: auto; position: relative; }
.tabs__list::after {
  content: ''; position: absolute;
  bottom: 0; left: 0; right: 0; height: 1px;
  background: #d4d4d4;
}
.tabs__trigger { position: relative; z-index: 1; }
.tabs__trigger--active { border-bottom: 2px solid #4f46e5; }
```

**Tab switch in JS (event delegation + data-attribute routing):**
```js
tabsList.addEventListener('click', (event) => {
  const item = event.target.closest('.tabs__trigger');
  if (!item || item === activeTab) return;
  activeTab.classList.remove('tabs__trigger--active');
  activeTab.setAttribute('aria-selected', 'false');
  activeTab.setAttribute('hidden', ''); // if using hidden
  item.classList.add('tabs__trigger--active');
  item.setAttribute('aria-selected', 'true');
  document.getElementById(`${item.dataset.tab}-panel`).removeAttribute('hidden');
});
```

---

## What You Did Well

1. **Pushed back on `hidden` being redundant** — didn't accept the coaching note without checking; looked at the HTML, confirmed inactive panels had `hidden`, and correctly identified the JS behavior as intentional. Excellent habit.
2. **"Can we achieve it without positioning?"** — great question showing you want to understand the space of solutions before committing, not just follow the first suggestion.
3. **JS applied from tab-menu without prompting** — event delegation, guard clause, `dataset.tab` routing all clean on the first attempt.
4. **Questioned the `border: 1px solid transparent` approach** — recognised that a 4-sided transparent border wasn't quite right for a bottom-indicator pattern.

---

## What to Improve

- **Complete every attribute before moving on** — the incomplete Security button has happened before. Write the full element before starting the next one.
- **Check both color values from design notes** — active tab border and active tab text are different indigo shades. Always verify each value independently.
- **Don't add `outline: none` to `:focus-visible`** — removing the outline defeats the reason you used `:focus-visible` in the first place. If the design doesn't show a ring, leave the default visible and let `:focus-visible` do its job.

---

## Interview Connections

- **`overflow-x: auto` implicit behavior** — knowing that setting one overflow axis removes visibility on the other shows deep CSS understanding. This comes up in real debugging.
- **Tab indicator overlap trick** — a clean, well-reasoned solution to a real CSS layout constraint. Shows you understand `margin-bottom` and border interaction.
- **ARIA tablist pattern** — `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` — this full pattern is increasingly asked about in frontend interviews, especially for accessible UI work.
- **`border-bottom` vs `::after` trade-off** — being able to explain when each applies (with/without overflow) is the kind of nuanced answer that stands out.

---

## How You Thought

- **Started with a 4-sided transparent border** (`border: 1px solid transparent`) — valid as a reset, but not ideal when only the bottom matters. You questioned it when asked, which shows the instinct to challenge your own assumptions.
- **Incorrectly accepted that `hidden` was redundant** — didn't check the HTML before agreeing. But then pushed back and verified it was correct. The correction came from you, not from being told again.
- **Asked "Can we achieve it without positioning?"** — shows you wanted to understand the full solution space. Good engineering instinct: prefer simpler approaches when they exist.
- **Spotted the double-line issue in the screenshot before being told** — looked at the visual output and identified it wasn't right. That's the right debugging reflex.

---

## Carry-forward Questions

| Question | Topic |
|---|---|
| Is a color-only focus change (no outline) WCAG compliant? What's the minimum contrast required? | Accessibility |
| `overflow-x: auto` implicitly sets `overflow-y` — are there other CSS property combinations with hidden implicit side effects? | CSS properties |
| When is `border-bottom` + `margin-bottom: -1px` better than `::after` positioning for a tab indicator? | CSS patterns |

---

## Unlearned Gaps

None — all techniques in this project were implemented hands-on by the user.

---

## What to Practice More

- **Complete every HTML attribute before moving on** — third project in a row where an element was left half-written. Slow down and finish each element fully.
- **Two colors from design notes for the same state** — active tab has a border color AND a text color that are different. Build the habit of checking all color values for a given state, not just the one you're currently styling.
