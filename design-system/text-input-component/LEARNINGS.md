# Learnings — Text Input Component

> Status: Complete

---

## HTML

### BEM naming

Block → Element → Modifier pattern keeps class names predictable and scope-safe.

```html
<div class="input-group input-group--error">       <!-- block + modifier -->
  <label class="input-group__label">...</label>     <!-- element -->
  <div class="input-group__field">                  <!-- element -->
    <input class="input-group__input">              <!-- element -->
    <div class="input-group__icon">...</div>        <!-- element -->
  </div>
  <p class="input-group__hint">...</p>              <!-- element -->
</div>
```

Rules:
- Double underscore (`__`) = child element of block
- Double dash (`--`) = modifier (state or variant) on the block
- Modifier goes on the **block**, not the element — `.input-group--error`, not `.input-group__icon--error`

### `<label>` + `<input>` association

Use `for` on label and matching `id` on input. Two benefits: screen readers describe the field, clicking the label focuses the input.

```html
<label for="input-error">Email</label>
<input id="input-error" type="text" />
```

The id just needs to be unique on the page — descriptive names like `input-default`, `input-error` work fine.

### `placeholder` attribute

Goes directly on `<input>`, not in a separate element. No extra HTML needed.

```html
<input placeholder="name@email.com" type="text" />
```

Style it with `::placeholder` pseudo-element.

### SVG icon colour via `currentColor`

Set `fill="none"` on `<svg>` and `fill="currentColor"` on `<path>`. Then control colour with CSS `color` — change parent's `color` and the icon follows automatically.

```html
<svg fill="none" width="16" height="16">
  <path d="..." fill="currentColor" />
</svg>
```

```css
.input-group__icon { color: #a3a3a3; }
.input-group--error .input-group__icon { color: #dc2626; }
```

---

## CSS

### BEM modifier descendant selector

Space between modifier and element = descendant. No space = same element with both classes (wrong).

```css
/* Correct — error modifier on block affects icon inside it */
.input-group--error .input-group__icon { color: #dc2626; }

/* Wrong — would require the same element to have both classes */
.input-group--error.input-group__icon { ... }
```

### `width: 100%` on form elements

`<input>` and `<button>` do NOT stretch to fill their parent automatically unlike block-level `<div>`. Always add `width: 100%` explicitly.

```css
.input-group__input {
  width: 100%;
}
```

### Absolute icon inside relative field

The icon-inside-input trick: make the field container `position: relative`, then the icon `position: absolute`.

```css
.input-group__field {
  position: relative; /* establishes coordinate context */
}

.input-group__icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%); /* vertically centres the icon */
}
```

`top: 50%` moves the icon's top edge to the midpoint. `translateY(-50%)` pulls it back up by half its own height, centering it perfectly. Without the transform, the icon sits below center.

### `outline: none` on focused inputs

Browsers add a default blue `outline` on focus. When implementing a custom focus ring with `box-shadow`, you must:
1. Remove the default: `outline: none`
2. Also remove the border so it doesn't show through: `border-color: transparent`
3. Then add your own via `box-shadow`

```css
.input-group__input:focus {
  outline: none;
  border-color: transparent;
  box-shadow:
    0 0 0 1px #444ce7,
    0 0 0 4px rgba(68, 76, 231, 0.12),
    0 1px 2px 0 rgba(16, 24, 40, 0.05);
}
```

**Why `box-shadow` not `outline`?** `box-shadow` supports multiple layers and a spread radius for the outer glow. `outline` doesn't.

### Focus ring with `box-shadow` layers explained

```css
box-shadow:
  0 0 0 1px #444ce7,                    /* inner ring — 1px solid ring */
  0 0 0 4px rgba(68, 76, 231, 0.12),   /* outer glow — 4px semi-transparent */
  0 1px 2px 0 rgba(16, 24, 40, 0.05);  /* subtle drop shadow below */
```

Format: `x y blur spread color`. Setting x, y, blur all to 0 and varying spread gives a perfect ring at any distance.

### Error state — only icon and hint change colour

The border stays `#e5e5e5` in the error state. Only the icon and hint text turn `#dc2626`. The error-focused ring uses a different red (`#d92d20`).

```css
.input-group--error .input-group__icon { color: #dc2626; }
.input-group--error .input-group__hint { color: #dc2626; }

.input-group--error .input-group__input:focus {
  outline: none;
  border-color: transparent;
  box-shadow:
    0 0 0 1px #d92d20,
    0 0 0 4px rgba(217, 45, 32, 0.12);
}
```

### `margin: 0 auto` requires a fixed width

```css
.text-inputs {
  width: 340px;   /* required — without this, element fills full width */
  margin: 0 auto; /* splits leftover horizontal space equally */
}
```

Without `width`, the element fills the parent and there's no space left to split.

### Desktop-first media queries use `max-width`

When you write your base styles for desktop and override for mobile:

```css
/* base = desktop */
.container { padding: 112px 0; }

/* override = mobile */
@media (max-width: 375px) {
  .container { padding: 112px 17.5px; }
}
```

Mobile-first uses `min-width`. Since this project started with desktop styles, `max-width` is the right choice here.

### `box-shadow` values need `px` units

Every non-zero value in `box-shadow` needs `px` — missing units breaks the entire declaration silently.

```css
/* Broken — browser ignores the whole property */
box-shadow: 0 0 0 1 #444ce7;

/* Correct */
box-shadow: 0 0 0 1px #444ce7;
```

### `display: flex` on SVG wrapper divs

A `<div>` wrapping an SVG ends up taller than the SVG because inline SVGs sit on the text baseline — browsers reserve descender space below. `display: flex` kills the gap.

```css
.input-group__icon {
  display: flex; /* collapses div to exact SVG dimensions */
}
```

Rule: any element wrapping only an SVG with unexpected extra height needs `display: flex`.

### `padding` determines input height — no `height` needed

With `box-sizing: border-box`, padding + line-height gives you the total height:

```
padding-top: 10px + line-height: 20px + padding-bottom: 10px = 40px
```

No need to set `height: 40px` explicitly — it's redundant.

### Icon-leading variant pattern

Same absolute positioning trick, just mirrored. Left icon uses `left: 14px`, override `padding-left` on the input via BEM modifier descendant:

```css
.input-group__leading-icon {
  display: flex;
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
}

.input-group--icon-leading .input-group__input {
  padding-left: 38px;
}
```

---

## Accessibility

### `aria-describedby` for hint/error text

Links an input to its hint or error message so screen readers announce it when the field is focused.

```html
<input id="input-error" aria-describedby="hint-error" type="text" />
<p id="hint-error">This is an error message.</p>
```

- `aria-describedby` goes on the `<input>`, pointing to the hint's `id`
- The hint `<p>` just needs an `id` — no aria attribute on the hint itself
- Common mistake: putting `aria-describedby` on the hint instead of the input
