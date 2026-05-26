# Tooltip Component — Learnings

## Concepts Learned

### Rotated square arrow technique
A 12×12px square rotated 45°, half-tucked under the tooltip content box edge, creates a triangle-shaped caret. No extra HTML — just a `::after` pseudo-element.

```css
.tooltip__content::after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background: #0a0a0a;
  border-radius: 1px;
  position: absolute;
  transform: rotate(45deg);
  bottom: -4px; /* half the height, tucked outside the bottom edge */
  left: 12px;
}
```

### `::after` / `::before` pseudo-elements
Two rules are always required — no exceptions:
1. `content: ""` — without this, the element doesn't exist at all
2. `display: block` — default is `inline`, which ignores `width` and `height`

### transform order matters
Transforms apply right-to-left. `translateX(-50%) rotate(45deg)` translates in the original axis direction, then rotates. `rotate(45deg) translateX(-50%)` rotates first, so the translation axis has also rotated — the element moves diagonally.

```css
/* Correct — translate in the original axis direction */
transform: translateX(-50%) rotate(45deg);

/* Wrong — translates diagonally after rotating */
transform: rotate(45deg) translateX(-50%);
```

### CSS-only hover pattern
The tooltip must be a descendant of the trigger for the `:hover` combinator to reach it. The space combinator (` `) selects any descendant.

```css
.tooltip { display: none; }
.tooltip-trigger:hover .tooltip { display: inline-flex; }
```

Read: "When `.tooltip-trigger` is hovered, show any `.tooltip` inside it."

### CSS cascade conflict: overriding inherited positioning
When a base rule sets `bottom: 100%`, all variants inherit it — including `right`, `left`, and `bottom` variants that need a completely different axis. Override explicitly:

```css
.tooltip--right {
  bottom: auto;       /* cancel the base bottom: 100% */
  margin-bottom: 0;   /* cancel the base margin-bottom */
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}
```

### Arrow hide-by-default pattern
Instead of adding a class to hide the arrow on one variant, flip the logic: hide by default, show only for named variants.

```css
/* Hide for all */
.tooltip--none .tooltip__content::after { display: none; }

/* Show for all others */
.tooltip--top-start .tooltip__content::after,
.tooltip--top-center .tooltip__content::after,
/* ... */ {
  display: block;
}
```

### `white-space: nowrap`
Prevents tooltip text from wrapping to a new line. Without it, the tooltip width collapses to its container width and text breaks mid-sentence.

```css
.tooltip__content {
  white-space: nowrap;
}
```

### `bottom: 100%` and `top: 100%`
```css
bottom: 100%; /* position top edge exactly at parent's top edge — places element above */
top: 100%;    /* position top edge at parent's bottom edge — places element below */
```

---

## Mistakes Made

| Mistake | What Went Wrong | Fix |
|---|---|---|
| `content: ""` missing | `::after` element never rendered — completely invisible | Always start `::after` with `content: ""` as the first property |
| Wrong selector target | Wrote `.tooltip--top-start::after` — targeting the tooltip wrapper, not the content inside it | Correct: `.tooltip--top-start .tooltip__content::after` — the arrow is inside `__content` |
| `position: relative` on wrong element | Put it on `.tooltip` — arrow then positioned relative to tooltip, not content box | Move `position: relative` to `.tooltip__content` where the arrow actually lives |
| `transform` order reversed | `rotate(45deg) translateX(-50%)` moved arrow diagonally | `translateX(-50%) rotate(45deg)` — translate first, then rotate |
| Base CSS cascade leak | `.tooltip { bottom: 100%; }` leaked into right/left/bottom variants | Override with `bottom: auto; margin-bottom: 0;` in affected variants |
| BEM double-dash typo | `tooltip-left` instead of `tooltip--left` — class never matched | Slow down on modifier names: always `block--modifier` |
| Arrow hide logic backwards | Set `display: none` on `::after` base but forgot `display: block` on variants — all arrows disappeared | Flip the default: hide on `--none` only, show explicitly on all others |
| Missing `tooltip-trigger` class | Wrapper divs had no class — `:hover` selector never fired | Every trigger wrapper needs `.tooltip-trigger` |
| Arrow negative offset | Wrote `right: 4px` (inside the box) instead of `right: -4px` (outside) | Arrow offset must be negative to peek outside the content box edge |

---

## Patterns to Reuse

**CSS-only hover tooltip**
```css
.tooltip { display: none; position: absolute; }
.tooltip-trigger { position: relative; }
.tooltip-trigger:hover .tooltip { display: inline-flex; }
```
Needs: trigger wrapper + tooltip as descendant of that wrapper.

