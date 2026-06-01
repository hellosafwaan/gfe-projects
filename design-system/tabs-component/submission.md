# Tabs Component

**Tabs component with border-bottom indicator and full ARIA tablist pattern**

---

## Summary

Tabs using border-bottom indicator, margin-bottom overlap, event delegation, data-attribute routing, and ARIA tablist with hidden attribute panel management.

---

## Implementation Details

### Tech stack and approach

Built with vanilla HTML, CSS, and JavaScript. The active tab indicator uses `border-bottom: 2px solid` on the trigger button combined with `margin-bottom: -1px` to overlap the tab list's gray baseline border. Tab switching uses event delegation on the tab list — `event.target.closest()` identifies the clicked tab, `dataset.tab` routes to the correct panel, and `hidden` attribute is toggled in sync with panel class switching.

### Useful resources and lessons learnt

- `overflow-x: auto` implicitly sets `overflow-y: auto` — this clips child elements that extend beyond the container via negative margin; discovered when the indicator disappeared after adding scroll
- `border-bottom: 2px` + `margin-bottom: -1px` is simpler than `::after` positioning for non-scrollable tab lists; `::after` with `z-index` is the correct approach when overflow is needed
- Active tab border and text use different color values (`#4f46e5` vs `#4338ca`) — easy to miss when both look similar in the design
- `outline: none` on `:focus-visible` defeats the purpose — if removing the browser ring, add a styled custom one instead
- `hidden` attribute in HTML as the initial state for inactive panels — JS then manages it consistently with `setAttribute`/`removeAttribute`
- `font-family: inherit` on `<button>` — browsers don't auto-inherit body font; required any time custom button styles are stripped

### Notes/questions for community

- Is a color-only focus change (no outline, just text color shift) WCAG compliant for interactive elements like tabs?
- When `overflow-x: auto` is required on the tab container, is the `::after` + `z-index` approach the standard pattern, or is there a cleaner solution used in production component libraries?
- What's the correct roving `tabindex` pattern for keyboard navigation between tabs — should inactive tabs have `tabindex="-1"` set upfront in HTML or only managed via JS on activation?
