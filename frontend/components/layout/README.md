# Layout Styles

## Basic Markup

```html
<header class="header">…</header>
<main class="main">
  <article class="prose">
    <header>
      <p class="eyebrow">…</p>
      <h1>…</h1>
    </header>
    <h2>…</h2>
    <p>…</p>
    <div class="scroll-x">
      <table>…</table>
    </div>
    <p>…</p>
    <section class="width-full-bleed" aria-label="Benefits">
      <figure class="media-border">
        <img />
      </figure>
    </section>
    <p></p>
  </article>
</main>

<aside class="sidebar"><!-- Optional --></aside>
<nav class="sidenav">…</nav>
<footer class="footer">…</footer>
```

## Section Markup

```html
<div class="section">
  <div class="container">
    <div class="grid"><!-- Optional --></div>
  </div>
</div>
```

## Grid

Based on the CSS `grid` property.

### Example Markup

```html
<div class="grid">
  <div class="col-1/2 tablet:col-1/3 col-start-1"></div>
  <div class="col-1/4"></div>
</div>
```

### Variables

The number of columns, rows, and the width of gaps are defined in the `--grid-columns`, `--grid-rows`, and `--grid-gap` variables. They do not have a default value set, but they do have fallback values.

The value of the variables is inherited by nested grids. But they can be changed at any level of nesting or in a modification. For example.

```css
.phone\:grid-3 { --columns: 3; }
```

### Gaps

By default, gaps are the same vertically or horizontally. To set different gaps, you can use the `row-gap` and `column-gap` properties or separate values in the variable.

```css
--grid-gap: var(--dim-4) var(--lh);
```

### Offsets

Offsets are set with `col-start-` classes. They specify the column number of the parent grid to which the element is aligned.

### Using Grid Classes with Semantic Classes

If you value minimalistic markup over OOCSS.

```html
<div class="hero-content grid">
  <figure class="hero-picture tablet:col-1/2"></figure>
  <div class="hero-copy tablet:col-1/2"></div>
</div>
```

### Arbitrary Block Coordinates and Sizes

You can change the position of a block in the layout using column and row coordinates.

```scss
.main {
  grid-column: 4/13;
  grid-row: 2/4;
}
```

### Implicit Columns

Direct children of a `grid` element, starting from a screen width > 568px (the `phone-l` breakpoint, a phone in landscape orientation), are distributed in the grid without the need for special classes. But each occupies only one column.

```html
<div class="grid">
  <div>Auto-column</div>
  <div>Auto-column</div>
  <div>Auto-column</div>
</div>
```

### Images in the Grid

To stretch an image to the size of its cell, assign it `object-fit: cover`.