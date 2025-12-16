# Old Skull CSS Framework

<p style="font-size: 1.2rem; opacity: 0.8;">A Tailwind-free CSS framework, designed to work with LLM assistants.</p>

**Old Skull CSS** is an architecture and toolset for creating modern, scalable, and easily maintainable web interfaces. The framework is designed to maximize the use of native CSS capabilities, avoiding excessive abstractions and keeping the code clean and semantic.

## Key Principles

1. **Class-Light and Semantics**: We prefer to style HTML tags directly within isolated components (`@scope`), using classes only for modifiers and states. This makes markup cleaner and styles more predictable.
2. **Modern CSS**: The framework actively uses the latest CSS features, such as `@scope`, `@layer`, `:has()`, `:is()`, logical properties, and View Transitions, to write more declarative and powerful code.
3. **PostCSS for Convenience**: PostCSS is used to extend the standard CSS syntax, adding support for nesting, mixins, and custom media queries.
4. **Simplicity and Abstraction Avoidance**: We have deliberately moved away from complex methodologies like BEM and CSS-in-JS in favor of a direct and clear approach based on native browser capabilities.

## Quick Start

### 1. Using as a Template

The best way to start is to clone the repository and use it as a foundation for your project.

```sh
git clone https://github.com/supervova/old-skull.git
```

After cloning, you can:

- Enable and disable components in `frontend/main.css`.
- Configure design tokens (colors, fonts, spacing) in `frontend/styles/vars-*.css` files.
- Freely modify component styles. The framework does not limit you, but rather provides a solid foundation.

### 2. Including a Pre-built Package

For quick integration, you can include the already built CSS file via npm.

```sh
npm i old-skull
```

Then link the styles in your HTML and override base colors:

```html
<link rel="stylesheet" href="node_modules/old-skull/dist/main.css">
<style>
  :root {
    --h-blue: 211;
    --h-red: 355;
    --h: var(--h-blue);
    --s-base: 80%;
    --l: 50%;
  }
<style>
```

## Project Structure

The project has a well-thought-out structure where each directory fulfills a specific role.

```text
/
├─ docs/
├─ example/
├─ frontend/
│  ├─ components/
│  ├─ data/
│  ├─ lib/
│  ├─ pages/
│  ├─ sandbox/
│  ├─ styles/
│  ├─ vendors/
│  ├─ main.css
│  └─ main.js
├─ public/
├─ scripts/
└─ package.json
```

- **`frontend/`**: The root folder for all frontend code.
- **`styles/`**: The core of the design system. It contains CSS variables (design tokens), global styles, resets, and mixins. See [README in `styles/`](./styles/README.md) for more details.
- **`components/`**: Reusable UI components (buttons, cards, modals). Each component resides in its own folder, following a feature-based approach.
- **`pages/`**: Styles specific to individual pages or sections of the site.
- **`lib/`**: Helper JavaScript functions and utilities (e.g., for DOM manipulation).
- **`data/`**: Static or mock data (JSON files, fixtures).
- **`vendors/`**: Third-party libraries and plugins that are not installed via npm.
- **`sandbox/`**: A "sandbox" for CSS experiments, ignored by Git by default.
- **`main.css`**: The main stylesheet that imports all other parts (`styles`, `components`, `utils`) and distributes them across cascade layers (`@layer`).
- **`example/`**: A demo page showcasing all components in action.
- **`docs/`**: Project documentation: architectural decisions, guides, checklists.
- **`public/`**: Static assets (favicons, `robots.txt`, `manifest.json`).
- **`scripts/`**: Automation scripts (build, linting, generators).

## CSS Architecture and Naming

### LSD Methodology (Layer → Scope → DOM)

