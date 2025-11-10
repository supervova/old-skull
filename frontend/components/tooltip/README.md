# Tooltip

## Rich tooltip

Rich tooltip with HTML support inside bubble: `<br>`, `<b>`, `<a>`.

Usage:

```html
<span class="tooltip-rich">
  <button aria-describedby="my-tooltip">Tooltip trigger</button>
  <span class="tooltip-bubble" id="my-tooltip" role="tooltip">
    Text with markup<br /><b>Note:</b> links are supported —
    <a href="#">read more</a>
  </span>
</span>
```

Modifiers:

- `.tooltip-bottom` — position below trigger (default on mobile for side variants)
- `.tooltip-left` — position on left side (desktop/tablet)
- `.tooltip-right` — position on right side (desktop/tablet)
