# Testimonial Card — Learnings

## What I Built
A testimonial card with a circular avatar, name, handle, and quote text. Centered on a gradient page background.

---

## Concepts Learned

### Semantic HTML
- Used `<article>` for a self-contained piece of content (a testimonial)
- Used `<h2>` for the name instead of `<p>` — headings carry meaning, not just size
- `alt` attributes on images for accessibility

### CSS Box Model
- `padding` adds space *inside* an element (between content and border)
- `margin` adds space *outside* an element (between elements)
- `box-sizing: border-box` makes padding not add to the total width

### Centering with margin: auto
- `margin: 0 auto` horizontally centers a block element
- **Only works when the element has a fixed width** — without it, there's no leftover space to distribute
- The browser splits leftover page width equally on both sides

### Flexbox
- `display: flex` puts children side by side (row by default)
- `gap` adds spacing between flex children
- `align-items: center` vertically aligns children in the middle of the row

### Typography
- How to read Figma tokens: `text-lg-18/semibold · 18/28` → `font-size: 18px`, `font-weight: 600`, `line-height: 28px`
- `font-weight` values: 400 = normal, 600 = semibold, 700 = bold
- Browser default styles on `<h2>` and `<p>` add margins you don't want — reset with `margin: 0`

### Circular Images
- `border-radius: 9999px` makes any element circular (overkill but works for any size)
- `border-radius: 50%` is more conventional — always half the element regardless of size

### background vs background-color
- `background-color` — solid color only
- `background` — shorthand for color, gradients, images, position, etc.
- Used `linear-gradient(to bottom, #f9fafb, #d2d6db)` for the page background

### CSS Shorthand Override Bug
- Shorthand properties override specific ones when they come after
- Example: `margin-top: 16px` followed by `margin: 0` → the `margin: 0` wins and kills the top margin
- **Rule:** put shorthand before specific properties, or just use one or the other

### User Agent Stylesheet
- Browsers apply default styles to HTML elements you never wrote
- `<h2>` gets big font size, top/bottom margins by default
- Always check DevTools → Computed tab to see what the browser is adding

---

## Mistakes I Made

| Mistake | Fix | Why |
|---|---|---|
| Used `<p>` for the name | Changed to `<h2>` | Names/titles inside components are headings |
| Added unnecessary wrapper div around quote | Removed it | `<p class="quote">` can sit directly in `.card` |
| `gap: 16px 16px` | Just `gap: 16px` | Same value twice is redundant |
| Missing semicolon after `gap: 16px` | Added `;` | Won't always break but bad habit |
| `margin-top: 16px` then `margin: 0` below it | Removed `margin: 0` | Shorthand overrode the specific property |
| Missing `align-items: center` on `.profile` | Added it | Without it avatar and text are top-aligned |

---

## Patterns to Reuse

```css
/* Horizontally center a fixed-width block */
width: 340px;
margin: 0 auto;

/* Circular image */
border-radius: 50%;

/* Side-by-side layout with spacing */
display: flex;
align-items: center;
gap: 12px;

/* Subtle card */
background: white;
border-radius: 10px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
padding: 24px;
```

---

## Interview Connections

- **`margin: auto` centering** — very common interview question; explain that it only works with a fixed width because it splits leftover space equally
- **Semantic HTML** — interviewers increasingly ask why you chose `<article>` over `<div>`; the answer is accessibility and meaning
- **Flexbox** — "when would you use flexbox vs grid?" is a classic; flexbox for 1D layouts (rows or columns), grid for 2D
- **Resetting browser defaults** — shows awareness of the user agent stylesheet, a sign of CSS maturity

---

## Carry-forward Questions

- Is `border-radius: 50%` always preferred over `9999px` in production? When would one break and the other not?
- When should a card be an `<article>` vs a `<section>` vs a `<div>`?
- How does CSS specificity work when multiple rules target the same element?

---

## What to Practice More

- **Media queries** — learned the concept but didn't fully implement responsive breakpoints
- **Reading Figma tokens fluently** — took a few tries to map token names to CSS properties
- **CSS specificity** — not hit yet but will matter in bigger projects
- **Flexbox layouts** — used a simple row, but practice `flex-wrap`, `flex-grow`, `justify-content` variations
- **Git workflow** — committing, branching, deploying via `git subtree`
