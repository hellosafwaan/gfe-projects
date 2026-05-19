# Profile Card — Learnings

## What I Built
A profile card with a circular avatar, name, role, description, a full-width "Contact me" button, and four social icon links. Centered on a gradient page background.

---

## Concepts Learned

### BEM Naming Convention
Block Element Modifier — a naming pattern for self-documenting, scope-independent class names.

```
block__element--modifier
profile-card__image        ← element inside block
profile-card__contact-me-cta  ← element inside block
```

- No nesting needed in CSS — each class is globally unique
- `block__element` for parts of a component
- `block__element--modifier` for variants or states

### fill="currentColor" on SVGs
`fill="currentColor"` makes the icon colour inherit from the CSS `color` property on the parent.

```html
<a href="..." class="profile-card__socials-link">
  <svg><path fill="currentColor" /></svg>
</a>
```

```css
.profile-card__socials a { color: #4338ca; }
.profile-card__socials a:hover { color: #3730a3; }  /* icon changes too */
```

Set `fill="none"` on the `<svg>` tag and `fill="currentColor"` on the `<path>` — the `<svg>` is the canvas, the `<path>` is the drawing.

### display: flex on Inline Elements
`<a>` is inline by default. Inline elements sit on a text baseline — the browser reserves a small gap below for descenders. This causes phantom extra height.

```css
.profile-card__socials a {
  display: flex;  /* removes baseline gap, correct height */
}
```

### align-items: center vs text-align: center
Two different things often confused:

- `align-items: center` on a flex parent → centers child **elements** horizontally in a column
- `text-align: center` on an element → centers **text** within that element

In a flex column, `<h3>` and `<p>` stretch to full width but their text left-aligns. You need `text-align: center` to center the text within that full-width box.

### text-align Inheritance
`text-align` is an inherited property — setting it on a parent passes it to all text children.

```css
.profile-card__identity {
  text-align: center;  /* name AND role both center — no need to repeat */
}
```

### Nested Flex for Spacing
Same pattern as blog-card — when gaps differ between sections, use wrapper divs with their own `gap` values:

```
.profile-card      gap: 40px   → details to actions
  .profile-card__details  gap: 24px   → avatar, identity, description
    .profile-card__identity  gap: 4px  → name to role
  .profile-card__actions  gap: 24px   → button to socials
```

### Circular Avatar
```css
.profile-card__image {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  object-fit: cover;
}
```

`border-radius: 50%` clips to a circle. `object-fit: cover` ensures the image fills without distortion.

---

## Mistakes Made

| Mistake | Fix | Why |
|---|---|---|
| `font-weight: 500px` | `font-weight: 500` | font-weight takes a number, not px |
| `profile-card___socials` (3 underscores) | `profile-card__socials` | BEM uses exactly 2 underscores |
| Used `<main>` as centering wrapper | `<div class="container">` | `<main>` is a semantic landmark, not a layout wrapper |
| `fill="#4338CA"` hardcoded on SVG paths | `fill="currentColor"` | Hardcoded colour can't be changed via CSS |
| `align-items: center` on `.profile-card__identity` | Removed it, used `text-align: center` | align-items shrinks children to content width in a column |
| `background: (147.52deg...)` | `background: linear-gradient(147.52deg...)` | Missing `linear-gradient()` wrapper — silently ignored |
| Missing semicolons on properties | Added semicolons | Invalid CSS — browser may ignore the property or the next one |
| Mixed uppercase/lowercase hex (`#4338CA` vs `#4338ca`) | Lowercase throughout | Inconsistent style — pick one convention |

---

## Patterns to Reuse

```css
/* Circular avatar */
border-radius: 50%;
width: 64px;
height: 64px;
object-fit: cover;

/* BEM block structure */
.block { }
.block__element { }
.block__element--modifier { }

/* Remove inline baseline gap on <a> containing SVG */
.socials a {
  display: flex;
}

/* Full-width solid button */
width: 100%;
border: none;
outline: none;
cursor: pointer;
font-family: inherit;
background-color: #4338ca;
color: #ffffff;
border-radius: 4px;
padding: 10px 16px;

/* Responsive card */
width: 100%;
max-width: 340px;
margin: 0 auto;

/* Nested flex spacing */
.card { display: flex; flex-direction: column; gap: 40px; }
.card__section { display: flex; flex-direction: column; gap: 24px; }
```

---

## Interview Connections

- **BEM** — commonly asked in interviews about CSS architecture; shows you think about scalability and naming conventions
- **`fill="currentColor"`** — signals SVG awareness; interviewers ask how you handle icon theming
- **`align-items` vs `text-align`** — a common source of confusion; understanding both shows CSS depth
- **Inline vs block element behaviour** — the baseline gap issue is a classic "why is there extra space?" interview question
- **Accessible links** — `aria-label` on icon-only links is a standard accessibility interview topic

---

## Carry-forward Questions

- When does BEM become unwieldy? At what point do you flatten naming or switch to a different convention?
- `display: flex` on `<a>` removes the baseline gap — are there other inline elements where this trick is needed?
- `text-align` inherits but `align-items` doesn't — what other properties inherit vs. don't?
- When should you use a `<button>` vs `<a>` for a "Contact me" — does it depend on whether it navigates somewhere?

---

## What to Practice More

- **BEM naming** — practice naming components consistently; it gets faster with reps
- **SVG manipulation** — `fill`, `stroke`, `currentColor`, `viewBox` — still unfamiliar
- **Figma token resolution** — finding hex values behind token names takes too long
- **`align-items` vs `text-align`** — revisit this distinction in the next layout project
- **Accessibility** — `aria-label`, `alt`, focus management — practice making it instinctive
