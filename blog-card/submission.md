# Blog Card — GFE Submission

---

## Title
No Framework. No Shortcuts. Just a Clean Blog Card.

---

## Summary
Vanilla HTML & CSS — nested flexbox for spacing, overflow: hidden for rounded corners, currentColor for icon inheritance.

*(122 characters)*

---

## Implementation Details

### Tech stack and approach

Pure HTML and CSS — no frameworks, no Tailwind, no shortcuts. Every pixel is intentional.

The card is a semantic `<article>` — not a `<div>` — because a blog card is self-contained content that makes sense on its own. Inside, the structure is split into two clear regions: the cover image and the content area.

**The spacing problem (and how I solved it)**

The trickiest part of this card isn't the badge or the button — it's the spacing. The gaps between elements are all different: 8px between chip and title, 12px between title and description, 24px between description and button. You can't solve that with a single `gap` value.

The solution: nested flex containers, each with its own gap.

```
.content      gap: 8px    → chip to info section
  .info       gap: 24px   → title+desc block to button
  .title-desc gap: 12px   → title to description
```

One number per gap, one place to change it. Clean and maintainable.

**`overflow: hidden` instead of image border-radius**

The card has `border-radius: 8px`. Instead of adding `border-radius: 8px 8px 0 0` to the image to round just the top corners, I set `overflow: hidden` on the card. It clips all children to the card's shape automatically — no per-child radius needed. Cleaner, and it works for any future child elements too.

**Cover image**

The source image is 640×640px. The card needs 340×288px. `object-fit: cover` scales it to fill the box and crops the overflow — no distortion, no overflow, aspect ratio preserved.

**The button**

Browsers give `<button>` a grey background, a border, padding, and a system font. All of it stripped: `background: none`, `border: none`, `padding: 0`, `font-family: inherit`. The text and SVG arrow sit side by side using flexbox. The SVG uses `fill="currentColor"` — so the hover state changes both text and icon colour with a single CSS rule.

**Responsive without media queries**

`width: 100%` + `max-width: 340px` handles all screen sizes. Wide screen → 340px centered. Narrow screen → shrinks to fit. No breakpoints needed for a single centered card.

---

### Useful resources and lessons learnt

**Nested flex for inconsistent gaps**
When sibling elements need different spacing between them, stop reaching for `margin-top`. Group them into wrapper divs and give each wrapper its own `gap`. One place per gap value — much easier to maintain.

**`overflow: hidden` clips everything**
Setting it on a parent clips all children to its border-radius. No need to round individual children. Side effect worth knowing: it also clips `box-shadow` and absolutely positioned children that extend beyond the parent.

**`fill="currentColor"` on SVGs**
The icon colour becomes whatever the CSS `color` property is on the parent. Hover, disabled, theming — all controlled by one rule. Essential pattern for icon buttons.

**Browser default margins + flexbox gap = double spacing**
`<h3>` and `<p>` have built-in top and bottom margins from the browser. When you use flex `gap`, those margins stack on top — you get more space than you asked for. Always add `margin: 0` when switching to gap-based spacing.

**`font-family: inherit` on buttons**
Browsers don't pass font down to `<button>` elements. Easy to forget, immediately obvious when you miss it.

---

### Notes/questions for community

- I used `overflow: hidden` on the card to clip image corners rather than `border-radius` on the image. Does this cause issues in production — e.g. tooltips or dropdowns positioned relative to the card getting clipped?

- I reset margins per element (`h3 { margin: 0 }`) rather than globally (`* { margin: 0 }`). Is there a meaningful difference for a component-scoped stylesheet, or is the global reset always the safer habit?

- The "Read more" is a `<button>` stripped of all defaults. In a purely visual component like this with no form or action wired up, is `<button>` still the right semantic choice — or would an `<a>` tag be more appropriate if it's intended to navigate somewhere?
