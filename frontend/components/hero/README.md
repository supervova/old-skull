# Hero

A hero is a prominent UI section at the top of a page, typically featuring a headline, supporting text, and a call-to-action to capture user attention and convey the main message.

Usage:

```html
<section class="hero">
  <div class="container">
    <figure class="hero-image"><!-- Main image --></figure>
    <div class="hero-content">
      <h1><!-- Title --></h1>
      <p><!-- Lead / Intro / Summary --></p>
      <div class="grid grid-max-content"><!-- Buttons --></div>
    </div>
  </div>
</section>
```

Avoid using `<header>` inside `<main>` unless it contains navigation or metadata. For visual hero sections, prefer `<section>` to preserve semantic clarity.
