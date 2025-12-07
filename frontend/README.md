# Old SKULL CSS <Badge type="tip" text="v0.1.0" />

<p style="font-size: 120%">A Tailwind-free CSS framework, powered by LLM assistants</p>

## Быстрый старт

Скопируйте весь репозиторий и используйте, его, как шаблон проекта.

```sh
git clone https://github.com/supervova/old-skull.git
```

- Подключайте и отключайте необходимые файлы в `frontend/main.css`.
- Меняйте значения в `frontend/theme/vars?*.css`.
- Переписывайте общие стили и стили компонентов – если вы знаете CSS, не надо ограничивать себя рамками переменных и overrid'ов. CSS – это одна из самых творческих областей в IT-разработке.

### Подключение готовой сборки

Если времени совсем нет, используйте готовое.

```sh
npm i old-skull
```

```html
<link rel="stylesheet" href="node_modules/old-skull/dist/main.css">
<style>
  /* Но хотя бы настройте цвета */
  :root {
    --h-blue: 211;
    --h-red: 355;
    --h-yellow: 48;
    --h-green: 135;

    --h: var(--h-blue);
    --s-base: 80%;
    --l: 50%;
  }
<style>
```

## Характеристики

- CSS+PostCSS, [PurgeCSS](purge-css.md) и [NextJS/Vite/Gulp](../../more/chore/gulp-vite-npm-scripts.md)
- CSS-переменные
- Class-light. стиль именования [`.comp-child-mod`](comp-modifier-vs-has-is.md)
- [@scope](base/scope.md) и [@layer](base/cascade-layers.md)
- [`:is`, `:has`, `:where`](base/use-new-features-for-cleaner-css.md)
- [`image-set()`, `field-sizing: content`, `:user-invalid`, `transition-behavior: allow-discrete`](20s-new-features.md) и пр. полезные штучки
- пользовательские медиазапросы и новый синтаксис диапазонов
- отказ от [Tailwind](tailwind/01-tailwind-vs-custom-framework.md), [CSS-модулей](../react/02-styling/02-css-modules.md), [БЭМ](base/cascade-layers-instead-bem.md) и пр. «изоляционистских» подходов
- рефакторинг с Gemini/Claude.

- HTML `dialog`, `details`, `datalist`, `[type='date']`
- Prompt-to-Snippets Collection

## Структура

TODO: Скопировать из `docs/notes.md` и удалить пока неготовые папки и комментарии к ним.

## LSD (Layer-Scope-DOM) — селекторы

- Используйте `@scope`.
- Внутри `@scope` — селекторы потомков. Там, где можно использовать теги — лучше использовать теги (DOM в аббревиатуре LSD). Там где тегов не хватает. используйте классы вида `comp-child-mod`.

```css
/* Article scope  */
@scope (article) to (.comments) {
  h2 {
    --font-size: var(--font-size-title);
  }
}

/* Comments scope */
@scope (.comments) {
  /* h2 keeps default values */
  .avatar {
    width: var(--dim-4);
  }
}

/* Accordion scope */
@scope (.accordion) {
  summary {
    --font-size: var(--font-size-h3);
  }

  .accordion-body {
    padding: var(--lh);
  }
}

/* Navbar scope  */
@scope (.navbar) {
  ul {
    list-style: none;
  }

  li {
    padding: 0;
  }

  a {
    text-decoration: none;
  }
}
```

Для модификаторов используем CSS-свойства.

