/**
 * Furnix Form Validator & Input Security Engine
 * Provides rule-based validation, accessibility attributes (aria-invalid, aria-describedby),
 * real-time feedback, and integration with SecuritySanitizer.
 */

(function(global) {
  'use strict';

  class FormValidatorEngine {
    constructor() {
      this.sanitizer = global.SecuritySanitizer || null;
      this.rules = {
        required: (val) => val.trim().length > 0,
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
        minLength: (val, len) => val.trim().length >= parseInt(len, 10),
        maxLength: (val, len) => val.trim().length <= parseInt(len, 10),
        match: (val, targetId) => {
          const target = document.getElementById(targetId);
          return target ? val === target.value : true;
        },
        phone: (val) => !val || /^[+]?[\d\s-]{7,15}$/.test(val.trim())
      };
      this.init();
    }

    init() {
      document.addEventListener('DOMContentLoaded', () => {
        this.bindDataValidateForms();
      });
    }

    bindDataValidateForms() {
      const inputs = document.querySelectorAll('[data-validate]');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('input-error') || input.classList.contains('input-success')) {
            this.validateField(input);
          }
        });
      });

      const forms = document.querySelectorAll('form[data-validate-form]');
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          if (!this.validateForm(form)) {
            e.preventDefault();
            const firstErr = form.querySelector('.input-error');
            if (firstErr) firstErr.focus();
            if (global.showToast) {
              global.showToast('Please correct the highlighted fields before submitting.', 'error');
            }
          }
        });
      });
    }

    validateField(input) {
      if (!input || !input.dataset.validate) return true;

      const rulesStr = input.dataset.validate;
      const ruleItems = rulesStr.split('|');
      const container = input.closest('.form-group') || input.parentElement;
      let errorEl = container.querySelector('.field-error-msg');

      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error-msg';
        errorEl.id = `err-${input.id || Math.random().toString(36).substr(2, 9)}`;
        container.appendChild(errorEl);
      }

      let isValid = true;
      let errorMessage = '';
      let value = input.value;

      if (this.sanitizer && input.type === 'email') {
        value = this.sanitizer.sanitizeEmail(value);
      }

      for (const item of ruleItems) {
        const parts = item.split(':');
        const ruleName = parts[0];
        const ruleArg = parts[1];
        const customMsg = parts[2];

        if (this.rules[ruleName]) {
          if (!this.rules[ruleName](value, ruleArg)) {
            isValid = false;
            errorMessage = customMsg || this.getDefaultMessage(ruleName, ruleArg);
            break;
          }
        }
      }

      if (!isValid) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', errorEl.id);
        errorEl.textContent = errorMessage;
        errorEl.style.display = 'block';
      } else {
        input.classList.remove('input-error');
        if (value.trim().length > 0) {
          input.classList.add('input-success');
        }
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }

      return isValid;
    }

    validateForm(form) {
      if (!form) return true;
      const inputs = form.querySelectorAll('[data-validate]');
      let allValid = true;
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          allValid = false;
        }
      });
      return allValid;
    }

    getDefaultMessage(ruleName, arg) {
      switch (ruleName) {
        case 'required': return 'This field is required.';
        case 'email': return 'Please enter a valid email address.';
        case 'minLength': return `Minimum length is ${arg} characters.`;
        case 'maxLength': return `Maximum length is ${arg} characters.`;
        case 'match': return 'Fields do not match.';
        case 'phone': return 'Please enter a valid phone number.';
        default: return 'Invalid input.';
      }
    }
  }

  global.FurnixFormValidatorEngine = new FormValidatorEngine();
})(typeof window !== 'undefined' ? window : this);
