/**
 * Furnix Notification & Modal Accessibility System
 * Manages accessible toast alerts (aria-live), modal focus-trapping, keyboard shortcuts, and UI feedback.
 */

(function(global) {
  'use strict';

  class NotificationSystem {
    constructor() {
      this.activeFocusTrap = null;
      this.previousFocusedElement = null;
      this.init();
    }

    init() {
      document.addEventListener('DOMContentLoaded', () => {
        this.ensureToastContainer();
      });
    }

    ensureToastContainer() {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
      }
      return container;
    }

    showToast(message, type = 'info', duration = 3500) {
      const container = this.ensureToastContainer();
      const toast = document.createElement('div');
      toast.className = `toast-item toast-${type}`;
      toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

      const iconClass = type === 'success' ? 'fa-circle-check' :
                        type === 'error' ? 'fa-circle-exclamation' :
                        type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';

      toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon" aria-hidden="true"></i>
        <span class="toast-message">${this.escapeHTML(message)}</span>
        <button type="button" class="toast-close-btn" aria-label="Close notification">&times;</button>
      `;

      const closeBtn = toast.querySelector('.toast-close-btn');
      const dismiss = () => {
        toast.classList.add('toast-hiding');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      };

      closeBtn.addEventListener('click', dismiss);

      container.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('toast-visible'));

      if (duration > 0) {
        setTimeout(dismiss, duration);
      }
    }

    trapFocus(modalElement) {
      if (!modalElement) return;
      this.previousFocusedElement = document.activeElement;
      
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.activeFocusTrap = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', this.activeFocusTrap);
      firstElement.focus();
    }

    releaseFocus() {
      if (this.activeFocusTrap) {
        document.removeEventListener('keydown', this.activeFocusTrap);
        this.activeFocusTrap = null;
      }
      if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === 'function') {
        this.previousFocusedElement.focus();
      }
    }

    escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  }

  const system = new NotificationSystem();
  global.FurnixNotificationSystem = system;
  global.showToast = (msg, type, dur) => system.showToast(msg, type, dur);
})(typeof window !== 'undefined' ? window : this);
