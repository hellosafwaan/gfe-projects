# Badge Component — Learnings

## Concepts Learned

### inline-flex vs flex — NEEDS MORE PRACTICE
Marked for revisit. The short version: `display: flex` makes the element block-level (full width), `display: inline-flex` keeps it content-sized and inline. For components like badges that sit inside text or beside other content, `inline-flex` is always correct. Practice this until it's instinctive.

### align-items: stretch — the hidden default
When a flex container has `align-items: stretch` (the default), all children stretch to the height of the tallest sibling. This caused badges to grow 8px taller than expected when `display: flex` was added to the row. Fix: `align-items: center` on the row lets each badge sit at its natural height.

### border shorthand + border-color in variant
Splitting border across base and variant classes is a clean pattern:
```css
.badge { border: 1px solid; }           /* structure in base */
.badge--error { border-color: #fecaca; } /* color in variant */
```
This avoids repeating `1px solid` in every variant.

### border-radius: 9999px for pill shape
Any value larger than half the element's height produces a full pill. `9999px` is the convention — it works for any size without needing to know the exact height.

### Semantic element choice — span for badges
`<span>` is correct for badges because they're inline labels. `<div>` is block-level and would break onto its own line by default. `<span>` flows naturally inline with surrounding content.

### Color contrast — WCAG AA
- Normal text (< 18px): minimum 4.5:1 contrast ratio
- Large text (18px+ or 14px bold): minimum 3:1
- Tool: WebAIM Contrast Checker — plug in foreground and background hex
- The error variant (#dc2626 on #fef2f2) failed at 4.38:1 — a design issue, not a code issue. Flag to designer, don't change unilaterally.

### BEM — no chaining elements
`badge__container__row` is wrong. BEM doesn't chain nested elements. Flatten it:
```
badges          ← block
badges__row     ← element of badges block
```
Never: `badges__container__row`

---

## Mistakes Made

| Mistake | Fix |
|---|---|
| `badge__container__row` — chained BEM | Flatten to `badges__row` |
| `display: flex` on `.badge` | `display: inline-flex` — badge is an inline component |
| `width: 240px` magic number on `.badges` | Remove it — let content determine width |
| `gap: 100px` guess on row | Always check Figma — don't guess spacing values |
| Missing semicolon on `gap: 24px` | Standard typo — use a formatter |
| Commented out `display: flex` instead of fixing | Identify the actual problem (align-items: stretch), don't disable the fix |

---

## Patterns to Reuse

**Base badge reset:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  font-weight: 400;
  border-radius: 9999px;
  border: 1px solid;
}
```

**Color variant pattern:**
```css
.badge--error {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}
```

**Preventing stretch on flex rows:**
```css
.badges__row {
  display: flex;
  align-items: center;
  gap: 24px;
}
```

---

## Interview Connections

- **`align-items: stretch`** — very commonly asked: "why is my flex child taller than expected?" This is usually the answer
- **Contrast ratios** — accessibility questions are increasingly common; knowing 4.5:1 for normal text shows you care about a11y
- **`inline-flex` vs `flex`** — classic interview question about display values and when to use each
- **BEM** — flat element naming, no chaining, is the correct answer to "how do you scale CSS?"

---

## Carry-forward Questions

- When exactly does `inline-flex` vs `flex` matter in real component usage?
- How do you handle color-only differentiation (error/warning/success) for colorblind users?

---

## What to Practice More

- **`flex` vs `inline-flex`** — this is marked for dedicated practice; keep revisiting until instinctive
- **`justify-content` vs `align-items`** — still takes conscious thought; needs more reps
- **Checking Figma for values** — don't guess gap, padding, or font values; always verify
