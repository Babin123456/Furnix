(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const fieldErrors = {};

  function createFieldError(input) {
    const wrapper = input.closest('.form-group');
    if (!wrapper) return;
    let errEl = wrapper.querySelector('.field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      wrapper.appendChild(errEl);
    }
    fieldErrors[input.id] = errEl;
    return errEl;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.classList.contains('error') || input.classList.contains('success')) {
          validateField(input);
        }
      });
    }
  });

  function validateField(input) {
    if (!input) return true;
    const errEl = fieldErrors[input.id] || createFieldError(input);
    const val = input.value.trim();
    let valid = true;
    let msg = '';

    if (input.id === 'name') {
      if (!val) { valid = false; msg = 'Name is required.'; }
    } else if (input.id === 'email') {
      if (!val) { valid = false; msg = 'Email is required.'; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { valid = false; msg = 'Please enter a valid email address.'; }
    } else if (input.id === 'subject') {
      if (!val) { valid = false; msg = 'Subject is required.'; }
    } else if (input.id === 'message') {
      if (!val) { valid = false; msg = 'Message is required.'; }
      else if (val.length < 10) { valid = false; msg = 'Message must be at least 10 characters.'; }
    }

    input.classList.remove('error', 'success');
    if (errEl) {
      errEl.classList.remove('visible');
      errEl.textContent = '';
    }

    if (!valid) {
      input.classList.add('error');
      if (errEl) {
        errEl.textContent = msg;
        errEl.classList.add('visible');
      }
    } else {
      input.classList.add('success');
    }

    return valid;
  }

  function validateAll() {
    let valid = true;
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
      if (input && !validateField(input)) {
        valid = false;
      }
    });
    return valid;
  }

  function showToast(message, type) {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
      return;
    }
    var existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    var bg = type === 'success' ? '#256029' : '#9b281a';
    toast.style.cssText =
      'position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:8px;color:#fff;font-weight:500;z-index:9999;background:' +
      bg +
      ';box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:opacity 0.3s ease;max-width:400px;';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;
    if (!validateAll()) return;

    submitBtn.disabled = true;
    var originalHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>SENDING...</span> <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';

    var payload = {
      name: nameInput ? nameInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      subject: subjectInput ? subjectInput.value.trim() : '',
      message: messageInput ? messageInput.value.trim() : ''
    };

    try {
      var res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var data = await res.json();

      if (data.success) {
        showToast(data.message || 'Your message has been received successfully.', 'success');
        form.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
          if (input) {
            input.classList.remove('success', 'error');
            var errEl = fieldErrors[input.id];
            if (errEl) { errEl.classList.remove('visible'); errEl.textContent = ''; }
          }
        });
      } else {
        showToast(data.message || 'Submission failed. Please try again.', 'error');
      }
    } catch (err) {
      showToast('A network error occurred. Please try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  });
})();
