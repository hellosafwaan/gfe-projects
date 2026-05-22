# Project Brief — Textarea Component

## Original Brief

Build a versatile textarea component as part of a design system. These components will be essential for forms, data entry interfaces, and other interactive elements across various projects and apps found within the platform.

### Implementation Requirements
- **Design fidelity:** Aim to follow the design as closely as possible. All elements in the design should be present, using the specified text color, font size, font weight, spacing, dimensions, etc.
- **Cross-browser compatibility:** Check that your solution works for major browsers including Chrome, Firefox, and Safari.
- **[Stretch goal] Accessibility:** Text Input components should meet AA standards of WCAG 2.1, including keyboard navigation and ARIA attributes for screen readers.
  - Clicking on the label should focus on the `<textarea>`.
  - Hint text / error message is associated with the `<textarea>` via the appropriate `aria-` attributes.

### Component Properties
- **Customizable:** The component should allow for customizing of the label, placeholder, error message, maximum number of characters.
- **States:** The following states should be supported: Normal, Filled, Focused, Disabled, Error and other reasonable combinations.

## Challenge Guide

These guides help you get started on the trickier portions of the challenge.

The textarea component should support the following features:
- **States:** Default, Error, Disabled, Character limit exceeded.
- **Character count:** Displays a configurable character count.
- **Error message:** Configurable help text or error message.

### Updating Character Count

JavaScript is required for updating the character count in real-time. An event listener (`input`) can be added to the `<textarea>` to listen for changes and update the counter.

```html
<textarea id="my-textarea"></textarea>
<span id="my-textarea-count">0</span>
<script>
  document.querySelector('#my-textarea').addEventListener('input', (event) => {
    document.querySelector('#my-textarea-count').textContent =
      event.target.value.length;
  });
</script>
```

### Accessibility

- Link `<label>` with `<textarea>` using `for` and `id`.
- Link hint text / error message to `<textarea>` with `aria-describedby`.

```html
<label for="description-field">Description</label>
<textarea aria-describedby="description-error" id="description-field">
  This is a description.
</textarea>
<div id="description-error">This is an error message.</div>
```

### Focus State Shadow

```css
.textarea:focus {
  box-shadow: ...;
}
```

## Implementation Checklist

- [ ] Textarea with label, placeholder, error message, character count
- [ ] States: Normal, Filled, Focused, Disabled, Error, Character limit exceeded
- [ ] Real-time character count via `input` event listener
- [ ] Character count shows `current / max` format
- [ ] Error state triggered when character limit is exceeded
- [ ] Label is linked to textarea via `for`/`id`
- [ ] Hint/error text linked via `aria-describedby`
- [ ] Focus ring using `box-shadow`
- [ ] Disabled state: no interaction, muted appearance
- [ ] Cross-browser: Chrome, Firefox, Safari
