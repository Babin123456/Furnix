(function() {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  }

  function createToast(message, type, duration) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.setAttribute('role', 'alert');

    const iconMap = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info',
      warning: 'fa-triangle-exclamation',
    };
    const iconClass = iconMap[type] || 'fa-circle-info';

    // Construct safe elements to prevent DOM-based XSS injection
    const icon = document.createElement('i');
    icon.className = 'fa-solid ' + iconClass;
    icon.setAttribute('aria-hidden', 'true');

    const messageSpan = document.createElement('span');
    messageSpan.className = 'toast-message';
    messageSpan.textContent = message; // Safely set text content instead of innerHTML

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.innerHTML = '&times;';

    closeBtn.addEventListener('click', function() {
      dismiss(toast);
    });

    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    toast.appendChild(closeBtn);

    getContainer().appendChild(toast);

    requestAnimationFrame(function() {
      toast.classList.add('toast-visible');
    });

    if (duration > 0) {
      setTimeout(function() {
        dismiss(toast);
      }, duration);
    }

    return toast;
  }

  function dismiss(toast) {
    if (!toast || toast.classList.contains('toast-dismissing')) return;
    toast.classList.add('toast-dismissing');
    toast.classList.remove('toast-visible');
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  window.showToast = function(message, type, duration) {
    type = type || 'info';
    duration = duration || 4000;
    return createToast(message, type, duration);
  };

  window.dismissToast = dismiss;
})();
