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

```pug
article.card
  header
    //- Optionally: .eyebrow
    h3 10 Ways to Save Money
  .card-body
    p Expert financial tips for everyday life.
  //- Optionally: footer or time
```

### Section

```pug
section.card
  header
    h3 Your current plan
  //- .card-body is optional container
  p Pro — active until 2025-12-12
```

### Div

```pug
div.card
  figure
    img(src='thumbnail.jpg' alt='Preview')
  p Description goes here.
```

## Using Microdata

```pug
article.card(itemscope itemtype='https://schema.org/Product')
  img(src='' alt='' itemprop='image')
  h3(itemprop='name')
    a.card-link(href='/example.html' itemprop='url') Game
  p.card-price(itemprop='offers' itemscope itemtype='https://schema.org/Offer')
    meta(itemprop='priceCurrency' content='USD')
    span(itemprop='price') 10
```
