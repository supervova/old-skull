# Form

## Text Field

Usage:

```pug
p
  label(for='form-my-input') Label
  input#form-my-input(name='name' type='text' placeholder='Label')
  small(role='alert') Message

p
  label(for='form-my-email') * Email
  input#form-my-email(name='email' type='email' inputmode='email' required)

p
  label(for='form-my-textarea') * Comment
  textarea#form-my-textarea(name='comment' required placeholder='Your comment')
  small(role='alert') Message
```

### Multiple Fields in a Row

```pug
.grid.grid-auto
  p
    input(name='firstname' type='text' aria-label='First name' placeholder='First name' required)
  p
    input(name='lastname' type='text' aria-label='Last name' placeholder='Last name' required)
```

## Special Attributes

### `inputmode`

Used to specify which keyboard should appear on mobile devices.

```pug
input(type='text' inputmode='url')
input(type='text' inputmode='email')
input(type='text' inputmode='search')
input(type='text' inputmode='numeric')
input(type='text' inputmode='tel')
```

The keyboard for `inputmode="decimal"` is almost identical to the one for `inputmode="tel"`, but it replaces the `+*#` key with a decimal point (useful for English-style fractional numbers).

```pug
input(type='text' inputmode='decimal')
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

```pug
form#my-form(action='/form.php')
  input#name
  button(type='submit') Submit

input(type='email' form='my-form')
```

### `label` for `optgroup`

```pug
select
  option --Your Favourite Animal--
  optgroup(label='Birds')
    option Blue Jay
    option Cardinal
    option Hummingbird
```

### `multiple` for `[type='email']` and `[type='file']`

```html
<input name="form-file" type="file" multiple />
```

### `autocomplete`

Enables autofill from the browser profile.

Usually disabled for combo boxes and search fields:

```pug
input(name='q' type='search' autocorrect='off' autocapitalize='off' autocomplete='off' spellcheck='false' aria-label='Search apple.com' placeholder='Search apple.com')
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

```pug
//- A floating label for an input
.form-float
  input#form-email(type='email' placeholder='Enter email')
  label(for='form-email') Email

//-  A floating label for a select
.form-float
  select#form-country
    option(value) Choose country
    option(value='me') Montenegro
    option(value='us') USA
   label(for='form-country') Country

//- A floating label for a textarea
.form-float#form-message
  textarea(placeholder='Enter message')
  label(for='form-message') Message
```

## Checkboxes and Radio Buttons

Usage

```pug
label
  input(name='isadult' type='checkbox')
  | The community contains adult content

label
  input(name='enabled' type='checkbox')
  | This community is visible to other users
```

Add a fieldset wrapper if you need options displayed in a column.

```pug
fieldset
  label
    input(name='delivery' type='radio' value='Pickup' checked)
    | Pickup: Herceg Novi, Trg maršala Tita 2 (weekdays only)

  label
    input(name='delivery' type='radio' value='Locker')
    | Delivery across Herceg Novi via parcel lockers — approximately 2€
```

## Search

Usage:

```pug
form.search(action='/search' method='get' role='search')
  label.visually-hidden(for='search-input') Search the site
  input#search-input(type='search' name='q' placeholder='Search…' autocomplete='search' required)
  button.btn-ghost(type='submit' aria-label='Submit search')
    svg.icon(aria-hidden='true' focusable='false')
      use(href='/assets/icons/sprite.svg#icon-search')
```

## Social Sign-In

```pug
p Continue with your social network or messenger account:

ul.btns-social
  li
    +button('Facebook', 'brand-facebook', 'is-icon is-ghost', true)(onclick='facebookoauth()')
  li
    +button('Google', 'brand-google', 'is-icon is-ghost', true)(onclick='googleoauth()')
```

## Complete Example: Common Field Types and Validation (with Patterns)

```pug
form#form-needs-validation(action='/' method='post' novalidate)
  input(type='hidden' name='hidden-field' value='')

  p
    label(for='form-name') Name
    input#form-name(
      name='name'
      type='text'
      maxlength='128'
      pattern='[A-Za-z -]+'
      required
    )

  p
    label(for='form-email') Email
    input#form-email(
      name='email'
      type='email'
      inputmode='email'
      maxlength='128'
      required
    )
    small(role='alert') Message

  .grid
    p.col-1\/3
      input(
        name='country-code'
        type='text'
        aria-label='Country code'
        inputmode='numeric'
        maxlength='3'
        pattern='\\d{3}'
        required
      )

    p.col-2\/3
      input(
        name='phone'
        type='text'
        aria-label='Phone number'
        inputmode='numeric'
        maxlength='9'
        pattern='\\d{8,9}'
        required
      )

  p
    label(for='form-state') State
    select#form-state(name='state')
      option(value='AL') Alabama
      option(value='AK') Alaska
      option(value='AZ') Arizona

  p.form-option
    input#form-terms(type='checkbox' name='terms' required)
    label(for='form-terms')
      | You agree to our
      a(href='' target='_blank' rel='noopener noreferrer') Terms

  button.btn.btn-primary(type='submit') Sign Up
```
