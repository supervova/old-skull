# Header

The header serves as the top section of a website or application. It can be configured to perform one of two roles depending on the layout structure.

## 1. Main navigation layout

Used when the header contains the site’s primary navigation:

- Logo
- Main navigation `.topnav`
- Search bar (inline, expandable or modal)
- User menu / Authorization Buttons
- Optionally: buttons for a shopping cart, adding user-generated content, adding to favorites, and similar actions.

```pug
header.header
  a.logo(href='/')
  nav.topnav
  form.search
  nav.header-aside
    button.btn(type='button' aria-label='Open search')
      details.user-menu.popover
```

## Minimal layout (with side navigation)

Used when the main navigation is placed in a sidebar (.sidenav). The header includes:

- Search bar
- User menu / Authorization Buttons
- Optionally: hamburger button for side menu for a shopping cart, adding user-generated content, adding to favorites, and similar actions.
- Optionally: a logo, a hamburger button to open the main menu drawer, and the optional buttons listed above.

```pug
header.header
  //- Optionally: logo, a hamburger button
  form.search
  nav.header-aside
```

## Usage notes

- Combine with `.sidenav` for layouts with persistent side navigation.
- The header height should remain consistent across pages.
- Place global actions (like notifications or account menu) in the top-right area.
