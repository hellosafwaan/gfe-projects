# Button Component

**A pixel-perfect button system built from scratch — 6 variants, 4 sizes, icon placements, and all interactive states using pure HTML and CSS.**

---

## Summary

Six button variants × four sizes with left/right/icon-only icon support, built using BEM class composition and CSS pseudo-classes for hover, focus, and disabled states.

---

## Implementation Details

### Tech stack and approach

Pure HTML and CSS — no JavaScript, no framework, no utility library.

The core architectural decision was **BEM modifier composition**. Rather than writing a separate ruleset for every combination of variant and size, I split concerns into two independent modifier axes:

- `.btn--primary` / `.btn--secondary` / etc. — handles color, background, border, shadow
- `.btn--md` / `.btn--lg` / `.btn--xl` / `.btn--2xl` — handles padding, font-size, line-height

Any variant combines with any size with zero extra CSS: `btn btn--primary btn--md`. Adding a new size is one class. Adding a new variant is one class. No combinatorial explosion.

**Height is driven entirely by padding**, not `height: 40px`. `padding-top + line-height + padding-bottom` naturally produces the right height, and it stays proportional if font metrics ever change.

The trickiest detail was the **secondary border compensation**. The secondary button has a `1px` border which adds to the rendered height — even with `box-sizing: border-box`, because that property only applies when height is explicitly set. To keep secondary buttons the same height as other variants, I reduced padding by `1px` on each side per size class (e.g. `padding: 9px 13px` instead of `10px 14px` for `md`).

**SVG icons** use `fill="currentColor"` on the `<path>`, which makes the icon inherit the CSS `color` property. This means every variant's hover, focus, and disabled states control the icon color automatically — no extra CSS rules needed.

For **icon-only buttons** on link variants, a compound selector `.btn--link-color.btn--icon-only { padding: 0 }` placed after the size overrides resets the padding without affecting other variants. Same specificity, later in the cascade — wins cleanly.

Layout uses a flex column container with `gap: 48px` between rows and a `flex-wrap: wrap` row with `gap: 20px` between buttons. On mobile, `width: 300px` constrains the content so buttons wrap. At 768px+, a media query sets `width: auto` so they expand naturally.

### Useful resources and lessons learnt

- `fill="currentColor"` is the correct pattern for themeable SVG icons — one CSS `color` rule controls everything including hover, focus, and disabled states across all variants automatically
- `box-sizing: border-box` does **not** absorb borders when height is auto — it only applies when height is explicitly declared; let this sink in before assuming border-box "fixes" your button sizing
- BEM double-dash (`--`) for modifiers, double-underscore (`__`) for elements — single dashes are for multi-word names within a block (e.g. `link-color`)
- `rgba()` not `rgb()` for any color with opacity — `rgb()` silently ignores the 4th value in some browsers
- `column-gap` is more precise than `gap` for icon-to-text spacing in a flex row — `gap` affects both axes and can interfere with wrapping behaviour

### Notes/questions for community

- The reference solution uses `height: 100%` on link variant buttons — but the parent has no explicit height. Does this actually do anything, or is it defensive CSS?
- Is reducing padding by `border-width` the standard industry approach for border compensation, or is there a cleaner method (e.g. using `outline` instead of `border` for the secondary button)?
- For the icon-only override on link variants, I used a compound selector placed later in the cascade. The reference removes icon-only buttons from link rows entirely. Is one approach more correct, or is it purely a design decision?
