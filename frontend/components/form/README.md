# Form

## Text Field

Usage:

```html
<p>
  <label for="form-my-input">Label</label>
  <input id="form-my-input" name="name" type="text" placeholder="Label" />
  <small role="alert">Message</small>
</p>
<p>
  <label for="form-my-email">* Email</label>
  <input id="form-my-email" name="email" type="email" inputmode="email" required />
</p>
<p>
  <label for="form-my-textarea">* Comment</label>
  <textarea id="form-my-textarea" name="comment" required placeholder="Your comment"></textarea>
  <small role="alert">Message</small>
</p>
```

### Multiple Fields in a Row

```html
<div class="grid grid-auto">
  <p>
    <input name="firstname" type="text" aria-label="First name" placeholder="First name" required />
  </p>
  <p>
    <input name="lastname" type="text" aria-label="Last name" placeholder="Last name" required />
  </p>
</div>
```

## Special Attributes

### `inputmode`

Used to specify which keyboard should appear on mobile devices.

```html
<input type="text" inputmode="url" />
<input type="text" inputmode="email" />
<input type="text" inputmode="search" />
<input type="text" inputmode="numeric" />
<input type="text" inputmode="tel" />
```

The keyboard for `inputmode="decimal"` is almost identical to the one for `inputmode="tel"`, but it replaces the `+*#` key with a decimal point (useful for English-style fractional numbers).

```html
<input type="text" inputmode="decimal" />
```

### `enterkeyhint`

Changes the label of the Enter key on mobile keyboards. Possible values:

- `enter`
- `done`
- `go`
- `next`
- `previous`
- `search`
- `send`

### `form`

If a field must be placed outside of the `<form>` element, you can still link it to the form using the `form` attribute.

```html
<form id="my-form" action="/form.php">
  <input id="name" />
  <button type="submit">Submit</button>
</form>
<input type="email" form="my-form" />
```

### `label` for `optgroup`

```html
<select>
  <option>--Your Favourite Animal--</option>
  <optgroup label="Birds">
    <option>Blue Jay</option>
    <option>Cardinal</option>
    <option>Hummingbird</option>
  </optgroup>
</select>
```

### `multiple` for `[type='email']` and `[type='file']`

```html
<input name="form-file" type="file" multiple />
```

### `autocomplete`

Enables autofill from the browser profile.

Usually disabled for combo boxes and search fields:

```html
<input name="q" type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Search apple.com" placeholder="Search apple.com" />
```

For other fields, it provides useful values:

- `name` — full name
- `given-name` — first name
- `family-name` — last name
- `username` — username
- `email` — useful for login forms
- `tel-country-code` — country calling code
- `street-address`
- `address-line1`, `address-line2` — (second field is optional for non-US users)
- `postal-code`
- `cc-name` — name on credit card
- `cc-number` — card number
- `cc-exp`, `cc-exp-month`, `cc-exp-year` — expiration date (full or split into two fields)
- `cc-csc` — security code (CVV)
- `one-time-code` — two-factor authentication code

## Floating label

Usage:

```html
<!-- A floating label for an input -->
<div class="form-float">
  <input id="form-email" type="email" placeholder="Enter email" />
  <label for="form-email">Email</label>
</div>
<!-- A floating label for a select -->
<div class="form-float">
  <select id="form-country">
    <option value=""></option>
    <option value="me">Montenegro</option>
    <option value="us">USA</option>
  </select>
  <label for="form-country">Country</label>
</div>
<!-- A floating label for a textarea -->
<div class="form-float" id="form-message">
  <textarea placeholder="Enter message"></textarea>
  <label for="form-message">Message</label>
</div>
```

## Checkboxes and Radio Buttons

Usage

```html
<label>
  <input name="isadult" type="checkbox" />
  The community contains adult content
</label>
<label>
  <input name="enabled" type="checkbox" />
  This community is visible to other users
</label>
```

Add a fieldset wrapper if you need options displayed in a column.

```html
<fieldset>
  <label>
    <input name="delivery" type="radio" value="Pickup" checked />
    Pickup: Herceg Novi, Trg maršala Tita 2 (weekdays only)
  </label>
  <label>
    <input name="delivery" type="radio" value="Locker" />
    Delivery across Herceg Novi via parcel lockers — approximately 2€
  </label>
</fieldset>
```

## Search

Usage:

```html
<form class="search" action="/search" method="get" role="search">
  <label class="visually-hidden" for="search-input">Search the site</label>
  <input id="search-input" type="search" name="q" placeholder="Search…" autocomplete="search" required />
  <button class="btn-ghost" type="submit" aria-label="Submit search">
    <svg class="icon" aria-hidden="true" focusable="false">
      <use href="/assets/icons/sprite.svg#icon-search"></use>
    </svg>
  </button>
</form>
```

## Social Sign-In

```html
<p>Continue with your social network or messenger account:</p>
<ul class="btns-social">
  <li>
    <!-- +button('Facebook', 'brand-facebook', 'is-icon is-ghost', true)(onclick='facebookoauth()') -->
  </li>
  <li>
    <!-- +button('Google', 'brand-google', 'is-icon is-ghost', true)(onclick='googleoauth()') -->
  </li>
</ul>
```

## Complete Example: Common Field Types and Validation (with Patterns)

```html
<form id="form-needs-validation" action="/" method="post" novalidate>
  <input type="hidden" name="hidden-field" value="" />
  <p>
    <label for="form-name">Name</label>
    <input id="form-name" name="name" type="text" maxlength="128" pattern="[A-Za-z -]+" required />
  </p>
  <p>
    <label for="form-email">Email</label>
    <input id="form-email" name="email" type="email" inputmode="email" maxlength="128" required />
    <small role="alert">Message</small>
  </p>
  <div class="grid">
    <p class="col-1/3">
      <input name="country-code" type="text" aria-label="Country code" inputmode="numeric" maxlength="3" pattern="\\d{3}" required />
    </p>
    <p class="col-2/3">
      <input name="phone" type="text" aria-label="Phone number" inputmode="numeric" maxlength="9" pattern="\\d{8,9}" required />
    </p>
  </div>
  <p>
    <label for="form-state">State</label>
    <select id="form-state" name="state">
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
    </select>
  </p>
  <p class="form-option">
    <input id="form-terms" type="checkbox" name="terms" required />
    <label for="form-terms">
      You agree to our
      <a href="" target="_blank" rel="noopener noreferrer">Terms</a>
    </label>
  </p>
  <button class="btn btn-primary" type="submit">Sign Up</button>
</form>
```
