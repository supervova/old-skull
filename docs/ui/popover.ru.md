# Всплывающие панели

## Разметка

```html
<!-- Menu (dropdown) -->
<details class="popover" data-role="popover">
  <summary></summary>

  <ul class="popover__body menu">
    <li><a class="menu__link" href="">Menu Item</a></li>
    <li><a class="menu__link" href="">Menu Item</a></li>
    <li><a class="menu__link" href="">Menu Item</a></li>
  </ul>
</details>

<!-- Tiny form -->
<details class="popover" data-role="popover">
  <summary>Toggle</summary>

  <div class="popover__body">
    <p>
      <label for="popover-title">Event Title</label>
      <input id="popover-title" name="title" type="text">
    </p>
    <p>
      <label for="popover-files">Attaching files…</label>
      <input id="popover-files" type="file" multiple>
    </p>
    <footer class="buttons">
      <button type="reset">Cancel</button>
      <button type="button">Delete</button>
      <button type="button">OK</button>
    </footer>
  </div>
</details>

<!-- Hint -->
<details class="popover" data-role="popover">
  <summary>Toggle</summary>

  <div class="popover__body">
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>Consectetur adipisicing elit. Beatae reiciendis atque nobis, non laboriosam labore sapiente cumque architecto itaque, sunt cum, in fugit voluptas doloremque sint explicabo vero similique incidunt.</p>
  </div>
</details>
```

Для тех панелей, которые предполагают менять поведение в зависимости от экрана, предусмотрена разметка другими тегами. В скрипте `popover.js` есть соответствующая логика.

```html
<div class="popover" data-role="popover">
  <h3 data-role="popover-summary">Еще</h3>
  <div class="popover__body">
    Содержание
  </div>
</div>
```

## Доступность

У большинства семантических HTML-тегов есть встроенные роли по умолчанию. В том числе у пары, используемой для «раскрывашек».

- `details` выполняет роль `group`.
- `summary` — `button`.

Дополнительные `aria`-атрибуты — включая `aria-hidden` — не нужны. Хотя Github использует в своих выпадающих меню `summary(aria-haspopup='menu')`.

Для разметки `div'ами` и пр. скрипт добавляет нужные атрибуты и меняет их значение.
