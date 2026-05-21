# JavaScript DOM Reference

## Selecting elements

```javascript
document.querySelector('.class')     // first matching element
document.querySelectorAll('.class')   // all matching elements (NodeList)
document.getElementById('id')        // by ID
```

---

## Event listeners

```javascript
element.addEventListener('click', () => {
  // runs when element is clicked
});
```

**Common event names:**
- `'click'` — mouse click or tap
- `'input'` — value changes in input field
- `'submit'` — form submitted
- `'keydown'` — key pressed

**Key rule:** `addEventListener` uses `'click'`, NOT `'onclick'`. The `on` prefix is for HTML attributes only (`<button onclick="...">`). This is a very common first-time mistake.

---

## classList

Toggle CSS classes on elements via JavaScript — the standard way to drive UI state.

```javascript
element.classList.add('open')      // adds class
element.classList.remove('open')   // removes class
element.classList.toggle('open')   // adds if absent, removes if present
element.classList.contains('open') // returns true/false
```

**Pattern — show/hide with a class:**
```css
.mobile-menu { display: none; }
.mobile-menu.open { display: flex; }
```
```javascript
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});
```

Use `toggle` when one button controls both open and close. Use `add`/`remove` when separate buttons handle each action.