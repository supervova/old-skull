# Theme and Base Styles

The `/theme` directory contains all base styles, design tokens, resets, global settings, and utilities that form the foundation of the project's visual language.

## Key Principles

-   **CSS Custom Properties**: The entire system is built on CSS Custom Properties (design tokens), ensuring flexibility and easy customization.
-   **Modern CSS**: The framework leverages modern CSS capabilities such as logical properties, `@scope`, `:has()`, nesting, and `rlh` units.
-   **PostCSS**: PostCSS is used to extend CSS capabilities, such as mixins (`@define-mixin`) and custom media queries (`@custom-media`).

## Design Tokens (`vars.css`)

The `vars.css` file is the core of the theme and defines all primary design tokens.

### 1. Color Palette

The color system is built on the HSL color model, allowing easy management of hues, saturation, and lightness.

-   **Base Hues**: Variables are defined for main semantic colors (`--h-blue: 210`, `--h-green: 120`, etc.).
-   **Saturation**: Managed via `--s-base`, `--s-02`, etc.
-   **Brand Color**: Defined through `--h`, `--s`, and `--l` variables.

#### Dark and Light Themes

The project supports light and dark themes, which are defined in `vars-light.css` and `vars-dark.css`.

-   **Automatic Mode**: The theme switches based on user system settings using the `(prefers-color-scheme: dark)` media query.
-   **Manual Switching**: Users can force a theme by using the `data-theme="dark"` or `data-theme="light"` attribute on the `<html>` element or any other element, creating nested themes.

```html
<!-- Automatic theme detection -->
<html>
  ...
</html>

<!-- Force dark theme -->
<html data-theme="dark">
  ...
</html>

<!-- Nested light theme within a dark theme -->
<body data-theme="dark">
  <section data-theme="light">
    ...
  </section>
</body>
```

### 2. Typography

-   **Scale**: Font sizes are based on a base size (`--font-size-base: 17px`) and a scaling factor (`--scale`), which changes at different breakpoints.
-   **Size Levels**: Variables are defined for various text levels: `body-sm`, `base`, `h3`, `h2`, `title`, `hero`.
-   **Fonts**: The primary font is `Inter`, loaded in `fonts.css`. Stacks are defined for different text types (`--font-family-sans`, `--font-family-mono`).
-   **Quotes in `font-family`**: Font names containing spaces or characters (other than hyphens) should be enclosed in quotes. System keywords (`serif`, `sans-serif`) and prefixed fonts (`-apple-system`) are not quoted.

### 3. Spacing and Rhythm

-   **Vertical Rhythm**: Based on the relative unit `rlh` (line-height unit). The `--lh` variable equals `1rlh` (`1.5rem` as a fallback).
-   **Dimensional Scale**: A set of `--dim-*` variables (e.g., `--dim-1: calc(var(--lh) / 3)`) is used to create a consistent system for margins, padding, and sizes.

### 4. Shape and Elevation

-   **Border Radii**: A set of variables from `--radius-xs` to `--radius-pill`.
-   **Shadows**: Three levels of shadows (`--shadow-z1`, `--shadow-z2`, `--shadow-z3`) to create a sense of depth.
-   **Z-index Layers**: A set of `z-index` values is provided for managing interface layers (`--z-sticky`, `--z-modal`, etc.). A `<dialog>` element opened modally does not require a `z-index` as it automatically moves to the top layer.

### 5. Animation (Motion)

-   **Duration**: A scale of variables from `--duration-50` (70ms) to `--duration-600` (1s) for different types of animations.
-   **Easing Functions**: A set of `cubic-bezier` functions for various scenarios (`--easing-base`, `--easing-appearance`, etc.).

## Global Styles (`reset.css`, `doc.css`)

-   **`reset.css`**: Resets default browser styles. Manages focus states, making them visible only during keyboard navigation (`:focus-visible`).
-   **`doc.css`**: Applies base styles to `<html>` and `<body>`, such as font smoothing, `color-scheme`, primary background, and text color. Includes custom scrollbar styles and support for View Transitions.

## Media Queries (`custom.css`)

The `custom.css` file contains all `@custom-media` queries.

-   **Breakpoints**: Main points for responsiveness are defined (`--phone`, `--tablet`, `--laptop`).
-   **Special Tablet Logic**: The `--tablet` media query includes an additional condition `not (pointer: coarse) and (orientation: landscape)` to prevent tablet styles from applying to high-resolution phones in landscape orientation.
-   **Device Capabilities**: Queries for detecting pointer type (`--touch`, `--mouse`), hover support (`--can-hover`), and color scheme (`--dark`).

## Mixins (`mixins.css`)

This file defines a set of PostCSS mixins for style reuse.

-   `@mixin text-format $level`: Applies a set of typographic styles (size, weight, letter-spacing, line-height) for a given level.
-   `@mixin line-clamp $rows`: Limits text to a specified number of lines.
-   `@mixin state-focus`: Applies styles for `:focus-visible`.

## Utilities (`utils/`)

This directory contains utility classes for quickly managing spacing, display, color, etc., directly in HTML. More details can be found in the `README.md` file within this folder.