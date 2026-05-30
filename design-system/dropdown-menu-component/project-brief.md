# Project Brief — Dropdown Menu Component

## Original Brief

Build a versatile dropdown menu component as part of a design system. These components will be essential for filtering lists across various projects and apps found within the platform.

### Component States, Variants, and Properties

- **States:** Each menu item has the following states: initial, hover, focus, disabled, selected
- **Icon:** An icon can be added as a prefix for each menu item

### Implementation Requirements

- **Design fidelity:** Aim to follow the design as closely as possible. All elements in the design should be present, using the specified text color, font size, font weight, spacing, dimensions, etc.
- **Trigger:** The dropdown menu can be triggered on interactive elements like buttons, text inputs, etc.
- **Cross-browser compatibility:** Check that your solution works for major browsers including Chrome, Firefox, and Safari.
- **[Stretch goal] Performance optimization:** Optimize image assets and code for quick load times, ensuring a smooth and responsive user experience.
- **[Stretch goal] Accessibility and semantics:** Follow best practices for web accessibility, such as using semantic HTML and ARIA roles where necessary and using proper alt tags for images.

## Challenge Guide

> No challenge guide provided.

## Implementation Checklist

- [ ] Trigger button renders with label and chevron icon
- [ ] Clicking trigger opens/closes the dropdown menu
- [ ] Menu items render with optional prefix icon and label
- [ ] Selected item shows a checkmark icon on the right
- [ ] Clicking a menu item selects it and updates the trigger label
- [ ] Dropdown closes after selection
- [ ] Hover state styled on menu items
- [ ] Focus state styled on menu items (keyboard navigation)
- [ ] Disabled state: item is non-interactive and visually muted
- [ ] Design fidelity: colors, spacing, typography match Figma
- [ ] [Stretch] ARIA roles: `role="listbox"`, `role="option"`, `aria-expanded`, `aria-selected`
- [ ] [Stretch] Keyboard navigation: Arrow keys, Enter, Escape
