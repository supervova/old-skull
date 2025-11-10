# Utility classes

**Utility CSS classes** are small, single-purpose classes that apply a single style property — such as margin, padding, color, or display — directly to an element. They make it faster to build interfaces by composing styles right in the markup, without writing custom CSS for every component. Use them to quickly adjust layout or appearance, keep styles consistent, and reduce the need for deeply nested selectors or repeated declarations.

This folder also includes more complex but still practical classes — for example, `.visually-hidden`, which hides an element on screen while keeping it accessible to screen readers.

However, it doesn’t contain helper classes for every possible case or breakpoint. Only the essentials are provided, and you’re expected to extend the set following the same pattern. By default, the build includes only the `mvp.css` file — a minimal set of the most common typography and layout utilities.
