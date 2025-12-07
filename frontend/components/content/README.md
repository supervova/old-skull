# Content Styles

Styles for formatting the main content: text, lists, images, tables, etc.

## Headings and Text

- Headings `h1-h6` and paragraphs `p` automatically balance line breaks (`text-wrap: balance`).
- For small text above a heading (rubric, tag, sub-headline), the `.eyebrow` class is used.
- Links `<a>` are styled taking into account `:hover`, `:focus-visible`, and `:active` states. The `[aria-current]` attribute highlights the active link.
- Standard tags `<strong>`, `<em>`, and `<mark>` are used for highlighting. The `<ins>` tag is used to denote added text and is highlighted in green with plus signs.

## Lists

- **Unordered lists `<ul>`** have custom markers.
- **Ordered lists `<ol>`** use custom counters.
- **Description lists `<dl>`** are displayed as a two-column grid on larger screens.
- **Helper classes**:
  - `.list-unstyled`: removes markers and indents.
  - `.list-inline`: displays list items in a single line.

## Quotes

The `<blockquote>` tag is styled as a large, centered quote with decorative quotation marks.

## Code

- **Inline elements**:
  - `<code>`: for code fragments, highlighted with a background.
  - `<kbd>`: for key indications, styled like a button.
  - `<samp>`: for program output examples, highlighted with a left border.
- **Block element `<pre>`**: used for code blocks, has a background, internal padding, and horizontal scrolling on overflow.

## Media

- `figure` and `figcaption` are used for image captions.
- `.media-border`: adds rounded corners and a translucent border that overlays the content of `<img>` or `<iframe>`.
- `.figure-wide`: allows an image or figure to extend beyond the main text column, occupying a greater width.

## Tables

### Markup

```html
<div class="scroll-x" role="region" tabindex="0" aria-labelledby="caption-01">
  <table class="table-hover">
    <caption id="caption-01">Table Heading</caption>
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Miguel de Cervantes</td>
        <td>Don Quixote</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Key Points

- **Horizontal scrolling**: Wrap the table in `<div class="scroll-x">` to enable scrolling on small screens.
- **Row highlighting**: Add the `.table-hover` class to `<table>` for rows to highlight on hover.
- **Cell width**: To prevent cell collapsing, it is recommended to specify the width for at least one cell in each column. This can be done using utility classes, for example, `.w-1/3`. You can also create your own classes for cells and define their width. For example, `.table-cell-num { width: 12% }`. Width can also be defined for `<col>` elements, but their styling is not supported by Safari version 26 and below.
- **Sorting**: The sort button should only appear in the active column.
- **Fixed width**: `table-layout: fixed` speeds up table rendering by basing column widths on `<col>` tags or the cells of the first row. However, it does not take into account cell content when calculating their width.
