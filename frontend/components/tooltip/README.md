# Tooltip

## Rich tooltip

Rich tooltip with HTML support inside bubble: `<br>`, `<b>`, `<a>`.

Usage:

```pug
span.tooltip-rich
  button(aria-describedby='my-tooltip') Tooltip trigger
  span.tooltip-bubble#my-tooltip(role='tooltip')
    | Text with markup<br><b>Note:</b> links are supported —
    a(href='#') read more
```

Modifiers:

- `.tooltip-bottom` — position below trigger (default on mobile for side variants)
- `.tooltip-left` — position on left side (desktop/tablet)
- `.tooltip-right` — position on right side (desktop/tablet)
