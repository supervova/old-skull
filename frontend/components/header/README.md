# Header

The header serves as the top section of a website or application. It can be configured to perform one of two roles depending on the layout structure.

## 1. Main navigation layout

Used when the header contains the site’s primary navigation:

- Logo
- Main navigation `.topnav`
- Search bar (inline, expandable or modal)
- User menu / Authorization Buttons
- Optionally: buttons for a shopping cart, adding user-generated content, adding to favorites, and similar actions.

```html
<header class="header">
  <a class="logo" href="/"></a>
  <nav class="topnav"></nav>
  <form class="search"></form>
  <nav class="header-aside">
    <button class="btn" type="button" aria-label="Open search">
      <details class="user-menu popover"></details>
    </button>
  </nav>
</header>
```

## Minimal layout (with side navigation)

Used when the main navigation is placed in a sidebar (.sidenav). The header includes:

- Search bar
- User menu / Authorization Buttons
- Optionally: hamburger button for side menu for a shopping cart, adding user-generated content, adding to favorites, and similar actions.
- Optionally: a logo, a hamburger button to open the main menu drawer, and the optional buttons listed above.

```html
<header class="header">
  <!-- Optionally: logo, a hamburger button -->
  <form class="search"></form>
  <nav class="header-aside"></nav>
</header>
```

## Usage notes

- Combine with `.sidenav` for layouts with persistent side navigation.
- The header height should remain consistent across pages.
- Place global actions (like notifications or account menu) in the top-right area.
