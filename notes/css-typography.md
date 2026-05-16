# CSS Typography

## Font size
```css
font-size: 16px;   /* base body size */
font-size: 14px;   /* small/secondary text */
font-size: 18px;   /* card titles */
font-size: 24px;   /* page headings */
```

---

## Font weight
```css
font-weight: 400;  /* normal */
font-weight: 500;  /* medium */
font-weight: 600;  /* semibold */
font-weight: 700;  /* bold */
```

---

## Line height
```css
line-height: 20px;  /* tight — small text like labels */
line-height: 24px;  /* body text */
line-height: 28px;  /* headings */
```

Line height controls the vertical space per line. Higher = more breathing room between lines.

---

## Reading Figma tokens

Figma token format: `text-lg-18/semibold · 18/28`
- `18` → `font-size: 18px`
- `28` → `line-height: 28px`
- `semibold` → `font-weight: 600`

---

## Font family

```css
font-family: "Noto Sans", system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, sans-serif;
```

- First value is the preferred font (loaded from Google Fonts)
- Fallbacks kick in if the preferred font fails to load
- Always end with a generic family (`sans-serif`, `serif`, `monospace`)

**Important:** `<button>` elements do NOT inherit `font-family` from body. Always add:
```css
button { font-family: inherit; }
```

---

## Color

```css
color: #171717;   /* neutral-900 — primary text */
color: #525252;   /* neutral-600 — secondary text */
color: #6b7280;   /* gray-500 — muted/placeholder text */
color: #15803d;   /* green-700 — success text */
color: #4338ca;   /* indigo-700 — brand/link text */
```

---

## Text rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

Makes fonts render crisply on Mac/retina screens. Boilerplate — copy it into every project.
