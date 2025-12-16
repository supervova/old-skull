// ./scripts/postcss-rhythm.js
const postcss = require('postcss');

const SCALE_FACTORS = {
  MINOR_SECOND: 1.067,
  MAJOR_SECOND: 1.125,
  MINOR_THIRD: 1.2,
  MAJOR_THIRD: 1.25,
  PERFECT_FOURTH: 1.333,
  AUGMENTED_FOURTH: 1.414,
  PERFECT_FIFTH: 1.5,
  MINOR_SIXTH: 1.6,
  GOLDEN_SECTION: 1.618,
  MAJOR_SIXTH: 1.667,
  MINOR_SEVENTH: 1.778,
  MAJOR_SEVENTH: 1.875,
  OCTAVE: 2,
  MAJOR_TENTH: 2.5,
};

function round(number, digits = 0, mode = 'round') {
  const factor = 10 ** digits;
  const n = Number(number);

  if (Number.isNaN(n)) {
    return number;
  }

  if (mode === 'ceil') {
    return Math.ceil(n * factor) / factor;
  }

  if (mode === 'floor') {
    return Math.floor(n * factor) / factor;
  }

  return Math.round(n * factor) / factor;
}

function pxToRem(px, baseFont) {
  const n = Number(px);
  return `${round(n / baseFont, 5)}rem`;
}

function pow(base, exp) {
  return base ** exp;
}

function computeBody({ baseFontSizePx, baseLineHeight, unit }) {
  const fontPx = baseFontSizePx;
  const linePx = round(fontPx * baseLineHeight, 0, 'ceil');

  const decls = [];

  if (unit === 'px') {
    decls.push({ prop: 'font-size', value: `${fontPx}px` });
    decls.push({ prop: 'line-height', value: `${linePx}px` });
  } else if (unit === 'rem') {
    decls.push({ prop: 'font-size', value: pxToRem(fontPx, baseFontSizePx) });
    decls.push({ prop: 'line-height', value: pxToRem(linePx, baseFontSizePx) });
  } else if (unit === 'pxrem') {
    decls.push({ prop: 'font-size', value: `${fontPx}px` });
    decls.push({ prop: 'line-height', value: `${linePx}px` });
    decls.push({ prop: 'font-size', value: pxToRem(fontPx, baseFontSizePx) });
    decls.push({ prop: 'line-height', value: pxToRem(linePx, baseFontSizePx) });
  }

  return decls;
}

function computeHeading(step, options) {
  const {
    baseFontSizePx,
    baseLineHeight,
    baseFontSizeCopyPx,
    scaleFactor,
    unit,
  } = options;

  const base = baseFontSizeCopyPx;
  const scale =
    typeof scaleFactor === 'string'
      ? SCALE_FACTORS[scaleFactor] || SCALE_FACTORS.GOLDEN_SECTION
      : scaleFactor;

  const fontPx = round(base * pow(scale, step), 3);
  const baseLinePx = round(base * baseLineHeight, 3);

  const linesForLineHeight = Math.ceil(fontPx / baseLinePx);
  const linePx = round(linesForLineHeight * baseLinePx, 0, 'ceil');

  const linesForMargin = 1;
  const marginPx = round(linesForMargin * baseLinePx, 0, 'ceil');

  const decls = [];

  if (unit === 'px') {
    decls.push({ prop: 'font-size', value: `${fontPx}px` });
    decls.push({ prop: 'line-height', value: `${linePx}px` });
    decls.push({ prop: 'margin-top', value: `${marginPx}px` });
    decls.push({ prop: 'margin-bottom', value: `${marginPx}px` });
  } else if (unit === 'rem') {
    decls.push({ prop: 'font-size', value: pxToRem(fontPx, baseFontSizePx) });
    decls.push({ prop: 'line-height', value: pxToRem(linePx, baseFontSizePx) });
    decls.push({
      prop: 'margin-top',
      value: pxToRem(marginPx, baseFontSizePx),
    });
    decls.push({
      prop: 'margin-bottom',
      value: pxToRem(marginPx, baseFontSizePx),
    });
  } else if (unit === 'pxrem') {
    decls.push({ prop: 'font-size', value: `${fontPx}px` });
    decls.push({ prop: 'line-height', value: `${linePx}px` });
    decls.push({ prop: 'margin-top', value: `${marginPx}px` });
    decls.push({ prop: 'margin-bottom', value: `${marginPx}px` });

    const fontRem = pxToRem(fontPx, baseFontSizePx);
    const lineRem = pxToRem(linePx, baseFontSizePx);
    const marginRem = pxToRem(marginPx, baseFontSizePx);

    decls.push({ prop: 'font-size', value: fontRem });
    decls.push({ prop: 'line-height', value: lineRem });
    decls.push({ prop: 'margin-top', value: marginRem });
    decls.push({ prop: 'margin-bottom', value: marginRem });
  }

  return decls;
}

