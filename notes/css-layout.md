# CSS Layout

## Flexbox

### Basic setup
```css
display: flex;
flex-direction: row;    /* default — children side by side */
flex-direction: column; /* children stacked vertically */
```

### Alignment
```css
justify-content: center;       /* align along main axis */
align-items: center;           /* align along cross axis */
align-items: flex-start;       /* align to start of cross axis */
```

### Spacing
```css
gap: 12px;             /* space between all children */
gap: 12px 24px;        /* row-gap column-gap */
```

### Individual child overrides
```css
align-self: flex-start; /* shrinks child to content width in a column */
flex: 1;                /* child grows to fill remaining space */
```

### When to use flexbox
- 1D layouts — a row or a column
- Side-by-side elements (nav, profile row, button with icon)
- Centering a single item

### Flexbox vs Grid
- Flexbox → 1D (row OR column)
- Grid → 2D (rows AND columns simultaneously)

---

## Centering with margin: auto

```css
width: 340px;         /* must have a fixed width */
margin: 0 auto;       /* splits leftover space equally left and right */
```

- Only works on block elements with a fixed width
- Without fixed width, element fills the page — no leftover space to split
- `margin: 80px auto 0 auto` → top 80px, left/right auto, bottom 0

---

## Responsive width pattern

```css
width: 100%;          /* fill parent on small screens */
max-width: 340px;     /* cap at 340px on large screens */
margin: 0 auto;       /* center it */
```

No media queries needed for a simple centered card.

---

## Nested flex for inconsistent gaps

When gap values differ between items, nest flex containers:

```
.content (gap: 8px)
  .chip
  .info (gap: 24px)
    .title-desc (gap: 12px)
      h3
      p
    button
```

Each wrapper controls its own gap — one place per gap value.

---

## Media queries

Use when the **layout itself changes** between breakpoints:

```css
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 340px;
  }
}
```

Don't use for minor adjustments that `max-width` or `%` already handle.
