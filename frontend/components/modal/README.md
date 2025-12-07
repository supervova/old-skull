# Modal (dialog)

A modal is a UI component that appears on top of the interface and temporarily blocks interaction with the underlying content until the user completes an action or closes it.

## Markup

The HTML `<dialog>` element is used to create modal windows, slide-out panels, and other interactive overlays.

```html
<dialog class="modal" id="my-dialog" aria-labelledby="my-dialog-title">
  <article>
    <header>
      <h2 id="my-dialog-title">Window Title</h2>
      <button
        class="modal-close"
        type="button"
        data-action="close-modal"
        aria-label="Close"
      >
        &times;
      </button>
    </header>
    <div class="modal-body">
      <p>Main content...</p>
      <p><input type="text" autofocus /></p>
    </div>
    <footer>
      <button type="button" data-action="close-modal">Cancel</button>
      <button type="submit">Confirm</button>
    </footer>
  </article>
</dialog>
```

To open this window, a button should have `data-action="open-modal"` and `aria-controls="my-dialog"`.

## Script `modal.js`

1. **Opening/Closing**: The script listens for clicks on buttons with `data-action="open-modal"` and `data-action="close-modal"` attributes.
2. **State Management**: When a window is opened, the `has-open-modal` class is added to the `<html>` element. This allows for blocking page scroll and applying other global styles. The classes `has-opening-modal` and `has-closing-modal` are also used to control animation.
3. **Shift Compensation**: The script calculates the scrollbar width and sets it as a CSS variable `--scrollbar-width` on the `<html>` element. This prevents a content jump when the scrollbar disappears.
4. **External Content**: The `getExternalContent` function asynchronously loads content into the modal window (e.g., from another HTML file). This content is cleared after the window is closed.
5. **Sticky Header**: An `IntersectionObserver` monitors the position of the window's header during scrolling. If the header moves out of view, the `is-pinned` class is added to it, making it fixed at the top.
6. **Closing Methods**: The window can be closed by pressing `Esc`, clicking the overlay (outside the window), or clicking an element with `data-action="close-modal"`.

## Native `<dialog>` Features

### JS Methods

The element has three built-in methods for state management:

- `show()`: Opens a non-modal dialog (e.g., for notifications).
- `showModal()`: Opens a modal dialog, blocking the rest of the interface.
- `close()`: Closes the dialog.

When `showModal()` is called, the browser automatically places the element in the top layer and manages focus.

### `::backdrop` Pseudo-element

In modal mode (`showModal()`), the browser creates a `::backdrop` pseudo-element to dim the background. Its styles can be customized in CSS.

```css
dialog::backdrop {
  background: hsl(0 0% 0% / 0.5);
}
```

### Multiple Open Windows

By specification, a page can have several open dialogs. They occupy interface layers according to their position in the code or `z-index` value. If the topmost window is modal, others beneath it remain blocked, as do other interface elements. However, for user convenience, the current script closes the previous modal window when a new one is opened.

### Autofocus

When a modal window is opened, focus is automatically given to the first interactive element inside it. To set focus on a different element, use the `autofocus` attribute.

When the window is closed, focus returns to the element that opened it.

### Form Integration

A form inside a `<dialog>` with the `method="dialog"` attribute allows the window to be closed and a value to be returned without a page reload.

- On `submit`, such a form closes the dialog.
- The `value` of the clicked submit button is written to the `dialog.returnValue` property.

```html
<dialog>
  <form method="dialog">
    <p>Are you sure?</p>
    <menu>
      <button value="cancel">Cancel</button>
      <button value="confirm">Yes</button>
    </menu>
  </form>
</dialog>
```
