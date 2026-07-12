(function () {
  function addValidation(form) {
    if (!form) return;
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      let firstInvalid = null;
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach(function (input) {
        input.classList.remove('field-invalid');

        if (!input.checkValidity()) {
          e.preventDefault();
          input.classList.add('field-invalid');

          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        if (typeof showToast === 'function') {
          showToast('Please fill in all required fields correctly.', 'error');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var style = document.createElement('style');
    style.textContent =
      '.field-invalid{border-color:#c0392b!important;box-shadow:0 0 0 3px rgba(192,57,43,0.15)!important}' +
      '.field-invalid:focus{outline-color:#c0392b!important}';
    document.head.appendChild(style);

    var forms = document.querySelectorAll('form');
    forms.forEach(addValidation);
  });
})();
