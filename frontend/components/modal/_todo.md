```html
<dialog class="modal" id="modal-example">
  <div class="modal-base">
    <header class="modal-header">
      <h2 class="modal-title">Modal title</h2>
      <button class="modal-close" type="button" aria-label="Close"></button>
    </header>
    <div class="modal-body">
      …
    </div>
    <footer class="modal-footer">
      …
    </footer>
  </div>
</dialog>
```

```css
/* Disable and hide body scrollbar */
html:has(.modal[open]) {
  overflow: clip;
}

/* Container */
.modal {
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  margin: 0;
  padding: 0;
  overflow: auto;
  width: 100vw;
  max-width: none;
  height: 100vh;
}

/* Backdrop */
.modal::backdrop {
  background: var(--color-backdrop);
  backdrop-filter: var(--backdrop-glass);
}

/* Window */
.modal-base {
  background: var(--color-bg-z3);
  border-radius: var(--radius-xl);
  box-shadow: var(--box-shadow-z3);
  margin-block: 3rem;
  width: calc(100% - var(--dim-5));
  max-width: var(--width-lg);
}

/* Sections */
.modal-header,
.modal-footer {
  padding: 1rem 1.5rem;
}

.modal-body {
  padding: 0 1.5rem 1.5rem;
}

/* заголовок и кнопка закрытия */
.modal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-title {
  margin: 0;
  flex: 1 1 auto;
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-close {
  background: rgb(148 163 184 / 0.25);
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  flex: none;
  position: relative;
  width: var(--size-4);
  height: var(--size-4);
}

.modal-close::before,
.modal-close::after {
  content: '';
  position: absolute;
  inset: 50%;
  inline-size: 14px;
  block-size: 2px;
  border-radius: 999px;
  background: rgb(15 23 42 / 0.8);
  translate: -50% -50%;
}

.modal-close::before {
  rotate: 45deg;
}

.modal-close::after {
  rotate: -45deg;
}

.modal-close:hover {
  background: rgb(148 163 184 / 0.4);
}

/* анимация появления */
.modal[open] .modal-base {
  animation: modal-in 0.18s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    translate: 0 12px;
    scale: 0.98;
  }
  to {
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce) {
  .modal[open] .modal-base {
    animation: none;
  }
}
```