function computeBlockMargins(options) {
  const { baseFontSizePx, baseLineHeight, baseFontSizeCopyPx, unit } = options;

  const base = baseFontSizeCopyPx;
  const baseLinePx = round(base * baseLineHeight, 0, 'ceil');

  const decls = [];

  if (unit === 'px') {
    decls.push({ prop: 'margin-top', value: `${baseLinePx}px` });
    decls.push({ prop: 'margin-bottom', value: `${baseLinePx}px` });
  } else if (unit === 'rem') {
    const v = pxToRem(baseLinePx, baseFontSizePx);
    decls.push({ prop: 'margin-top', value: v });
    decls.push({ prop: 'margin-bottom', value: v });
  } else if (unit === 'pxrem') {
    decls.push({ prop: 'margin-top', value: `${baseLinePx}px` });
    decls.push({ prop: 'margin-bottom', value: `${baseLinePx}px` });

    const v = pxToRem(baseLinePx, baseFontSizePx);
    decls.push({ prop: 'margin-top', value: v });
    decls.push({ prop: 'margin-bottom', value: v });
  }

  return decls;
}

module.exports = postcss.plugin('postcss-rhythm', (userOptions = {}) => {
  const defaultSelectors = {
    body: 'body',
    blocks: 'p, ul, ol, pre, table, blockquote',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
  };

  const options = {
    defaultScale: false, // если true — это “главная” шкала (по умолчанию)
    baseFontSizePx: 16,
    baseLineHeight: 1.5,
    baseFontSizeCopyPx: 16,
    scaleFactor: 'GOLDEN_SECTION',
    unit: 'rem', // "px" | "rem" | "pxrem"
    generateHeadings: true,
    generateBody: true,
    generateBlockMargins: true,
    selectors: {},
    steps: {
      h1: 3,
      h2: 2,
      h3: 1,
      h4: 0,
    },
    ...userOptions,
  };

  // селекторы: если defaultScale = true и пользователь не переопределил,
  // используем “голые” селекторы (body, h1…)
  const selectors = {
    ...defaultSelectors,
    ...(options.defaultScale ? {} : defaultSelectors),
    ...options.selectors,
  };

  const {
    unit,
    baseFontSizePx,
    baseLineHeight,
    baseFontSizeCopyPx,
    scaleFactor,
    generateHeadings,
    generateBody,
    generateBlockMargins,
    steps,
  } = options;

  const shared = {
    unit,
    baseFontSizePx,
    baseLineHeight,
    baseFontSizeCopyPx,
    scaleFactor,
  };

  return (root) => {
    // Автогенерация (без @rhythm) — удобно для “главной” шкалы
    if (generateBody) {
      const rule = postcss.rule({ selector: selectors.body });
      const decls = computeBody({ baseFontSizePx, baseLineHeight, unit });
      decls.forEach((d) => rule.append(d));
      root.append(rule);
    }

    if (generateHeadings) {
      const map = [
        ['h1', selectors.h1],
        ['h2', selectors.h2],
        ['h3', selectors.h3],
        ['h4', selectors.h4],
      ];

      map.forEach(([key, selector]) => {
        const step = steps[key];
        if (typeof step !== 'number') {
          return;
        }

        const rule = postcss.rule({ selector });
        const decls = computeHeading(step, shared);
        decls.forEach((d) => rule.append(d));
        root.append(rule);
      });
    }

    if (generateBlockMargins) {
      const rule = postcss.rule({ selector: selectors.blocks });
      const decls = computeBlockMargins(shared);
      decls.forEach((d) => rule.append(d));
      root.append(rule);
    }

    // Поддержка @rhythm body|headings|margins
    root.walkAtRules('rhythm', (atRule) => {
      const params = (atRule.params || '').trim();

      if (params === 'body') {
        const rule = postcss.rule({ selector: selectors.body });
        const decls = computeBody({ baseFontSizePx, baseLineHeight, unit });
        decls.forEach((d) => rule.append(d));
        atRule.replaceWith(rule);
        return;
      }

      if (params === 'headings') {
        const frag = postcss.root();
        const map = [
          ['h1', selectors.h1],
          ['h2', selectors.h2],
          ['h3', selectors.h3],
          ['h4', selectors.h4],
        ];

        map.forEach(([key, selector]) => {
          const step = steps[key];
          if (typeof step !== 'number') {
            return;
          }

          const rule = postcss.rule({ selector });
          const decls = computeHeading(step, shared);
          decls.forEach((d) => rule.append(d));
          frag.append(rule);
        });

        atRule.replaceWith(frag);
        return;
      }

      if (params === 'margins') {
        const rule = postcss.rule({ selector: selectors.blocks });
        const decls = computeBlockMargins(shared);
        decls.forEach((d) => rule.append(d));
        atRule.replaceWith(rule);
      }
    });
  };
});
