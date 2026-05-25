# Project Brief — Tooltip Component

## Original Brief

In this challenge, you will build a versatile tooltip component as part of a design system. These components will be essential for adding context to elements across various projects and apps found within the platform.

### Component states, variants, and properties

Tooltips are meant to be displayed relative to a triggering element. They can be customized according to:

- **Position**: Where the tooltip should appear relative to the triggering element. They can be at the top, left, right, or bottom.
- **Alignment**: How the tooltip should align relative to the triggering element – start, center, end. This is only applicable to top and bottom positions.

### Implementation requirements

- **Design fidelity**: Aim to follow the design as closely as possible. All elements in the design should be present, using the specified text color, font size, font weight, spacing, dimensions, etc.
- **Tooltip display**: When hovering over the triggering element, the tooltip will appear. For screenshot comparison purposes, only the tooltip needs to be rendered.
- **Cross-browser compatibility**: Check that your solution works for major browsers including Chrome, Firefox, and Safari.
- [Stretch goal] **Performance optimization**: Optimize image assets and code for quick load times, ensuring a smooth and responsive user experience.
- [Stretch goal] **Accessibility and semantics**: Follow best practices for web accessibility, such as using semantic HTML and ARIA roles where necessary and using proper alt tags for images.

## Challenge Guide

> No guide available for this challenge.

## Implementation Checklist

- [ ] Tooltip appears on hover over triggering element
- [ ] Position variants: `top`, `right`, `bottom`, `left`
- [ ] Alignment variants (top/bottom only): `start`, `center`, `end`
- [ ] Design fidelity: colors, font size, font weight, spacing, dimensions match Figma
- [ ] Arrow/caret points toward the triggering element for each position
- [ ] Tooltip is correctly positioned relative to the trigger (no layout shift)
- [ ] Works in Chrome, Firefox, and Safari
- [ ] [Stretch] Accessible markup: `role="tooltip"`, `aria-describedby` on trigger
