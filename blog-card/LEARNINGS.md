# Blog Card — Learnings

## What I Built
A blog card with a cover image, category badge, title, description, and a "Read more" button. Centered on a gradient page background.

---

## Concepts Learned

### object-fit
- `object-fit: cover` scales an image to fill its box and crops the overflow — aspect ratio preserved
- `object-fit: contain` fits the image inside the box, may leave empty space
- `object-fit: fill` stretches and distorts — almost never what you want
- Used on `.image` to fill the 340×288 card area with a 640×640 source image

### overflow: hidden
- When set on a parent, clips anything that exceeds its boundaries
- Used on `.card` to round the image's top corners — instead of setting `border-radius` on the image itself
- Cleaner approach: any child respects the card's rounded corners automatically

### Flexbox for spacing (gap vs margin-top)
- Using `display: flex; flex-direction: column; gap: Xpx` on a container spaces all children evenly
- Cleaner than adding `margin-top` to each individual element
- When gaps between items differ, nest flex containers with different `gap` values
- Example structure used:
  ```
  .content (gap: 8px)
    .chip
    .info (gap: 24px)
      .title-desc (gap: 12px)
        h3
        p
      button
  ```

### align-self: flex-start
- Flex children stretch to fill the container width by default
- `align-self: flex-start` on a specific child overrides that — shrinks it to content width
- Used on `.chip` so the badge doesn't stretch full width inside the flex column

### width: 100% + max-width for responsiveness
- `width: 100%` makes the element fill its parent
- `max-width: 340px` caps it at 340px on wide screens
- Together: card is 340px on desktop, shrinks on narrow screens — no media queries needed
- Add `padding-left/right` on body to prevent the card touching screen edges on mobile

### Resetting browser default margins
- `<h3>` and `<p>` have default top/bottom margins from the user agent stylesheet
- When using flexbox `gap`, these default margins stack on top of the gap — causing double spacing
- Fix: `margin: 0` on `h3` and `p` to wipe defaults, let `gap` control spacing entirely
- Better approach: `* { margin: 0 }` globally resets all defaults upfront

### Pseudo-classes for interactive states
- `:hover` — styles applied when the user hovers over the element
- Used `button:hover { color: #3730a3 }` to darken the button on hover
- Important for accessibility and visual feedback

### When NOT to use media queries
- Media queries are for when the layout itself changes (columns, visibility, structure)
- For a simple centered card that scales down, `width: 100% + max-width` is enough
- The reference solution's media queries only adjusted `min-height` — not meaningful layout changes

---

## Mistakes Made

| Mistake | Fix | Why |
|---|---|---|
| `border-radius` on image for rounded corners | Used `overflow: hidden` on card instead | Card clips all children automatically |
| `display: block` on chip | Used `align-self: flex-start` instead | In a flex column, block doesn't shrink — align-self does |
| `margin-top` on each element for spacing | Used flexbox `gap` on parent | Centralises spacing in one place |
| `margin: 0` after specific margin properties | Put `margin: 0` first, specific after | Shorthand overrides specific when it comes last |
| Double spacing between elements | Added `margin: 0` to `h3` and `p` | Default browser margins stacked on top of flex gap |
| `width: 100px` typo | Fixed to `width: 100%` | Typo caused card to be 100px wide |
| `margin: 0ok` typo | Fixed to `margin: 0` | Invalid value silently ignored by browser |
| `background-color` for gradient | Changed to `background` | `background-color` only accepts solid colors |

---

## Patterns to Reuse

```css
/* Responsive card width */
width: 100%;
max-width: 340px;
margin: 80px auto 0 auto;

/* Clip children to card's border-radius */
border-radius: 8px;
overflow: hidden;

/* Cover image */
width: 100%;
height: 288px;
object-fit: cover;

/* Flex column with gap for spacing */
display: flex;
flex-direction: column;
gap: 12px;

/* Pill badge */
display: inline-block; /* or align-self: flex-start in flex context */
padding: 2px 8px;
border-radius: 9999px;
border: 1px solid <border-color>;
background-color: <bg-color>;

/* Strip button defaults */
background: none;
border: none;
padding: 0;
cursor: pointer;
font-family: inherit;

/* Button with icon */
display: flex;
align-items: center;
gap: 6px;

/* Reset browser defaults globally */
* { margin: 0; box-sizing: border-box; }
```

---

## Interview Connections

- **`object-fit`** — commonly asked when discussing image handling; explain `cover` vs `contain` and when each applies
- **Flexbox gap vs margin** — "how do you handle spacing in a flex layout?" is common; gap is the modern answer
- **`overflow: hidden`** — often used for clipping, rounded corners, and clearing floats; interviewers ask about its side effects
- **`width: 100%` vs `max-width`** — classic responsive design question; explain how they work together
- **Pseudo-classes** — `:hover`, `:focus`, `:disabled` show awareness of interactive states and accessibility
- **Resetting browser defaults** — `* { margin: 0 }` shows CSS maturity and awareness of the user agent stylesheet

---

## Carry-forward Questions

- When should you use `align-self` vs wrapping in another div to control width?
- `overflow: hidden` can clip `box-shadow` and `position: absolute` children — when does this become a problem?
- What's the difference between `:hover` and `:focus` — when do you need both?
- When does `width: 100% + max-width` break down and require media queries?

---

## What to Practice More

- **Nested flex layouts** — used two levels of nesting here; practice more complex multi-level layouts
- **Pseudo-classes** — only used `:hover`; practice `:focus`, `:active`, `:disabled`, `:nth-child`
- **Global CSS resets** — get into the habit of `* { margin: 0; box-sizing: border-box }` from the start
- **`overflow` property** — understand all its values (`hidden`, `scroll`, `auto`, `clip`) and side effects
- **Reading Figma tokens faster** — still taking time to map token names to CSS values
