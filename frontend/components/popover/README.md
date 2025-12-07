# Popover

The Popover component provides a flexible way to display contextual panels using either semantic `details` + `summary` markup or fully custom HTML. While the native pair offers good default behavior, the component is always enhanced with JavaScript to ensure consistent interactions across all layouts, including animation, focus handling, and closing on outside click. A popover can contain small forms, action menus, or navigation lists — allowing it to serve as a dropdown, settings menu, or lightweight modal depending on context.

## Usage

```html
<!-- Menu (dropdown) -->
<details class="popover" data-role="popover">
  <summary>Toggle</summary>

  <ul class="popover-body menu">
    <li><a class="menu-link" href="">Menu Item</a></li>
    <li><a class="menu-link" href="">Menu Item</a></li>
    <li><a class="menu-link" href="">Menu Item</a></li>
  </ul>
</details>

<!-- Tiny form -->
<details class="popover" data-role="popover">
  <summary>Toggle</summary>

  <div class="popover-body">
    <p>
      <label for="popover-title">Event Title</label>
      <input id="popover-title" name="title" type="text">
    </p>
    <p>
      <label for="popover-files">Attaching files…</label>
      <input id="popover-files" type="file" multiple>
    </p>
    <footer class="buttons">
      <button type="reset">Cancel</button>
      <button type="button">Delete</button>
      <button type="button">OK</button>
    </footer>
  </div>
</details>

<!-- Hint -->
<details class="popover" data-role="popover">
  <summary>Toggle</summary>

  <div class="popover-body">
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>Consectetur adipisicing elit. Beatae reiciendis atque nobis, non laboriosam labore sapiente cumque architecto itaque, sunt cum, in fugit voluptas doloremque sint explicabo vero similique incidunt.</p>
  </div>
</details>
```

For panels that need to change their behavior depending on the screen size, an alternative markup using different tags is provided. The corresponding logic is implemented in the popover.js script.

```html
<div class="popover" data-role="popover">
  <h3 data-role="popover-summary">Еще</h3>
  <div class="popover-body">
    Содержание
  </div>
</div>
```

## Accessibility

Both `details` and `summary` come with default semantic roles in browsers:

- `details` behaves as a `group`.
- `summary` behaves as a `button`.

These defaults do not require additional ARIA attributes, and the script keeps them intact.

When using custom markup (e.g., div-based popovers for mobile modal-sheet behavior), the script automatically adds all necessary attributes to match accessible button–dialog patterns. This includes:

- `role="button"` and keyboard activation for the trigger,
- proper `aria-expanded` state management,
- `aria-controls` linking trigger and panel,
- `aria-hidden` for the popover body,
- unique IDs for the controlled region,
- consistent open/close behavior and Escape-key support.

All attributes are updated dynamically based on the popover’s actual state, ensuring parity with the native semantic version.
