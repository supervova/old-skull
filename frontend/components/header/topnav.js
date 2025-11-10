import { $ } from '../../lib/dom-utils.js';

const PHONE_L_MIN_WIDTH = 568;
const TABLET_L_MIN_WIDTH = 1024;

/** @type {WeakMap<Element, TopnavOverflowController>} */
const topnavRegistry = new WeakMap();

/**
 * Resolves how many top-level entries may stay visible for the current viewport.
 * @returns {number}
 */
const resolveViewportLimit = () => {
  if (window.matchMedia(`(min-width: ${TABLET_L_MIN_WIDTH}px)`).matches) {
    return Infinity;
  }

  if (window.matchMedia(`(min-width: ${PHONE_L_MIN_WIDTH}px)`).matches) {
    return 4;
  }

  return 3;
};

/**
 * Coordinates overflow handling for a single top navigation instance.
 */
class TopnavOverflowController {
  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.root = root;
    this.list = $(':scope > ul', false, root);
    this.moreItem = this.list
      ? $(':scope > .topnav-more', false, this.list)
      : null;
    this.popover = this.moreItem
      ? $('[data-role="popover"]', false, this.moreItem)
      : null;
    this.moreList = this.moreItem
      ? $('.popover-body .menu', false, this.moreItem)
      : null;
    this.orderSequence = 0;
    this.items = [];
    this.isScheduled = false;

    if (!this.list || !this.moreItem || !this.moreList) return;

    this.scheduleUpdate = this.scheduleUpdate.bind(this);
    this.update = this.update.bind(this);

    this.refreshItems();
    this.scheduleUpdate();

    this.resizeObserver = new ResizeObserver(this.scheduleUpdate);
    this.resizeObserver.observe(this.root);
    window.addEventListener('resize', this.scheduleUpdate);

