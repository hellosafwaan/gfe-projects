# CSS Properties Reference

## border-radius

Rounds the corners of an element.

```css
border-radius: 8px;              /* all corners */
border-radius: 8px 8px 0 0;     /* top-left top-right bottom-right bottom-left */
border-radius: 50%;              /* circle (use on square elements) */
border-radius: 9999px;           /* pill shape — works for any size */
```

`50%` vs `9999px` for circles:
- `50%` is conventional — always half the element size
- `9999px` is overkill but works for any size — common for pill badges

---

## background vs background-color

```css
background-color: #f9fafb;                          /* solid color only */
background: #f9fafb;                                /* solid color */
background: linear-gradient(to bottom, #f9fafb, #d2d6db);  /* gradient */
background: url('image.jpg') center / cover;        /* image */
```

Use `background` for gradients and images. Use `background-color` only for solid colors.

### SVG as background-image on a pseudo-element
Use to render an icon inside a styled element without extra HTML markup:

```css
.checkbox__box::after {
  content: "";
  display: block;
  position: absolute;
  width: 9px;
  height: 7px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../img/checkmark.svg");
  background-size: contain;    /* scale SVG to fit without cropping */
  background-repeat: no-repeat; /* prevent tiling */
}
```

Always pair with `background-size: contain` and `background-repeat: no-repeat` — without them the image either distorts or tiles.

---

## box-shadow

```css
box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
/*          x   y  blur  color           */

/* With spread — fourth value */
box-shadow: 0 0 0 4px rgba(68, 76, 231, 0.12);
/*          x y blur spread color */

/* Multiple shadows separated by comma */
box-shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06);
```

### box-shadow as a border replacement
`border` affects the box model — with `box-sizing: border-box` it shrinks the inner space. `box-shadow` is purely decorative and never affects layout or sizing.

```css
/* Simulates 1px border + 4px focus ring — zero layout impact */
box-shadow:
  0 0 0 1px #9ca3af,
  0 0 0 4px rgba(157, 164, 174, 0.2);
```

Use whenever a border would interfere with the sizing of child elements (e.g. a thumb inside a sized track).

---

## object-fit

Controls how an `<img>` fills its box. Only works when the image has explicit width and height.

```css
object-fit: cover;    /* fill box, crop overflow — use for thumbnails/hero images */
object-fit: contain;  /* fit inside box, may leave empty space — use for logos */
object-fit: fill;     /* stretch to fill — distorts, avoid */
```

---

## display

```css
display: block;        /* full width, starts on new line — default for div */
display: inline;       /* flows with text — ignores width, height, top/bottom padding/margin */
display: inline-block; /* shrinks to content width, but respects padding/border/sizing */
display: flex;         /* full-width flex container */
display: inline-flex;  /* content-width flex container — same as inline-block but flexbox inside */
display: none;         /* hidden, takes no space */
```

