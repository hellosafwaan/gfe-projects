# Navbar Component — Design System

**Mobile-first navbar with hamburger menu and JS-powered full-screen overlay.**

---

## Summary

Responsive nav with desktop links + CTAs, tablet/mobile hamburger, and a full-screen mobile menu toggled via classList — all in vanilla HTML, CSS, and JS.

---

## Implementation Details

### Tech stack and approach

Pure HTML, CSS, and JavaScript — no frameworks or libraries.

The implementation follows a strict mobile-first approach: default styles target mobile (hamburger visible, nav links hidden), with a single `min-width: 1024px` media query enabling the full desktop layout. This keeps the CSS straightforward — one breakpoint, one override.

The desktop layout uses a three-zone flex structure: `.navbar__logo` (left), `.navbar__content` (center+right, `flex: 1`), and `.navbar__hamburger` (hidden). Inside `.navbar__content`, `gap: 96px` separates the links from the CTA buttons, and `flex: 1` on `.navbar__links` pushes the buttons to the far right edge. The 80px gap between the logo and content area comes from `gap: 96px` on `.navbar__inner`.

The mobile menu is a separate `<div>` outside `<nav>`, positioned `fixed` with `top/left/right/bottom: 0` to cover the full viewport. It uses `display: none` by default and `display: flex` when JavaScript adds the `.open` class — a clean toggle with no animation overhead. `flex-direction: column` with `flex: 1` on the links list pushes the action buttons to the bottom of the screen.

JavaScript is minimal: two `addEventListener('click')` calls — one on the hamburger to add `.open`, one on the close button to remove it. The `classList` API keeps JS completely decoupled from the visual implementation.

Button component styles were reused directly from the previous design-system project — `btn--primary`, `btn--secondary`, `btn--link-gray`, and `btn--icon-only` modifiers. The hamburger and close buttons use `btn--link-gray btn--icon-only` for consistent hover and focus states without duplicating code.

### Useful resources and lessons learnt

- `position: fixed` with all four sides set to `0` is the standard full-screen overlay pattern — works for modals, drawers, and mobile menus
- `addEventListener('click', ...)` uses `'click'` not `'onclick'` — the `on` prefix is for HTML event attributes only, a common first-time mistake
- `display: block` on `<a>` makes it stretch to full width — inline elements only take up as much space as their content
- Mobile-first with `min-width` is cleaner than desktop-first with `max-width` — you add complexity as screen size grows, not remove it
- BEM class always goes on the `<a>` element directly, never on the parent `<li>` — browser default link styles override inherited values from parent elements
- `flex: 1` on a flex child + `gap` on the container is a reliable pattern for pushing elements to specific positions without `justify-content: space-between`

### Notes/questions for community

- Is it better practice to use `classList.toggle('open')` with a single event listener, or separate `.add` and `.remove` calls on two different buttons? The separate approach feels more readable but toggle is more concise.
- How would you handle closing the mobile menu when the user clicks outside of it — `document.addEventListener('click')` with a target check, or an overlay backdrop element?
- For accessibility, should focus be trapped inside the mobile menu when open, or is keyboard navigation through the page behind acceptable when the menu is a slide-in rather than a modal?
