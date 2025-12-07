import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'old-skull',
  description: 'Opinionated SCSS toolkit, powered by LLM assistants',

  srcDir: '.',

  srcExclude: ['README.md', '.vitepress/**', 'dist/**', 'node_modules/**'],

  cleanUrls: true,

  rewrites: {
    'frontend/README.md': 'index.md',
    'frontend/theme/README.md': 'base.md',
    'frontend/components/(.*).md': 'components/$1.md',
  },

  themeConfig: {
    nav: [
      { text: 'Quick Start', link: '/' },
      { text: 'Base Styles', link: '/base' },
    ],
  },

  vite: {
    postcss: {},
  },
});
