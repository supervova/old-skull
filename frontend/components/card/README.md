# 🗂️ Card

A **Card** is a flexible and reusable UI container used to group related information. It commonly includes content such as a **title**, **image**, **summary**, **action buttons**, and optionally **metadata**. Cards are ideal for presenting information in a modular, scannable, and responsive format.

Cards help:

- visually separate different types of content,
- enhance readability and hierarchy,
- provide quick actions or entry points.

They are often used in **grids, feeds, dashboards, and previews**.

## ✅ Choosing Between `<article>`, `<section>`, and `<div>` for a Card Component

| Tag       | Use when...                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `article` | Standalone content (news, review, product) that could be **distributed or read independently** (e.g. a post, product, review). |
| `section` | Thematic block (settings, dashboard) of a larger section.                                                                      |
| `div`     | The card is **purely visual**, without semantic value — used for **layout or styling only**.                                   |

### Article

```html
<article class="card">
  <header>
    <!-- Optionally: .eyebrow -->
    <h3>10 Ways to Save Money</h3>
  </header>
  <div class="card-body">
    <p>Expert financial tips for everyday life.</p>
  </div>
  <!-- Optionally: footer or time -->
</article>
```

### Section

```html
<section class="card">
  <header>
    <h3>Your current plan</h3>
  </header>
  <!-- .card-body is optional container -->
  <p>Pro — active until 2025-12-12</p>
</section>
```

### Div

```html
<div class="card">
  <figure>
    <img src="thumbnail.jpg" alt="Preview" />
  </figure>
  <p>Description goes here.</p>
</div>
```

## Using Microdata

```html
<article class="card" itemscope itemtype="https://schema.org/Product">
  <img src="" alt="" itemprop="image" />
  <h3 itemprop="name">
    <a class="card-link" href="/example.html" itemprop="url">Game</a>
  </h3>
  <p class="card-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <meta itemprop="priceCurrency" content="USD" />
    <span itemprop="price">10</span>
  </p>
</article>
```
