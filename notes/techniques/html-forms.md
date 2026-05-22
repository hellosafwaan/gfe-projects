# Building Good HTML Forms

> Source: GFE — first used in: text-input-component

---

## 1. Add relevant `type` attribute to `<input>`

Browsers render input controls differently based on `type`, helping users fill in the form correctly.

```html
<input type="email" />
```

Common values: `text`, `email`, `number`, `url`, `checkbox`, `file`, `password`

---

## 2. Associate `<label>` with `<input>`

Every `<input>` needs a `<label>` for accessibility. Screen readers use it to describe the field. Clicking the label also focuses the input.

```html
<label for="email-input">Email</label>
<input id="email-input" type="email" />
```

Use `for` + `id` to link them. Prefer a visible `<label>` over `aria-label`.

---

## 3. Wrap in `<form>`

Enables browser enter-to-submit behaviour.

```html
<form>
  <label for="email-input">Email</label>
  <input id="email-input" type="email" />
</form>
```

---

## 4. Add `action` and `method` to `<form>`

```html
<form method="POST" action="/users/signup">
  ...
</form>
```

- `action` — URL that receives the submitted data
- `method` — `POST` (body) or `GET` (query string)
- `enctype` — needed when uploading files

---

## 5. Add a submit button

```html
<button>Sign up</button>
```

`<button>` inside a `<form>` defaults to `type="submit"`. Triggers form submission.

---

## 6. Add `name` attribute to `<input>`

Only inputs with `name` are included in the form submission data.

```html
<input id="email-input" name="userEmail" type="email" />
```

- `GET` → `/users/signup?userEmail=john@gmail.com`
- `POST` → request body contains `userEmail=john@gmail.com`

---

## 7. Add `autocomplete` attribute

Browsers offer autofill suggestions based on this value.

```html
<input autocomplete="email" id="email-input" name="userEmail" type="email" />
```

Common values: `email`, `family-name`, `new-password`, `street-address`

---

## 8. Add browser validation attributes

```html
<input required type="email" />
<input minlength="8" required type="password" />
```

Common attributes: `required`, `minlength`, `maxlength`, `pattern`

> Browser validation alone is not enough — always validate on the server too.

---

## 9. Link hint text / error messages with `aria-describedby`

Associates descriptive text with an input so screen readers announce it when the field is focused.

```html
<label for="password-input">Password</label>
<input
  aria-describedby="password-hint"
  id="password-input"
  type="password"
/>
<div id="password-hint">Your password must be at least 8 characters long.</div>
```
