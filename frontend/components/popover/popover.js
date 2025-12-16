/**
 * Checks if the popover is a <details> element.
 * @param {HTMLElement} popover The popover element.
 * @returns {boolean} True if the popover is a <details> element.
 */
const isDetailsPopover = (popover) =>
  popover.tagName.toLowerCase() === 'details';

const popoverRegistry = new Set();
let globalHandlersBound = false;

/**
 * Checks if the popover is currently open.
 * @param {HTMLElement} popover The popover element.
 * @returns {boolean} True if the popover is open.
 */
const isPopoverOpen = (popover) =>
  isDetailsPopover(popover)
    ? popover.hasAttribute('open')
    : popover.classList.contains('is-open');

/**
 * Sets the open state of a popover.
 * @param {HTMLElement} popover The popover element.
 * @param {boolean} isOpen The desired open state.
 */
const setPopoverState = (popover, isOpen) => {
  const summary = popover.querySelector(
    '[data-role="popover-summary"], summary'
  );
  const body = popover.querySelector('.popover-body');

  if (isDetailsPopover(popover)) {
    if (isOpen) {
      popover.setAttribute('open', '');
    } else {
      popover.removeAttribute('open');
    }
  } else {
    // For custom popovers, toggle class directly
    // @starting-style in CSS handles initial animation
    if (isOpen) {
      popover.classList.add('is-open');
    } else {
      popover.classList.remove('is-open');
    }

    if (summary && body) {
      summary.setAttribute('aria-expanded', isOpen.toString());
      body.setAttribute('aria-hidden', (!isOpen).toString());
    }
  }
};

/**
 * Updates ARIA attributes for all registered non-details popovers.
 */
const updateAriaAttributes = () => {
  popoverRegistry.forEach((popover) => {
    if (!isDetailsPopover(popover)) {
      const summary = popover.querySelector(
        '[data-role="popover-summary"], summary'
      );
      const body = popover.querySelector('.popover-body');

      if (summary && body) {
        if (!body.id) {
          body.id = `popover-content-${Math.random().toString(36).substring(2, 10)}`;
        }

        summary.setAttribute('aria-haspopup', 'true');
        summary.setAttribute('aria-controls', body.id);
        summary.setAttribute('role', 'button');

        if (!summary.hasAttribute('tabindex')) {
          summary.setAttribute('tabindex', '0');
        }

        const isOpen = isPopoverOpen(popover);
        summary.setAttribute('aria-expanded', isOpen.toString());
        body.setAttribute('aria-hidden', (!isOpen).toString());
      }
    }
  });
};

/**
 * Closes all popovers except for the one specified.
 * @param {HTMLElement|null} exclude The popover element to exclude from closing.
 */
const closeAllPopovers = (exclude = null) => {
  popoverRegistry.forEach((popover) => {
    if (popover !== exclude) {
      setPopoverState(popover, false);
    }
  });
};

/**
 * Handles clicks outside of popovers to close them.
 * @param {MouseEvent} event The click event.
 */
const handleDocumentClick = (event) => {
  popoverRegistry.forEach((popover) => {
    if (!popover.contains(event.target)) {
      setPopoverState(popover, false);
    }
  });
};

/**
 * Handles the Escape key to close all popovers.
 * @param {KeyboardEvent} event The keydown event.
 */
const handleKeydown = (event) => {
  if (event.key === 'Esc' || event.key === 'Escape') {
    closeAllPopovers();
  }
};

/**
 * Initializes all popover components on the page.
 */
export default function initPopovers() {
  const popovers = Array.from(
    document.querySelectorAll('[data-role="popover"]')
  );

  if (!popovers.length) return;

  popovers.forEach((popover) => {
    if (popoverRegistry.has(popover)) return;

    popoverRegistry.add(popover);

    const summary = popover.querySelector(
      '[data-role="popover-summary"], summary'
    );

    if (summary) {
      summary.addEventListener('click', (event) => {
        const isDetails = isDetailsPopover(popover);
        const wasOpen = isPopoverOpen(popover);

        if (!isDetails) {
          event.preventDefault();
        }

        if (!wasOpen) {
          closeAllPopovers(popover);
        }

        if (!isDetails) {
          setPopoverState(popover, !wasOpen);
        }

        event.stopPropagation();
      });

      if (!isDetailsPopover(popover)) {
        summary.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            summary.click();
          }
        });
      }
    }
  });

  updateAriaAttributes();

  if (!globalHandlersBound) {
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', updateAriaAttributes);
    globalHandlersBound = true;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      initPopovers();
    },
    { once: true }
  );
} else {
  initPopovers();
}
