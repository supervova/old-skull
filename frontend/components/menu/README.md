# Menu

The **menu** component represents a list of links or commands, designed for navigation or performing actions. It is often used as a primary navigation element, as well as within dropdowns, sidebars, and other components.

## Structure and Usage

### Basic Markup

In its simplest form, a menu is an unordered list `<ul>` with the class `.menu`, wrapped in a `<nav>` tag for semantic purposes. Each menu item is a link `<a>` with the class `.menu-link`.

```html
<nav>
  <ul class="menu">
    <li>
      <a href="#" class="menu-link">
        <span class="menu-label">Profile</span>
      </a>
    </li>
    <li>
      <a href="#" class="menu-link">
        <span class="menu-label">Settings</span>
      </a>
    </li>
  </ul>
</nav>
```

### Menu with Icons

To add icons, use the `.icon` component. The icon's position is controlled by additional classes on the link.

- `.menu-item-icon-start`: icon at the beginning, text to the right.
- `.menu-item-icon-end`: icon at the end, text to the left.
- `.menu-item-icons`: for two icons at both ends.

```html
<ul class="menu">
  <li>
    <a href="#" class="menu-link menu-item-icon-start">
      <svg class="icon" aria-hidden="true"><use href="#icon-user"></use></svg>
      <span class="menu-label">Profile</span>
    </a>
  </li>
</ul>
```

### Divider

To visually separate menu items, use an empty `<li>` with the class `.menu-divider`.

```html
<ul class="menu">
  <li>...</li>
  <li class="menu-divider" role="separator"></li>
  <li>...</li>
</ul>
```

### Action Buttons

If a menu item should perform an action (e.g., "Logout") rather than navigate to a link, use a `<button>` with the class `.menu-action`.

```html
<ul class="menu">
  <li>
    <button class="menu-action menu-item-icon-start">
      <svg class="icon" aria-hidden="true"><use href="#icon-logout"></use></svg>
      <span class="menu-label">Logout</span>
    </button>
  </li>
</ul>
```

## States

### Active Item

To indicate the current page or active section, use the `aria-current="page"` attribute on the link. Styles will be applied automatically.

```html
<li>
  <a href="#" class="menu-link" aria-current="page">
    <span class="menu-label">Current Section</span>
  </a>
</li>
```

## Accessibility

### ARIA Roles

- **`<nav>`**: Always wrap navigation menus in a `<nav>` tag so screen readers can correctly identify them as navigation blocks.
- **`role="menu"`**: Use this role for `<ul>` only if the menu is not within a `<nav>` and serves as an application menu (e.g., a context menu).
- **`role="menuitem"`**: Applied to `<a>` links or `<button>` buttons within a menu with `role="menu"`.

### Radio Groups in Menus

To create a group of mutually exclusive options (e.g., sorting selection), you can use `role="menuitemradio"`.

```html
<li role="none">
  <ul role="group" aria-label="Sort by">
    <li role="menuitemradio" aria-checked="true">By Date</li>
    <li role="menuitemradio" aria-checked="false">By Popularity</li>
  </ul>
</li>
```

### Focus Management in Dynamic Menus

For custom widgets (e.g., dropdown menus) that appear and disappear, focus management must be implemented using JavaScript to ensure keyboard accessibility.

**Recommended Pattern**:

1. For hidden interactive elements within the menu, set `tabindex="-1"`.
2. When the menu opens, programmatically set focus to the first element by changing its `tabindex` to `0` and calling the `.focus()` method.
3. Implement navigation between items using arrow keys (Up/Down), moving `tabindex="0"` and focus between elements.
4. When the menu closes, return focus to the element that opened it.
