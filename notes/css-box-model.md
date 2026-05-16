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
