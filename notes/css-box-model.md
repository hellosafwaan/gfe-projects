# CSS Box Model

## The model
Every element is a box with four layers (outside in):
```
margin → border → padding → content
```

- `padding` — space inside the element (between content and border)
- `border` — the edge of the element
- `margin` — space outside the element (between elements)

---

## box-sizing

```css
* { box-sizing: border-box; }
```

- Default (`content-box`): padding adds to the total width. A 340px element with 16px padding = 372px wide.
- `border-box`: padding is included in the total width. 340px stays 340px. Always use this.

---

## Margin shorthand

```css
margin: 10px;                  /* all sides */
margin: 10px 20px;             /* top/bottom  left/right */
margin: 10px 20px 30px 40px;   /* top right bottom left (clockwise) */
margin: 80px auto 0 auto;      /* top=80 left=auto bottom=0 right=auto */
```

## Padding shorthand

```css
padding: 24px;           /* all sides */
padding: 24px 16px;      /* top/bottom=24  left/right=16 */
```

---

## Shorthand override bug

Shorthand overrides specific properties when it comes **after** them:

```css
/* WRONG — margin: 0 kills the top margin */
margin-top: 8px;
margin: 0;

/* CORRECT — specific comes after shorthand */
margin: 0;
margin-top: 8px;
```

Rule: put shorthand first, specific overrides after.

---

## Resetting browser defaults

Browsers apply default margins to elements you never styled:
- `<h2>`: `margin-top: 0.83em`, `margin-bottom: 0.83em`
- `<h3>`: `margin-top: 1em`, `margin-bottom: 1em`
- `<p>`: `margin-top: 1em`, `margin-bottom: 1em`

Reset globally:
```css
* {
  margin: 0;
  box-sizing: border-box;
}
```

Or per element:
```css
h3 { margin: 0; }
```

Check DevTools → Computed tab to see what the browser is adding.

---

## Padding sets height naturally

Never set `height` explicitly on buttons (or most interactive elements). Instead, let padding do it:

```css
/* height = padding-top + line-height + padding-bottom */
.btn--md  { padding: 10px 16px; font-size: 14px; } /* → ~40px tall */
.btn--lg  { padding: 10px 18px; font-size: 16px; } /* → ~44px tall */
.btn--xl  { padding: 12px 20px; font-size: 16px; } /* → ~48px tall */
.btn--2xl { padding: 16px 28px; font-size: 18px; } /* → ~60px tall */
```

Why not `height: 40px`? Because if the font or line-height changes, a fixed height clips or misaligns the text. Padding always stays proportional.

---

## Border compensation pattern

When a bordered element needs to match the height of an un-bordered sibling, reduce padding by the border-width on each side:

```css
/* Primary: padding: 10px 14px → height = 10 + 20 + 10 = 40px */
/* Secondary must match: border eats 1px top + 1px bottom */
.btn--secondary { border: 1px solid; }
.btn--secondary.btn--md { padding: 9px 13px; } /* 10 - 1 = 9 */
```

`box-sizing: border-box` does NOT help here — it only absorbs border into declared width/height. When height is auto (driven by padding), border still adds on top.

---

## overflow

Controls what happens when content exceeds the element's box.

```css
overflow: visible;  /* default — content spills out */
overflow: hidden;   /* clips anything outside the box */
overflow: scroll;   /* always shows scrollbars */
overflow: auto;     /* scrollbars only when needed */
```

**Common use:** `overflow: hidden` on a card clips children to the card's `border-radius` — no need to set `border-radius` on each child individually.

Watch out: `overflow: hidden` also clips `box-shadow` and `position: absolute` children.

### overflow-x: auto implicitly sets overflow-y

CSS requires both axes to agree. If one is `auto` (or `hidden`/`scroll`), the other can't stay `visible` — it gets silently changed to `auto`.

```css
/* This: */
overflow-x: auto;

/* Is equivalent to: */
overflow-x: auto;
overflow-y: auto;  /* ← silently set by the browser */
```

**Real bug this causes:** A tab button with `margin-bottom: -1px` extends 1px below its container. If that container has `overflow-x: auto`, the browser treats it as a scroll container on both axes and clips the -1px extension — making the active indicator disappear.

Fix: either remove `overflow-x: auto` when scroll isn't needed, or use the `::after` pseudo-element approach for the indicator (no negative margin required).

---

## Negative margin — extending an element beyond its container

`margin-bottom: -1px` pulls the element 1px further down, making it visually overlap whatever is directly below.

**Tab indicator overlap pattern:**
```css
/* Tab list has a 1px bottom border */
.tabs__list { border-bottom: 1px solid #d4d4d4; }

/* Each button extends 1px past the list's content area */
.tabs__trigger { border-bottom: 1px solid transparent; margin-bottom: -1px; }

/* Active button's 2px border sits on top of the 1px gray line */
.tabs__trigger--active { border-bottom: 2px solid #4f46e5; }
```

The -1px margin makes the button's border align with the list's border — the active tab's colored border then visually replaces the gray line for its width.

Note: only works when the container does NOT have `overflow-x: auto` (which would clip the extension).