**Rotated square caret (pointing down)**
```css
.tooltip__content::after {
  content: "";
  display: block;
  width: 12px; height: 12px;
  background: currentColor;
  border-radius: 1px;
  position: absolute;
  bottom: -4px;
  transform: rotate(45deg);
}
```
Adjust `bottom`/`top`/`left`/`right` for other directions. Keep `rotate(45deg)` for all directions.

**Vertical centering for side tooltips**
```css
.tooltip--right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}
```

**Always-visible tooltip for screenshots**
```css
.tooltip--static { display: inline-flex; }
```

---

## What You Did Well

1. **Identified `::after` as the right tool unprompted** — when asked how to make a triangle shape without extra HTML, you immediately landed on pseudo-elements. Good instinct.
2. **Preferred CSS-only hover** over a JS implementation — cleaner, no event listeners needed for a simple tooltip.
3. **Recognized grouped selectors for shared rules** — grouped all `top-start`, `top-center`, `top-end` under one declaration block rather than repeating `bottom: 100%` three times.
4. **Caught your own positioning confusion** — "I was saying it the other way around. top → pushes the element to the bottom." Self-correction without being told.

---

## What to Improve

- **Slow down on selector chains.** Three mistakes in a row involved the wrong selector target (`.tooltip::after` vs `.tooltip__content::after`, `tooltip-left` vs `tooltip--left`). Take 5 seconds to read the selector aloud before writing it.
- **Check cascade conflicts before assuming a bug.** When `right` and `bottom` variants looked wrong, the fix was always overriding a base rule that leaked through — not a new rule missing. Ask "what base rules apply to this element?" first.
- **Verify `content: ""` exists** every time you write a `::after` block. It's the most forgettable required property.

---

## Interview Connections

- **CSS-only hover** — common pattern in UI rounds: "implement a tooltip without JavaScript." The key insight (tooltip must be inside trigger for `:hover` to reach it) is the answer.
- **`::before` / `::after`** — frequently asked "what are pseudo-elements?" — the rotated square arrow is a great concrete answer.
- **CSS cascade specificity** — the `bottom: auto` override demonstrates understanding of the cascade. Interviewers notice when you know *why* a property needs to be reset, not just that it needs to be.
- **BEM modifier naming** — design system questions often involve BEM. Double-dash modifier pattern (`block--modifier`) is the standard.

---

## How You Thought

- **Started with wrong positioning mental model.** Assumed `top: 20px` pushes element toward the top — the opposite of how it works. After working through it, corrected yourself: "top pushes to the bottom, bottom pushes to the top." The confusion came from reading `top` as a direction rather than an edge measurement.
- **Good instinct on pseudo-elements.** When asked "how would you make a shape without extra HTML?", you landed on `::after` without a hint. Showed you'd internalized the concept from the toggle project.
- **Unclear which element owned the arrow.** Kept writing selectors targeting `.tooltip` when the arrow logically lives inside `.tooltip__content`. The question to ask: "which element is the arrow *inside of*?" — that's the positioned parent.
- **`display: block` addition without understanding why.** You added it at one point but said "not sure why I added it." That's a gap — if you're adding something without knowing why, it'll be removed later when it breaks something.
- **Transform order confusion.** Tried `rotate(45deg) translateX(-50%)` — arrow moved diagonally. The mental model that fixed it: transforms apply right-to-left, so translate *before* rotate to keep the axis aligned.
- **Questioned CSS-only vs JS early** — showed good product thinking. Not every interaction needs JavaScript.

---

## Carry-forward Questions

- Why does `rotate(45deg) translateX(-50%)` move diagonally — what's the underlying coordinate system math?
- When does CSS-only hover fall short and require JavaScript? (Keyboard accessibility — `Tab` + `:focus-within` as an alternative?)
- What does `pointer-events: none` do on tooltips, and when do you need it?
- How does `z-index` stacking context actually work — why does `z-index: 10` sometimes not appear above `z-index: 1`?
- The reference used `transition: opacity` for a fade-in — how would you add that to the CSS-only approach?

---

## Unlearned Gaps (if any)

None — this was a fully CSS implementation. The reference JS version (`reference/index.js`) uses `mouseenter`/`mouseleave` to dynamically add/remove a `.visible` class — that pattern was not learned hands-on here. It would be worth building a JS hover tooltip as a follow-up.

---

## What to Practice More

- CSS positioning with `top`/`bottom`/`left`/`right` — especially negative values and the coordinate system
- Writing `::after` blocks from scratch without looking — `content`, `display`, `position`, coordinates in one pass
- Reading CSS selector chains aloud before writing — reduces typos significantly
