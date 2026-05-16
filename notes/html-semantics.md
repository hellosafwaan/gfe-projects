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
