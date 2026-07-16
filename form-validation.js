(function() {
  var validators = {
    required: function(value) { return value.trim().length > 0; },
    email: function(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); },
    minLength: function(value, min) { return value.trim().length >= min; },
    passwordMatch: function(value, confirmId) {
      var confirm = document.getElementById(confirmId);
      return confirm ? value === confirm.value : true;
    }
  };

  function validateField(input) {
    var field = input.closest('.form-group') || input.closest('.input-group');
    if (!field) return true;

    var rules = input.dataset.validate;
    if (!rules) return true;

    var ruleList = rules.split('|');
    var errorEl = field.querySelector('.field-error');
    var isValid = true;

    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'field-error';
      field.appendChild(errorEl);
    }

    for (var i = 0; i < ruleList.length; i++) {
      var rule = ruleList[i];
      var parts = rule.split(':');
      var ruleName = parts[0];
      var ruleArg = parts[1];
      var errorMsg = parts[2] || '';

      if (validators[ruleName]) {
        var args = [input.value];
        if (ruleArg) args.push(ruleArg);

        if (!validators[ruleName].apply(null, args)) {
          isValid = false;
          if (errorMsg) {
            errorEl.textContent = errorMsg;
          }
          break;
        }
      }
    }

    errorEl.classList.toggle('visible', !isValid);
    input.classList.toggle('error', !isValid);
    input.classList.toggle('success', isValid && input.value.trim().length > 0);
    return isValid;
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll('[data-validate]');
    var allValid = true;
    for (var i = 0; i < inputs.length; i++) {
      if (!validateField(inputs[i])) allValid = false;
    }
    return allValid;
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-validate]').forEach(function(input) {
      input.addEventListener('blur', function() { validateField(input); });
      input.addEventListener('input', function() {
        if (input.classList.contains('error') || input.classList.contains('success')) {
          validateField(input);
        }
      });
    });

    document.querySelectorAll('form').forEach(function(form) {
      var origSubmit = form.onsubmit;
      form.addEventListener('submit', function(e) {
        if (!validateForm(form)) {
          e.preventDefault();
          var firstError = form.querySelector('[data-validate].error');
          if (firstError) firstError.focus();
          if (typeof showToast === 'function') {
            showToast('Please fix the highlighted fields before continuing.', 'error');
          }
        }
      });
    });
  });

  window.validateField = validateField;
  window.validateForm = validateForm;
})();
