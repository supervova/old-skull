import { $, toggleClass } from '../../lib/dom-utils.js';

/**
 * Checks if a drawer is open.
 * @param {HTMLElement} drawer The drawer element.
 * @returns {boolean} True if the drawer is open.
 */
const isDrawerOpen = (drawer) => {
  if (drawer.tagName === 'DIALOG') {
    return drawer.hasAttribute('open');
  }
  return drawer.classList.contains('drawer-open');
};

/**
 * Sets the open state of a drawer.
 * @param {HTMLElement} drawer The drawer element.
 * @param {boolean} isOpen The desired open state.
 */
const setDrawerOpen = (drawer, isOpen) => {
  if (drawer.tagName === 'DIALOG') {
    if (isOpen) {
      drawer.setAttribute('open', '');
    } else {
      drawer.removeAttribute('open');
    }
  } else {
    toggleClass(drawer, 'drawer-open', isOpen);
  }
};

/**
 * Closes a specific drawer instance and resets its toggle trigger if applicable.
 * @param {HTMLElement} drawer The drawer element to close.
 */
const closeDrawerInstance = (drawer) => {
  if (drawer && isDrawerOpen(drawer)) {
    const openedByToggleId = drawer.dataset.openedBy;
    if (openedByToggleId) {
      const toggleTrigger = document.getElementById(openedByToggleId);
      if (toggleTrigger && toggleTrigger.dataset.labelOriginal) {
        toggleTrigger.textContent = toggleTrigger.dataset.labelOriginal;
      }
      drawer.removeAttribute('data-opened-by');
    }
    setDrawerOpen(drawer, false);
  }
};

/**
 * Closes all drawers except for a specified one.
 * @param {HTMLElement|null} exceptDrawer The drawer element to keep open.
 */
const closeAllDrawers = (exceptDrawer = null) => {
  const allDrawers = $('.drawer', true);
  allDrawers.forEach((drawer) => {
    if (drawer !== exceptDrawer) {
      closeDrawerInstance(drawer);
    }
  });
};

/**
 * Handles opening a drawer via a trigger element.
 * @param {MouseEvent} e The click event.
 */
const openDrawer = (e) => {
  const trigger = e.target.closest('[data-role="open-drawer"]');
  if (!trigger) return;

  const targetId = trigger.dataset.target;
  if (!targetId) return;

  const drawer = $(`#${targetId}`);
  if (drawer) {
    closeAllDrawers(drawer);
    setDrawerOpen(drawer, true);
  }
};

/**
 * Handles closing a drawer via a trigger element.
 * @param {MouseEvent} e The click event.
 */
const closeDrawer = (e) => {
  const trigger = e.target.closest('[data-role="close"]');
  if (!trigger) return;

  let drawer;
  const targetId = trigger.dataset.target;
  if (targetId) {
    drawer = $(`#${targetId}`);
  } else {
    drawer = trigger.closest('.drawer');
  }

  closeDrawerInstance(drawer);
};

/**
 * Handles toggling a drawer's state and updating the trigger label.
 * @param {MouseEvent} e The click event.
 */
const toggleDrawer = (e) => {
  const trigger = e.target.closest('[data-role="toggle-drawer"]');
  if (!trigger) return;

  const targetId = trigger.dataset.target;
  if (!targetId) return;

  const drawer = $(`#${targetId}`);
  if (!drawer) return;

  const isOpen = isDrawerOpen(drawer);

  if (!isOpen) {
    closeAllDrawers(drawer);
  }

  setDrawerOpen(drawer, !isOpen);

  // Handle the label change
  const altLabel = trigger.dataset.labelAlt;
  if (altLabel) {
    if (!isOpen) {
      // Drawer is opening
      // Store original label if it's not already stored
      if (!trigger.dataset.labelOriginal) {
        trigger.dataset.labelOriginal = trigger.textContent;
      }
      trigger.textContent = altLabel;
      // Add a unique ID to the trigger if it doesn't have one
      if (!trigger.id) {
        trigger.id = `drawer-toggle-${Date.now()}`;
      }
      drawer.dataset.openedBy = trigger.id;
    } else {
      // Drawer is closing
      trigger.textContent = trigger.dataset.labelOriginal;
      drawer.removeAttribute('data-opened-by');
    }
  }
};

document.addEventListener('click', (e) => {
  openDrawer(e);
  closeDrawer(e);
  toggleDrawer(e);
});