`inline-block` = block element that only takes the space its content needs (doesn't stretch full width).
`inline-flex` = same outer behavior as `inline-block`, but children are flex items.

Use `inline-block` or `inline-flex` for components that shouldn't stretch: badges, tags, tooltip boxes, chips.

`inline` alone is rarely useful for UI — you can't control its size. Use `inline-block` or `inline-flex` instead.

---

## cursor

```css
cursor: pointer;  /* hand icon — use on buttons and clickable elements */
cursor: default;  /* arrow */
cursor: text;     /* text cursor */
```

Always add `cursor: pointer` when stripping default button styles.

---

## Pseudo-classes

```css
button:hover   { color: #3730a3; }   /* mouse over */
button:focus   { box-shadow: ...; }  /* keyboard focused */
button:active  { opacity: 0.8; }     /* being clicked */
button:disabled { color: #a3a3a3; } /* disabled state */
```

Use both `:hover` and `:focus` for full accessibility — keyboard users trigger `:focus`, mouse users trigger `:hover`.

### Form-specific pseudo-classes
```css
input:checked        /* checkbox/radio is ticked */
input:indeterminate  /* checkbox is in the "some but not all" state — set via JS only */
input:disabled       /* input is disabled */
input:focus-visible  /* keyboard focus only — not triggered by mouse clicks */
input:not(:disabled) /* any input that is NOT disabled */
```

`:indeterminate` has no HTML attribute — requires `input.indeterminate = true` in JavaScript. CSS responds to it, but JS must trigger it first.

### Chaining pseudo-classes
Multiple pseudo-classes stack on one element — all conditions must be true:
```css
input:not(:disabled):focus-visible:checked + .toggle-track
/* "input that is not disabled, AND keyboard-focused, AND checked" */
```

### `:focus-visible` vs `:focus`
- `:focus` triggers on every focus — including mouse clicks. Focus ring appears on click, which looks odd.
- `:focus-visible` only triggers when the browser decides a visible indicator is needed (keyboard navigation). Use this for custom focus rings.

### `:not()` — exclusion selector
```css
input:not(:disabled) + .toggle-track  /* track after a non-disabled input */
```

### `:has()` — CSS parent selector
Style a parent based on what's inside it. Previously impossible without JavaScript.
```css
.toggle:has(input:disabled) {
  cursor: not-allowed; /* label when its input is disabled */
}
```
(GAP AREA — introduced in toggle project, not yet iterated on hands-on)

---

## CSS Combinators

Four ways to select elements based on their DOM relationship:

```css
div p      /* descendant — p anywhere inside div */
div > p    /* child — p directly inside div (not nested deeper) */
div + p    /* adjacent sibling — p immediately after div */
div ~ p    /* general sibling — any p after div at same level */
```

Most commonly used in real projects: space (descendant) and `+` (adjacent sibling).

**`+` for form state (most important pattern):**
```css
input:checked + .toggle-track { background: #4338ca; }
input:disabled + .toggle-track { background: #f3f4f6; }
```
Read: "the `.toggle-track` immediately after a checked input."

---

## `appearance: none` — strip browser native form styling

Removes all browser-default rendering from a form element. Required before styling checkboxes, radios, or selects from scratch.

```css
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none; /* Safari */
}
```

After this: the element is invisible but still in the DOM, focusable, and operable — the behavior is intact.

---

## Visually hidden technique

Hides an element visually while keeping it in the accessibility tree. Use instead of `display: none` on interactive form elements.

```css
input[type="checkbox"] {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

- `display: none` → removed from DOM entirely — can't Tab, screen readers skip
- Visually hidden → invisible but keyboard-focusable and screen reader readable

---

## Stripping button defaults

```css
button {
  background: none;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}
```

`<button>` is one of the few elements that doesn't automatically inherit `font-family` from its parent. Even if `body` has `font-family: "Noto Sans"`, the button ignores it and falls back to the browser default (usually Arial or Times New Roman).

`font-family: inherit` tells the button: go look at your parent and use their font instead.

Same applies to `font-size` in some browsers — `inherit` fixes both.

---

## fill="currentColor" on SVGs

Makes the SVG icon colour inherit from the CSS `color` property on the parent element.

```html
<svg fill="none">              <!-- canvas — no fill -->
  <path fill="currentColor" /> <!-- drawing — inherits from CSS color -->
</svg>
```

```css
a { color: #4338ca; }
a:hover { color: #3730a3; }  /* icon changes colour automatically */
```

Use `fill="none"` on `<svg>` and `fill="currentColor"` on `<path>`. One CSS rule controls icon colour, hover, disabled states, and theming.

---

## flex vs inline-flex

```css
display: flex;        /* block-level container — takes full width, breaks onto new line */
display: inline-flex; /* inline container — sizes to content, flows with surrounding content */
```

Use `inline-flex` for components that live inside other content: badges, tags, chips, icon buttons.
Use `flex` for layout containers: rows, columns, page sections.

The children behave identically in both — only the outer element's relationship to its siblings changes.

**Needs more practice** — revisit until instinctive.

---

## gap vs column-gap

```css
gap: 8px;        /* applies to both row gap AND column gap in flex */
column-gap: 8px; /* applies only between items on the main axis */
```

Use `column-gap` for icon-to-text spacing inside a button — `gap` can interfere with wrapping behaviour when `flex-wrap: wrap` is active.

---

## -webkit-font-smoothing

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Makes fonts render thinner and crisper on Mac/Safari. Without it, text looks slightly bolder and blurrier. Always add to `body` on web projects — it's the standard baseline for design-matched font rendering.

---

## text-align vs align-items

Two properties often confused when centering content:

```css
/* Centers child ELEMENTS inside a flex container */
.parent { display: flex; flex-direction: column; align-items: center; }

/* Centers TEXT within an element */
.child { text-align: center; }
```

- `align-items: center` → the element itself is centered in the flex container
- `text-align: center` → the text inside the element is centered

You often need both: `align-items` for layout, `text-align` for typography.

`text-align` is inherited — set it on a parent and all text children pick it up automatically.

---

## display: flex on inline elements

`<a>` and `<span>` are inline by default. Inline elements sit on a text baseline — browsers reserve a small gap below for descenders (letters like g, p, y). This creates phantom extra height even with no text.

```css
a {
  display: flex;  /* removes baseline gap, height matches content exactly */
}
```

Use this whenever an `<a>` contains only an icon (SVG) or image and the height looks wrong. This applies to logo links too — not just icon buttons.

**Missed this twice:** Applied it in the badge project for icon-only links, then forgot it again in the navbar project for the logo `<a>` wrapping an `<img>`. The trigger is simple: any `<a>` wrapping only visual content (SVG or image, no text) needs `display: flex`.

**Also applies to `<div>` wrappers around SVGs.** A `<div>` is block-level but SVG inside it is inline — it still sits on the text baseline. The div ends up taller than the SVG (e.g. 16×21.5 instead of 16×16). Fix: `display: flex` on the div.

```css
.input-group__icon {
  display: flex; /* collapses div to exact SVG dimensions — kills baseline gap */
}
```

The rule: **any element that wraps only an SVG or image and has unexpected extra height needs `display: flex`.**

---

## flex-shrink

Controls whether a flex child is allowed to shrink when siblings need more space.

```css
.icon-button {
  width: 24px;
  height: 24px;
  flex-shrink: 0; /* never compresses, even when title text is long */
}
```

- Default is `flex-shrink: 1` — all flex children can shrink
- `flex-shrink: 0` — locks the element to its defined size always

Use on: icons, avatars, badges, close buttons — any fixed-size element sitting next to variable-length text in a flex row.

---

## position: fixed

Removes an element from document flow and pins it to the viewport. Setting all four sides to `0` makes it full-screen.

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

Use for: mobile menus, modals, toasts, sticky headers that need to sit above all other content. Pair with `z-index` if other elements on the page have a positive z-index.

---

## Media queries

Apply CSS conditionally based on screen width. Mobile-first uses `min-width` — write defaults for mobile, add overrides for larger screens.

```css
/* Mobile default */
.element { display: none; }

/* Desktop */
@media (min-width: 1024px) {
  .element { display: flex; }
}
```

Common breakpoints:
- Mobile: < 768px (default)
- Tablet: 768px
- Desktop: 1024px or 1440px

Always prefer `min-width` (mobile-first) over `max-width` (desktop-first).

---

## resize

Controls whether a textarea can be resized by the user.

```css
textarea {
  resize: none;       /* disables resize handle — required for design-system components */
  resize: vertical;   /* allows vertical resize only */
  resize: both;       /* default — allows both directions */
}
```

Always set `resize: none` on design-system textareas to match the fixed height in the design.

---

## ::after and ::before pseudo-elements

Generated elements inserted inside an element — `::before` at the start, `::after` at the end.

### When to use which
- `::before` — decorative content behind or in front of the element (overlays, background shapes)
- `::after` — content layered on top as a final layer (checkmarks, arrows, badges)

In practice the visual difference is handled by `position: absolute` anyway, so the choice is mostly convention. `::after` is the default go-to for most decorative additions.

Two rules that are always required:
1. `content: ""` — without this, the element doesn't render at all
2. `display: block` (or `flex`) — default is `inline`, which ignores `width` and `height`

```css
.tooltip__content::after {
  content: "";        /* required — no content = no element */
  display: block;     /* required — inline ignores width/height */
  width: 12px;
  height: 12px;
  background: #0a0a0a;
  transform: rotate(45deg);
}
```

Common use case: decorative shapes (tooltip arrows, dividers, badges) without extra HTML markup.

### Default position of `position: absolute` with no coordinates

When `position: absolute` is set but no `top`/`right`/`bottom`/`left` values are given, the element lands **exactly where it would have been in normal flow** — it just gets lifted out (stops taking up space). It does NOT jump to `0, 0`.

```css
/* Arrow lands at its natural flow position — bottom-left of the content */
.tooltip__content::after {
  position: absolute;
  /* no coordinates — sits where it would have been in flow */
}

/* To actually place it, always add coordinates: */
.tooltip__content::after {
  position: absolute;
  bottom: -6px; /* half the arrow height, outside the bottom edge */
  left: 12px;   /* distance from left edge */
}
```

Always pair `position: absolute` with explicit coordinates when you need precise placement.

---

## white-space: nowrap

Prevents text from wrapping onto the next line. The element grows horizontally instead of wrapping.

```css
.tooltip__content {
  white-space: nowrap; /* keeps tooltip text on one line */
}
```

Use on tooltips, badges, chips, tags — any component that should never break onto two lines.

---

## CSS cascade override: resetting position properties

When a base rule sets `bottom: 100%`, all variants inherit it — including those that need a different positioning axis. Reset explicitly with `auto` and `0` before setting the new values.

```css
/* Base leaks: bottom: 100%; margin-bottom: 8px */
.tooltip { bottom: 100%; margin-bottom: 8px; }

/* Right variant needs left/top axis — must cancel the base */
.tooltip--right {
  bottom: auto;       /* cancel inherited bottom: 100% */
  margin-bottom: 0;   /* cancel inherited margin */
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}
```

Pattern: when overriding positional properties, always reset the axis you're abandoning to `auto`/`0` first.

---

## transform order

Transforms apply right-to-left. The rightmost transform runs first and sets the coordinate frame for the next one.

```css
/* Correct — translates along original X axis, then rotates */
transform: translateX(-50%) rotate(45deg);

/* Wrong — rotates first (tilts axis 45°), then translates diagonally */
transform: rotate(45deg) translateX(-50%);
```

Rule: if you need to translate along the original axis, put `translate` before `rotate`.

---

## CSS-only hover (descendant combinator)

Show/hide a child element based on the parent's hover state. The tooltip must be a descendant of the trigger — the space combinator (` `) selects any child at any depth.

```css
.tooltip { display: none; position: absolute; }
.tooltip-trigger { position: relative; }
.tooltip-trigger:hover .tooltip { display: inline-flex; }
```

Read aloud: "When `.tooltip-trigger` is hovered, show any `.tooltip` inside it."

Limitation: only fires on mouse hover — doesn't support keyboard focus. For keyboard support, add `:focus-within`.

---

## ::placeholder pseudo-element

Styles placeholder text separately from the actual input text.

```css
.textarea__input::placeholder {
  color: #737373;
  font-weight: 400;
}

/* Style placeholder differently in disabled state */
.textarea__input:disabled::placeholder {
  color: #a3a3a3;
}
```

Browsers don't inherit font styles into placeholder — always set `font-family`, `font-size`, `font-weight` explicitly or use `inherit`.

---

## outline: none on custom focus rings

When implementing a custom focus ring with `box-shadow`, you must suppress the browser default first.

```css
.input:focus {
  outline: none;          /* remove browser default blue outline */
  border-color: transparent; /* remove border so it doesn't show through */
  box-shadow:
    0 0 0 1px #444ce7,
    0 0 0 4px rgba(68, 76, 231, 0.12);
}
```

Why `box-shadow` instead of `outline`? `box-shadow` supports multiple layers and a spread radius for the outer glow — `outline` doesn't. Setting x, y, blur all to 0 and varying spread gives a solid ring at any distance from the element.

---

## width: 100% on form elements

`<input>` and `<button>` do NOT stretch to fill their parent like block-level divs do. Always add `width: 100%` explicitly.

```css
.input-group__input {
  width: 100%; /* required — form elements don't auto-stretch */
}
```

---

## Absolute icon inside input (position trick)

Place icon inside input visually without affecting input width: make the field container `position: relative`, then absolutely position the icon.

```css
.input-group__field {
  position: relative; /* coordinate context for the icon */
}

.input-group__icon {
  position: absolute;
  right: 14px;         /* distance from right edge of field */
  top: 50%;            /* move top edge to vertical midpoint */
  transform: translateY(-50%); /* pull back up by half icon height */
}
```

`top: 50%` alone positions the top edge at center — the icon hangs below. `translateY(-50%)` shifts it up by half its own height, centering it perfectly. Also add `padding-right` on the input so typed text doesn't run under the icon.

---

## transition

Animates a CSS property change smoothly over time instead of snapping instantly. Triggers whenever the property value changes (e.g. via class toggle).

```css
transition: top 0.5s ease, opacity 0.5s ease;
/* format: property duration timing-function */
```

**Timing functions:**
- `ease` — fast start, slow end (most natural, use by default)
- `linear` — constant speed
- `ease-in` — slow start, fast end
- `ease-out` — fast start, slow end
- `ease-in-out` — slow start, fast middle, slow end

**Toast slide pattern — start hidden, transition to visible on class toggle:**
```css
#toast {
  top: -100px;
  opacity: 0;
  transition: top 0.5s ease, opacity 0.5s ease;
}
#toast.show { top: 20px; opacity: 1; }
#toast.hide { top: -100px; opacity: 0; }
```

---

## opacity + pointer-events for animatable show/hide

`display: none` cannot be transitioned. Use `opacity` + `pointer-events: none` instead to get animatable visibility.

```css
.dropdown__menu {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown__menu.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

- `opacity: 0` — invisible but still in the DOM and layout
- `pointer-events: none` — prevents clicks on the invisible element
- `transition` — animates both properties when the class is toggled

Use whenever you need to animate something appearing or disappearing — dropdowns, tooltips, toasts.

---

## display: block on inline elements

`<a>` is inline by default — it only takes up as much width as its text content. `display: block` makes it stretch to fill the parent's full width.

```css
.mobile-menu__link {
  display: block; /* full width, not just text width */
}
```

Use whenever you want a link to be a full-width tap target — common in mobile menus and sidebars.