```css
.btn {
  --btn-bg: var(--color-fill);
  --btn-color: var(--color-text-02);
  --btn-font-weight: 500;
  --btn-height: var(--dim-6);
  --btn-padding-x: var(--dim-2p5);
  --btn-padding-y: 0;
  --btn-radius: var(--radius-base);

  background-color: var(--btn-bg);
  border-radius: var(--btn-radius);
  color: var(--btn-color);
  display: inline-flex;
  align-items: center;
  gap: var(--dim-1);
  justify-content: center;
  font-weight: var(--btn-font-weight);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  text-decoration: none;
  transition: background-color var(--duration-50) var(--duration-50);
  height: var(--btn-height);

  &:hover {
    background-color: var(
      --btn-bg-hover,
      color-mix(in oklch, var(--btn-bg) 95%, hsl(var(--h) var(--s) 99%))
    );
  }
}

.btn-primary {
  --btn-bg: var(--color-brand);
  --btn-bg-hover: var(--color-brand-600);
  --btn-color: var(--color-text-inverse);
}

.btn-ghost {
  --btn-bg: transparent;
}

.btn-icon {
  --btn-padding-x': 0;
  width: var(--btn-height);
}
```

## PostCSS

В списке плагинов PostCSS важен порядок. `postcss-mixins` должен идти после `postss-import` и `postcss-simple-vars`, но раньше `postcss-nesting`, `custom-*` и `preset-env`, чтобы корректно раскрывать миксины до дальнейших трансформаций.

```jsonc
// package.json
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
        "is-pseudo-class": false,
        "cascade-layers": false,
        "case-insensitive-attributes": false
      }
    },
    "postcss-pxtorem": {
      "rootValue": 16,
      "propList": [
        "font",
        "font-size",
        "line-height",
        "letter-spacing",
        "word-spacing",
        "margin*",
        "padding*",
        "--font-size*",
        "--letter-spacing*",
        "--padding-top*",
        "--padding-bottom*",
        "--dim*"
      ],
      "selectorBlackList": [],
      "exclude": null,
      "mediaQuery": false,
      "minPixelValue": 0
    },
    "postcss-calc": {},
    "postcss-discard-comments": {}
  }
},
```

## Альтернатива современным CSS для устаревших браузеров

Надежного PostCSS-плагина для `@scope` нет, поэтому если вам важны пользователи Firefox и старых версий остальных браузеров, заведите дополнительный файл `legacy.css`, в котором перепишите стили проблемных компонентов по-старинке. Например, стили компонентов с потомками – `.hero`, `.card` etc – без `@scope`\`:scope`.

```css
.comp {
  /* base */
}
.comp .comp-icon {
  /* child */
}
```

Затем, добавьте их в `head` в JS с проверкой поддержки.

```html
<script>
  if (!CSS.supports('selector(:scope)')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'legacy.css';
    document.head.appendChild(link);
  }
</script>
<link rel="stylesheet" href="main.css" />
```

## Нейминг классов

### 1. Три типа классов

1. **Компонент**:
   `.btn`, `.alert`, `.tooltip`, `.modal`, `.nav`, `.tabs`, `.table`, `.form`, `.grid` etc.

2. **Дочерний элемент**, потомок компонента, который не может существовать отдельно:
   - `.nav-list`, `.nav-item`, `.nav-link`
   - `.tabs-list`, `.tabs-tab`, `.tabs-panel`
   - `.table-row`, `.table-cell`, `.table-head`, `.table-body`
   - `.form-field`, `.form-label`, `.form-control`, `.form-hint`, `.form-error`, `.form-float`, `.form-textarea`, `.form-select`
   - `.grid-item`

3. **Вариант компонента/элемента (modifier)** – какой он
   - `.btn-primary`, `.alert-error`, `.tooltip-bottom`, `.tabs-pill`
   - `.nav-horizontal`, `.nav-vertical`, `.nav-inline`, `.nav-item-icon`, `.nav-item-badge`
   - `.table-striped`, `.table-hover`, `.table-bordered`, `.table-compact`, `.table-fixed`, `.table-cell-num`
   - `.form-inline`, `.form-field-compact`
   - `.grid-12`, `.grid-6`, `.grid-auto`, `.grid-gap-sm`, `.grid-gap-md`, `.grid-gap-lg`, `.grid-align-center`, `.grid-align-stretch`, `.grid-item-span-3`, `.grid-item-span-4`, `.grid-item-span-6`, `.grid-item-start-2`, `.grid-item-start-4`

