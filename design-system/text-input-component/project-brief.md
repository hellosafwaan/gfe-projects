# Project Brief — Text Input Component

## Original Brief

In this challenge, you will build a versatile text input component as part of a design system. Text input components are essential for forms, data entry interfaces, and other interactive elements across various projects and apps found within the platform.

### Implementation requirements

- **Design fidelity:** Aim to follow the design as closely as possible. All elements in the design should be present, using the specified text color, font size, font weight, spacing, dimensions, etc.
- **Cross-browser compatibility:** Check that your solution works for major browsers including Chrome, Firefox, and Safari.
- **[Stretch goal] Accessibility:** Text Input components should meet AA standards of WCAG 2.1, including keyboard navigation and ARIA attributes for screen readers.
  - Clicking on the label should focus on the `<input>`.
  - Hint text / error message is associated with the `<input>` via the appropriate `aria-` attributes.

### Component properties

- **Customizable:** The component should allow for customizing of the label, placeholder, hint text, error message.
- **Icons:** Optional icons can be added at the front or back or both sides of the input field.
- **States:** The following states should be supported: Normal, Filled, Focused, Disabled, Error and other reasonable combinations.

---

## Challenge Guide

> GFE's hints on the tricky parts of this challenge.

### Features to support

- **States:** Default, Focused, Error, Disabled
- **Icons:** Left, right, or both
- **Hint / error text:** Configurable below the input

### Rendering icons inside the input

`<input>` does not accept children, so SVGs can't be placed inside it. Use CSS positioning instead.

**Approach 1 — recommended: absolute div over the input**

```html
<div style="position: relative">
  <div style="position: absolute; inset: 0; pointer-events: none; padding-left: 4px">
    <svg>...</svg>
  </div>
  <input style="padding-left: 20px" />
</div>
```

**Approach 2 — wrapper div styled like an input**

```html
<div style="display: flex; column-gap: 12px; border: 1px solid #eee;">
  <svg>...</svg>
  <input />
</div>
```

Approach 1 is preferred because in Approach 2 the `<input>` is smaller than it visually appears — clicking the border area won't focus it.

> Inline styles above are for illustration only. Use CSS classes in actual code.

### Accessibility

Link `<label>` to `<input>` with matching `for` and `id`:

```html
<label for="password-input">Password</label>
<input id="password-input" type="password" />
```

Link hint text / error message to `<input>` with `aria-describedby`:

```html
<label for="password-input">Password</label>
<input aria-describedby="password-hint" id="password-input" type="password" />
<div id="password-hint">Your password must be at least 8 characters long.</div>
```

### Focus state

Use `box-shadow` on `:focus` — not `outline` alone:

```css
.input:focus {
  box-shadow: /* values from design */;
  outline: none;
}
```

---

## Implementation Checklist

- [ ] Label + input + hint text structure with correct spacing
- [ ] `<label for>` links to `<input id>` so clicking label focuses input
- [ ] States: Normal, Filled, Focused, Disabled, Error, Error Focused
- [ ] Variant: Default (no icon) and Icon leading
- [ ] Hint text shown below input — grey normally, red on error
- [ ] Disabled state prevents interaction and looks visually muted
- [ ] Matches design: colors, font sizes, weights, spacing, border radius
- [ ] Works in Chrome, Firefox, and Safari
- [ ] **Stretch:** `aria-describedby` links input to hint/error text