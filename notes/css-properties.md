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

---

## box-shadow

```css
box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
/*          x   y  blur  color           */

/* Multiple shadows separated by comma */
box-shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06);
```

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
display: block;        /* full width, starts on new line */
display: inline;       /* flows with text, ignores width/height */
display: inline-block; /* content width, respects padding/border */
display: flex;         /* flex container */
display: none;         /* hidden, takes no space */
```

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

## display: block on inline elements

`<a>` is inline by default — it only takes up as much width as its text content. `display: block` makes it stretch to fill the parent's full width.

```css
.mobile-menu__link {
  display: block; /* full width, not just text width */
}
```

Use whenever you want a link to be a full-width tap target — common in mobile menus and sidebars.
