# Profile Card — GFE Submission

---

## Title
BEM, Nested Flex, and a Circle. A Profile Card Done Right.

---

## Summary
Vanilla HTML & CSS — BEM naming, nested flex for precise spacing, inline SVG icons with currentColor for hover inheritance.

*(145 characters)*

---

## Implementation Details

### Tech stack and approach

Pure HTML and CSS. No frameworks, no shortcuts. Every decision was intentional.

**Semantic structure**

The card is an `<article>` — not a `<div>`. A profile card is self-contained content about a person; it makes sense on its own, independent of the page around it. That's the definition of `<article>`.

Inside, I used BEM naming throughout. In the blog-card project, I used nested CSS selectors like `.card .content .chip`. That works, but it ties styles to a specific DOM structure — move an element and the styles break. BEM gives every element a globally unique, self-documenting class name:

```html
<article class="profile-card">
  <div class="profile-card__details">
    <img class="profile-card__image" />
    <div class="profile-card__identity">
      <h3 class="profile-card__name">Sarah Dole</h3>
      <p class="profile-card__role">Front End Engineer @ Microsoft</p>
    </div>
    <p class="profile-card__description">...</p>
  </div>
  <div class="profile-card__actions">
    <button class="profile-card__contact-me-cta">Contact me</button>
    <div class="profile-card__socials">...</div>
  </div>
</article>
```

**The spacing problem**

The card has two sections — details and actions — with a 40px gap between them. Inside details, the gaps are 24px (between avatar, identity block, and description) and 4px (between name and role). Inside actions, the gap is 24px between button and socials.

You can't solve that with one `gap` value. The answer is the same nested flex pattern from blog-card:

```
.profile-card      gap: 40px
  .profile-card__details  gap: 24px
    .profile-card__identity  gap: 4px
  .profile-card__actions  gap: 24px
```

One number per gap, one place to change it.

**align-items: center vs text-align: center**

This was the trickiest CSS issue. The card uses `align-items: center` on all flex column containers — that centers child elements horizontally. But `<h3>` and `<p>` are block elements that stretch to full width by default. With `align-items: center`, they shrink to content width, which prevents them from centering correctly on the cross axis.

The fix: keep `align-items: center` on the card and sections to center the image and buttons, but use `text-align: center` on `.profile-card__identity` and `.profile-card__description` for the text elements. These are different tools:

- `align-items: center` — centers child **elements** inside a flex container
- `text-align: center` — centers **text** within an element

Setting `text-align: center` on `.profile-card__identity` passes it to both `.profile-card__name` and `.profile-card__role` through inheritance — no need to repeat it on each child.

**Circular avatar**

```css
.profile-card__image {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  object-fit: cover;
}
```

`border-radius: 50%` clips the element to a circle. `object-fit: cover` fills the fixed 64×64 box without distorting the image — same principle as the blog-card hero image.

**Inline SVG with currentColor**

The social icons are inline SVGs with `fill="currentColor"` on the `<path>`. The `<svg>` tag gets `fill="none"` — it's the canvas. The `<path>` is the actual drawing, and that's what gets coloured.

`currentColor` reads the CSS `color` property from the parent. So:

```css
.profile-card__socials a { color: #4338ca; }
.profile-card__socials a:hover { color: #3730a3; }
```

One CSS rule changes both text and icon colour simultaneously. No need to target the SVG path separately.

There's one more benefit: `<a>` is an inline element by default, which means the browser reserves a small gap below it for text descenders — even with no text. This causes phantom extra height. Setting `display: flex` on the `<a>` removes that gap and makes the icon sit correctly.

**Responsive without media queries**

```css
.profile-card {
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}
```

Wide screen → 340px centered. Narrow screen → shrinks to fit. Body padding prevents the card touching screen edges. No breakpoints needed for a single centered card.

---

### Useful resources and lessons learnt

**BEM naming prevents specificity wars**
Using `block__element` gives every class a unique, scoped name. No need to write `.profile-card .image` — `.profile-card__image` is already scoped by name. Makes styles portable and refactorable.

**`fill="currentColor"` is essential for themed icons**
Set it once on the `<path>`, control the colour from CSS via `color`. Hover states, disabled states, dark mode — all handled with a single property change on the parent.

**`display: flex` on `<a>` removes the baseline gap**
Inline elements sit on a text baseline. Even with no text, the browser reserves space for descenders. Switching `<a>` to `display: flex` removes the gap and gives you the exact height you expect.

**`align-items` vs `text-align` are different tools**
`align-items: center` centers child elements inside a flex container. `text-align: center` centers text within an element. You often need both — `align-items` for the layout, `text-align` for the typography.

**`text-align` is inherited — use it on the parent**
Setting `text-align: center` on a wrapper passes it down to all children. No need to set it on each `<h3>` and `<p>` individually.

**Figma tokens need resolving**
Token names like `Text/primary` and `Background/brand-primary` are variables, not hex values. Click the colour swatch to resolve them. Once resolved: `#171717`, `#525252`, `#4338ca` — keep these in a reference file for reuse.

---

### Notes/questions for community

- I used `text-align: center` on `.profile-card__identity` to inherit down to name and role, rather than setting it individually. Is there a case where inheritance like this causes unexpected issues — e.g. deeply nested children picking up the alignment unintentionally?

- The "Contact me" button is a `<button>` stripped of all defaults. In production this would presumably trigger a modal or form — but in a static component like this, is `<button>` still correct over `<a>`? The distinction I'm applying is: `<button>` for actions, `<a>` for navigation.

- I avoided `outline: none` on the social icon links even though they have a custom focus `box-shadow` — some browsers show both the outline and the shadow simultaneously. Should `outline: none` always be paired with a custom focus indicator, or are there accessibility reasons to keep the native outline?
