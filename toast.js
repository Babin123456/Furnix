(function () {
  let toastContainer;

  function ensureContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText =
        'position:fixed;bottom:2rem;right:2rem;z-index:99999;display:flex;flex-direction:column;gap:0.75rem;max-width:360px;width:100%;pointer-events:none;';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  window.showToast = function (message, type) {
    type = type || 'success';
    const container = ensureContainer();

    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    toast.style.cssText =
      'pointer-events:auto;padding:1rem 1.5rem;border-radius:0.75rem;font-family:Jost,sans-serif;font-size:0.95rem;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.15);transform:translateX(120%);opacity:0;transition:transform 0.35s ease,opacity 0.35s ease;display:flex;align-items:center;gap:0.75rem;';

    if (type === 'success') {
      toast.style.background = '#1a7f3e';
      toast.style.color = '#fff';
    } else if (type === 'error') {
      toast.style.background = '#c0392b';
      toast.style.color = '#fff';
    } else if (type === 'info') {
      toast.style.background = '#2c7cb5';
      toast.style.color = '#fff';
    }

    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    setTimeout(function () {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 3000);
  };
})();