4. **Состояние (state)** – что с компонентом/элементом сейчас
   - `.btn.is-loading`, `.alert.is-hidden`, `.modal.is-open`, `.page.has-modal`
   - `.nav-item.is-active`, `.nav-item.is-disabled`, `.nav-item.is-hidden`, `.nav-item.is-expanded`, `.nav.has-open-dropdown`, `.nav.has-active-item`
   - `.tabs-tab.is-selected`, `.tabs-tab.is-disabled`, `.tabs-panel.is-active`, `.tabs.has-scroll-shadow`
   - `.table-row.is-selected`, `.table-row.is-hovered`, `.table-row.is-expanded`, `.table-cell.is-sorted`, `.table-cell.is-updated`, `.table.has-selection`, `.table.has-updated-rows`
   - `.form-field.is-invalid`, `.form-field.is-valid`, `.form-field.is-disabled`, `.form-field.is-focused`, `.form-field.is-touched`, `.form.has-error`, `.form.has-submitted`

### 2. Варианты: `block-modifier`

**Когда:** вариант внешнего вида / роли, заданный дизайном и разметкой. Не меняется «сам по себе» в рантайме без явного решения.

```css
.btn-primary {}
.btn-secondary {}
.btn-ghost {}

.alert-error {}
.alert-success {}
.alert-warning {}

.tooltip-top {}
.tooltip-bottom {}
.tooltip-inline {}

.card-compact {}
.card-elevated {}
```

❌ Не использовать `is-` для таких вещей:
`.alert.is-error` – это не состояние, а тип.

### 3. Состояния элемента: `.is-*`

**Когда:** то, что может включиться / выключиться во время работы UI.

```css
.btn.is-loading {}
.btn.is-active {}
.btn.is-disabled {}

.modal.is-open {}
.dropdown.is-open {}

.field.is-invalid {}
.tab.is-selected {}
.accordion-item.is-expanded {}
```

- `is-open`, `is-closed`
- `is-active`, `is-inactive`
- `is-selected`
- `is-loading`
- `is-disabled`
- `is-invalid`
- `is-focused`
- `is-sticky`

### 4. Состояние родителя: `.has-*`

**Когда:** родитель меняет стиль из-за содержимого / дочернего компонента.

```css
body.has-modal { overflow: hidden; }
.form.has-error {}
.nav.has-dropdown-open {}
```

- `has-modal`
- `has-error`
- `has-selection`
- `has-icon`
- `has-unread`

### 5. Как комбинировать

```html
<button class="btn btn-primary is-loading">Save</button>
```

- `btn` – базовый компонент
- `btn-primary` – вариант
- `is-loading` – состояние

```html
<div class="alert alert-error is-hidden">...</div>
```

```html
<body class="has-modal">
  <dialog class="modal is-open">...</dialog>
</body>
```

### 6. Что считать чем

**Вариант (modifier, `-`)** – если можно задать вопрос:

> «_Какой это компонент?_»
> Ответ: _primary_, _error_, _compact_, _bottom_.

**Состояние (`.is-*`)** – если можно задать вопрос:

> «_Что сейчас с компонентом происходит?_»
> Ответ: _открыт_, _выбран_, _заблокирован_, _в процессе_.

**Состояние родителя (`.has-*`)** – если важно:

> «_Что внутри / с дочерними элементами?_»
> Ответ: _есть модалка_, _есть ошибки_, _есть иконка_.

### 7. Мини-шпаргалка

Хорошо:

```css
.alert.alert-error .menu-item.is-active .tooltip.tooltip-bottom .modal.is-open body.has-modal .accordion-header-hgroup;
```

Плохо / путанно:

```css
.alert.is-error /* тип, а не состояние */
.tooltip.is-bottom /* позиция, а не состояние */
.accordion-header.has-hgroup /* вариант, а не состояние */
body.is-modal-open; /* лучше has-modal */
```