1. **Layer**: Specificity is managed through cascade layers defined in `main.css` (`base`, `components`, `utils`). This avoids specificity conflicts and the use of `!important`.
2. **Scope**: Component styles are encapsulated using `@scope`. This is another tool for preventing style conflicts.
3. **DOM (Document Structure)**: Within `@scope`, we prefer to style HTML tags directly (`h2`, `summary`, `footer`). This makes the markup cleaner and more semantic. Classes are used only for child elements that cannot be uniquely styled via a tag, or for creating variations.

```css
@scope (.card) {
  /* Styles for the root element .card */
  :scope {
    background: var(--card-bg);
    /* ... */
  }

  /* Styling child tags */
  header {
    /* ... */
  }

  h3 {
    /* ... */
  }

  /* Styling a child element by class */
  .card-body {
    /* ... */
  }
}
```

### Class Naming System

Class naming follows clear rules to reflect their purpose.

#### 1. Component Classes

Define an independent, reusable UI block.
_Examples:_ `.btn`, `.alert`, `.card`, `.modal`, `.tabs`

#### 2. Child Elements

Used for elements that are part of a component and do not exist independently.
_Examples:_ `.nav-item`, `.tabs-panel`, `.table-row`, `.form-label`

#### 3. Modifiers (`block-modifier`)

Define the appearance or variation of a component. Answer the question: "**What kind** of component is it?".
_Examples:_ `.btn-primary`, `.alert-error`, `.tooltip-bottom`

Modifiers typically do not add new CSS properties, but rather override CSS variable values defined in the base class.

```css
.btn {
  --btn-bg: var(--color-fill);
  --btn-color: var(--color-text-02);
  background-color: var(--btn-bg);
  color: var(--btn-color);
  /* ... */
}

.btn-primary {
  --btn-bg: var(--color-brand);
  --btn-color: var(--color-text-inverse);
}
```

#### 4. State Classes (`.is-*`, `.has-*`)

Reflect dynamic states of a component during user interaction.

- **`.is-*`**: Describes the state of the element itself. Answers the question: "**What is currently happening** to the component?".
  _Examples:_ `.is-loading`, `.is-active`, `.is-open`, `.is-disabled`

- **`.has-*`**: Describes the state of a parent element that depends on its child elements. Answers the question: "**What is inside** the parent or what is happening with its child elements?".
  _Examples:_ `body.has-modal`, `.form.has-error`, `.nav.has-dropdown-open`

#### Combining Classes

```html
<!-- Component 'btn', variant 'primary', in 'loading' state -->
<button class="btn btn-primary is-loading">Save</button>

<!-- Parent 'body' has an open modal -->
<body class="has-modal">
  <!-- Component 'modal' in 'open' state -->
  <dialog class="modal is-open">...</dialog>
</body>
```

## Tools and Compatibility

### PostCSS

The project uses PostCSS to extend CSS capabilities. The order of plugins in `package.json` is important for correct compilation.

<details>
<summary>View PostCSS Configuration</summary>

```json
"postcss": {
  "plugins": {
    "postcss-import": {},
    "postcss-mixins": {},
    "postcss-custom-media": {},
    "postcss-custom-selectors": {},
    "postcss-nesting": {},
    "postcss-preset-env": {
      "stage": 2,
      "features": {
        "custom-properties": false,
        "is-pseudo-class": false
      }
    },
    "postcss-pxtorem": {},
    "postcss-calc": {},
    "postcss-discard-comments": {}
  }
}
```

</details>

### Compatibility with Older Browsers

For supporting browsers incompatible with `@scope` (e.g., Firefox before version 127), a fallback mechanism is provided.

1. Create a `legacy.css` file where styles for problematic components are rewritten using traditional selectors (e.g., `.card .card-title` instead of `@scope(.card) { h3 { ... } }`).
2. Include this file in the `<head>` with a small script that checks for `@scope` support.

```html
<script>
  if (!CSS.supports('selector(:scope)')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/legacy.css'; // Specify the correct path
    document.head.appendChild(link);
  }
</script>
<link rel="stylesheet" href="main.css" />
```
