/**
 * Vite's entry point for the demo page.
 * Here we simply import the SCSS core so that Vite will process it through
 * the Sass plugin and insert it into the <style>.
 */
import '../frontend/main.css';
import '../frontend/components/drawer/drawer.js';
import '../frontend/components/popover/popover.js';
import '../frontend/components/header/topnav.js';

// Prevents default navigation for placeholder links (used for styling/demo purposes only)
document
  .querySelectorAll('[data-role="link"]')
  .forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
