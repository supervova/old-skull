# Меню

## Разметка

```html
<nav>
  <ul class="menu">
    <li><a class="menu-link" href="#">
      <span class="menu-label">Menu Item</span>
    </a></li>
    <li><a class="menu-link" href="#">
      <span class="menu-label">Menu Item</span>
    </a></li>
    <li><a class="menu-link" href="#">
      <span class="menu-label">Menu Item</span>
    </a></li>
  </ul>
</nav>
```

Атрибуты `role` использовать только в том случае, если меню почему-то не обёрнуто тегом `nav`.

```html
<ul role="menu" aria-label="Lorem Ipsum">
  <li role="none">
    <a href="#" role="menuitem">
      <span class="label">Menu Item</span>
    </a>
  </li>
  <li role="none">
    <a href="#" role="menuitem">
      <span class="label">Menu Item</span>
    </a>
  </li>
  <li role="none">
    <a href="#" role="menuitem">
      <span class="label">Menu Item</span>
    </a>
  </li>
</ul>
```

## Управление фокусом

Отличный пример задачи, который можно поручить LLM.

Для нескрываемых элементов, нуждающихся в фокусе, но не фокусируемых по умолчанию — например, кликабельных `li` — устанавливается tabindex: `0`.

Для скрытых интерактивных элементов устанавливается tabindex: `-1`. Причем атрибут назначается не только элементам без «врожденной» фокусировки но и фокусируемым, вроде `<a>`.

```html
<li><a href="#" tabindex="-1">
  <span class="label">Menu Item</span>
</a></li>
```

При открытии виджета, в котором такие элементы содержатся — модальное окно, выпадающее или контекстное меню — первый из таких элементов, который должен попасть в фокус, меняет значение атрибута `tabindex` на `0`.

Затем значения меняются по нажатию клавиш-стрелок:

- у элемента, который был в фокусе последним `tabindex` становится равным `-1`;
- у следующего в очереди на фокус `tabindex` становится равным `0`;
- вместе с изменением `tabindex`'а на этом элементе вызывается метод
  `element.focus()`.

Впрочем, при открытии скрываемых виджетов фокус может переводиться и на фокусируемого по умолчанию потомка:

```js
function openDialog() {
  const modal = document.getElementById('modal');
  const firstInput = modal.querySelector('input[type="text"]');
  modal.classList.add('is-open');
  firstInput.focus();
}
```

При закрытии виджетов «по требованию» следует возвращать фокус на элемент их открывший: `.focus()`.

## Роль радиокнопок

```html
<li>
  <ul role="group" data-option="font-color" aria-label="Text Color">
    <li role="menuitemradio" aria-checked="true">Black</li>
    <li role="menuitemradio" aria-checked="false">Blue</li>
    <li role="menuitemradio" aria-checked="false">Red</li>
    <li role="menuitemradio" aria-checked="false">Green</li>
  </ul>
</li>
```