    if (
      document.fonts &&
      typeof document.fonts.addEventListener === 'function'
    ) {
      document.fonts.addEventListener('loadingdone', this.scheduleUpdate);
    }
  }

  /**
   * Collects menu items from the main list and overflow popover into a single ordered array.
   * @returns {void}
   */
  refreshItems() {
    const mainItems = this.list
      ? Array.from($(':scope > li:not(.topnav-more)', true, this.list))
      : [];
    const overflowItems = Array.from(this.moreList.children);
    const merged = [...mainItems, ...overflowItems];

    for (let index = 0; index < merged.length; index += 1) {
      const element = merged[index];
      if (!element.dataset.topnavOrder) {
        element.dataset.topnavOrder = String(this.orderSequence);
        this.orderSequence += 1;
      } else {
        this.orderSequence = Math.max(
          this.orderSequence,
          Number(element.dataset.topnavOrder) + 1
        );
      }
    }

    merged.sort(
      (a, b) => Number(a.dataset.topnavOrder) - Number(b.dataset.topnavOrder)
    );

    this.items = merged;
  }

  /**
   * Debounces update calls into the next animation frame.
   * @returns {void}
   */
  scheduleUpdate() {
    if (this.isScheduled) return;
    this.isScheduled = true;
    requestAnimationFrame(() => {
      this.isScheduled = false;
      this.update();
    });
  }

  /**
   * Reconciles layout, enforcing viewport limits and moving items between slots.
   * @returns {void}
   */
  update() {
    if (!this.list || !this.moreItem || !this.moreList) return;

    this.refreshItems();

    if (!this.items.length) {
      this.hideMore();
      return;
    }

    this.closePopover();
    this.showMore();

    const fragment = document.createDocumentFragment();
    this.items.forEach((item) => {
      fragment.appendChild(item);
    });
    this.list.insertBefore(fragment, this.moreItem);

    this.applyViewportLimit();
    this.ensureWidth();
    this.ensureOverflowMinimum();
    this.sortOverflow();

    if (this.moreItem.hidden) {
      this.closePopover();
    }
  }

  /**
   * @returns {HTMLLIElement[]}
   */
  getMainItems() {
    if (!this.list) return [];
    return Array.from($(':scope > li:not(.topnav-more)', true, this.list));
  }

  /**
   * Applies viewport-specific cap on visible menu items.
   * @returns {void}
   */
  applyViewportLimit() {
    const limit = resolveViewportLimit();
    if (!Number.isFinite(limit)) return;

    let mainItems = this.getMainItems();
    while (mainItems.length > limit) {
      const item = mainItems.pop();
      if (!item) break;
      this.insertIntoOverflow(item);
      mainItems = this.getMainItems();
    }
  }

  /**
   * Forces items into overflow while the list still scrolls horizontally.
   * @returns {void}
   */
  ensureWidth() {
    const iterationGuard = this.items.length * 2;
    let counter = 0;

    while (this.isOverflowing() && counter < iterationGuard) {
      const mainItems = this.getMainItems();
      const item = mainItems.pop();
      if (!item) break;
      this.insertIntoOverflow(item);
      counter += 1;
    }
  }

  /**
   * Guarantees the overflow trigger only hides when no extra entries exist.
   * @returns {void}
   */
  ensureOverflowMinimum() {
    const total = this.items.length;
    if (!total) {
      this.hideMore();
      return;
    }

    let overflowCount = this.moreList.children.length;

    if (overflowCount === 0) {
      this.hideMore();
      return;
    }

    this.showMore();

    const guardLimit = total;
    let guard = 0;

    while (overflowCount === 1 && guard < guardLimit) {
      const mainItems = this.getMainItems();
      const item = mainItems.pop();
      if (!item) break;
      this.insertIntoOverflow(item);
      overflowCount = this.moreList.children.length;
      guard += 1;
    }
  }

  /**
   * Keeps overflow menu items sorted by their original order.
   * @returns {void}
   */
  sortOverflow() {
    const items = Array.from(this.moreList.children);
    if (items.length < 2) return;

    items.sort(
      (a, b) => Number(a.dataset.topnavOrder) - Number(b.dataset.topnavOrder)
    );

    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(item));
    this.moreList.appendChild(fragment);
  }

  /**
   * Moves a given item into the overflow list, preserving order metadata.
   * @param {HTMLLIElement} item
   * @returns {void}
   */
  insertIntoOverflow(item) {
    const targetIndex = Number(item.dataset.topnavOrder);
    const siblings = Array.from(this.moreList.children);
    const nextSibling = siblings.find(
      (sibling) => Number(sibling.dataset.topnavOrder) > targetIndex
    );

    if (nextSibling) {
      this.moreList.insertBefore(item, nextSibling);
    } else {
      this.moreList.appendChild(item);
    }
  }

  /**
   * Checks whether the main list currently overflows its width.
   * @returns {boolean}
   */
  isOverflowing() {
    const scrollWidth = Math.ceil(this.list.scrollWidth);
    const clientWidth = Math.floor(this.list.clientWidth);
    return scrollWidth - clientWidth > 1;
  }

  /**
   * Hides the overflow trigger.
   * @returns {void}
   */
  hideMore() {
    if (!this.moreItem) return;
    this.moreItem.hidden = true;
  }

  /**
   * Shows the overflow trigger.
   * @returns {void}
   */
  showMore() {
    if (!this.moreItem) return;
    this.moreItem.hidden = false;
  }

  /**
   * Closes the overflow popover without affecting focus.
   * @returns {void}
   */
  closePopover() {
    if (!this.popover) return;
    if (this.popover.tagName.toLowerCase() === 'details') {
      this.popover.removeAttribute('open');
    } else {
      this.popover.classList.remove('popover-open');
    }
  }
}

/**
 * Initializes overflow controllers for each `.topnav` instance.
 * @returns {void}
 */
const initTopnavOverflow = () => {
  const navs = Array.from($('.topnav', true));
  navs.forEach((nav) => {
    if (nav.hasAttribute('data-topnav-enhanced')) return;
    const controller = new TopnavOverflowController(nav);
    topnavRegistry.set(nav, controller);
    nav.setAttribute('data-topnav-enhanced', 'true');
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTopnavOverflow, {
    once: true,
  });
} else {
  initTopnavOverflow();
}
