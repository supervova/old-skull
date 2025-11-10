# Стили макета

## Базовая разметка

Don't use .wrapper. Use CSS grid.

```html
<header class="header"></header>
<main class="main">
  <article class="content">
    <header>
      <p class="eyebrow"></p>
      <h1></h1>
    </header>
    <h2></h2>
    <p></p>
    <div class="scroller"></div>
    <p></p>
    <div class="content__full-width">
      <div class="media-border">
        <img />
      </div>
    </div>
    <p></p>
  </article>

  <!-- Optional -->
  <aside class="sidebar"></aside>
  <nav class="navbar"></nav>
  <footer class="footer"></footer>
</main>
```

## Разметка разделов

```html
<div class="section">
  <div class="container grid"></div>
</div>
```

## Сетка

Основывается на CSS-свойстве `grid`. В основе лежат решения Bootstrap 5.

### Пример разметки

```html
<div class="grid">
  <div class="col-1/2 tablet:col-1/3 col-start-1"></div>
  <div class="col-1/4"></div>
</div>
```

### Переменные

Количество колонок, рядов и ширина пробелов определяется в переменных `--grid-columns`, `--grid-rows`, и `--grid-gap`. В них не установлено значение по умолчанию, но заданы резервные значения (fallback).

Значение переменных наследуется вложенными сетками. Но их можно изменить на любом уровне вложенности или в модификации. Например.

```css
.phone\:grid-3 { --columns: 3; }
```

### Пробелы

По умолчанию, одинаковые по вертикали или горизонтали. Чтобы задать разные, можно использовать свойства `row-gap` и `column-gap` или раздельные значения в переменной.

```css
--gap: var(--dim-4) var(--lh);
```

### Отступы

То, что ранее решалось с помощью классов `offset-` в grid-сетке решается с помощью классов `col-start-`. В них указывается не расстояние от предыдущего элемента или границы родителя, а номер родительской колонки, по которой выравнивается элемент.

### Использование классов сетки с семантическими классами

Рекомендуется для быстрой разработки. Хотя противоречит принципам OOCSS, но сокращает количество «обёрток».

```html
<div class="hero__content grid">
  <figure class="hero__picture tablet:col-1/2"></figure>
  <div class="hero__copy tablet:col-1/2"></div>
</div>
```

Но есть решение лучше — использование инклудов или «молчаливых» селекторов и `grid-column` в семантических классах. Так можно менять ширину компонентов в разных проектах, не меняя разметку.

```css
.hero { @include grid(); }

.hero__picture,
.hero__copy { grid-column: auto/span 6; }
```

```html
<div class="hero__content">
  <figure class="hero__picture"></figure>
  <div class="hero__copy"></div>
</div>
```

### Произвольные координаты и размеры блоков

Координатами колонок и строк, можно изменять положение блока в макете — то, что во flex делает свойство `order`;

```scss
.main {
  grid-column: 4/13;
  grid-row: 2/4;
}
```

### Неявные колонки

Прямые потомки элемента `grid` распределяются по сетке, без необходимости указания специальных классов. Но каждый занимает только одну колонку.

```html
<div class="grid" style="--columns: 3;">
  <div>Auto-column</div>
  <div>Auto-column</div>
  <div>Auto-column</div>
</div>
```

### Изображения в сетке

Изображениям, вписанным в сетку, назначается `object-fit: cover`.
