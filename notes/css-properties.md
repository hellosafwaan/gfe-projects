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
  font-family: inherit;  /* buttons don't inherit font by default */
}
```

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

Use this whenever an `<a>` contains only an icon (SVG) and the height looks wrong.
