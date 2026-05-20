# HTML Semantics

## Why semantics matter
- Accessibility — screen readers use element types to describe content
- SEO — search engines weight headings and landmarks
- Readability — `<article>` tells you more than `<div>` at a glance
- Interviews — increasingly asked why you chose one element over another

---

## Common elements and when to use them

| Element | Use when |
|---|---|
| `<article>` | Self-contained content that makes sense on its own (blog post, card, tweet) |
| `<section>` | A thematic grouping of content with a heading |
| `<div>` | A generic container with no semantic meaning — use as last resort |
| `<h1>`–`<h6>` | Headings — convey hierarchy, not just size |
| `<p>` | A paragraph of text |
| `<span>` | Inline container — no semantic meaning, for styling hooks |
| `<button>` | Clickable action — always use for interactive elements, not `<div>` |
| `<a>` | Navigation — links to another URL |
| `<img>` | Images — always include `alt` |
| `<ul>` / `<ol>` | Lists of items |

---

## Headings

Use headings for meaning, not size. Control size with CSS.

```html
<!-- Wrong — using p for a name/title -->
<p class="name">Sarah Dole</p>

<!-- Correct — name inside a component is a heading -->
<h2 class="name">Sarah Dole</h2>
```

Heading hierarchy:
- `<h1>` — one per page, main topic
- `<h2>` — major sections
- `<h3>` — subsections within h2
- Don't skip levels (h1 → h3) without an h2 in between

---

## article vs section vs div

- `<article>` — could be syndicated/shared independently (testimonial card, blog card, product card)
- `<section>` — part of a larger page, needs context (features section, pricing section)
- `<div>` — no meaning, just grouping for layout/styling

---

## Images

Always include `alt`:
```html
<img src="avatar.jpg" alt="Sarah Dole">         <!-- descriptive -->
<img src="decoration.svg" alt="">               <!-- decorative — empty alt is correct -->
```

Empty `alt=""` tells screen readers to skip the image entirely (correct for decorative images).

---

## Buttons vs Links

```html
<button>Submit</button>      <!-- action on the current page -->
<a href="/about">About</a>   <!-- navigates to another URL -->
```

Never use `<div>` or `<span>` as a button — you lose keyboard navigation and accessibility for free.

---

## BEM Naming Convention

Block Element Modifier — a pattern for self-documenting, scope-independent class names.

```
block                    → the component
block__element           → a part inside the component
block__element--modifier → a variant or state
```

```html
<article class="profile-card">
  <img class="profile-card__image" />
  <h3 class="profile-card__name">Sarah Dole</h3>
  <button class="profile-card__cta profile-card__cta--primary">Contact</button>
</article>
```

Why BEM over nested selectors:
- `.profile-card__image` works anywhere in the DOM — not tied to a parent
- No specificity conflicts — each class is flat and unique
- Self-documenting — the class name tells you what block it belongs to

**Composing modifiers for multi-dimensional components**

When a component varies across two independent dimensions (e.g. variant × size), use separate modifier classes — one per concern:

```html
<button class="btn btn--primary btn--md">Button</button>
<button class="btn btn--secondary btn--xl">Button</button>
<button class="btn btn--destructive btn--2xl">Button</button>
```

- `.btn` — shared base: border-radius, font-weight, display, cursor, gap
- `.btn--primary` — variant: background-color, color, border
- `.btn--md` — size: padding, font-size

Adding a new variant or size is one new class, not 20.

---

## Inline SVG Pattern

Embed SVGs directly in HTML for CSS colour control.

```html
<a href="https://github.com/..." aria-label="Link to GitHub profile">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M..." fill="currentColor" />
  </svg>
</a>
```

- `fill="none"` on `<svg>` — no fill on the canvas
- `fill="currentColor"` on `<path>` — colour inherits from CSS `color`
- `aria-label` on `<a>` — required when the link has no visible text

Always use `aria-label` on icon-only links — screen readers need to know where the link goes.
