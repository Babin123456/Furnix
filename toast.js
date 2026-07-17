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

    toast.innerHTML =
      '<i class="fa-solid ' + iconClass + '" aria-hidden="true"></i>' +
      '<span class="toast-message">' + message + '</span>' +
      '<button class="toast-close" aria-label="Close notification">&times;</button>';

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
      dismiss(toast);
    });

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
