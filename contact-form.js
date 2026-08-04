(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Define and initialize fieldErrors mapping object
  const fieldErrors = {
    'name': document.getElementById('nameError'),
    'email': document.getElementById('emailError'),
    'subject': document.getElementById('subjectError'),
    'message': document.getElementById('messageError')
  };

  const sanitizer = window.SecuritySanitizer || null;
  const validator = window.FurnixFormValidatorEngine || null;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;
    if (validator && !validator.validateForm(form)) {
      return;
    }

    submitBtn.disabled = true;
    const originalHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>SENDING...</span> <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';

    let rawName = nameInput ? nameInput.value.trim() : '';
    let rawEmail = emailInput ? emailInput.value.trim() : '';
    let rawSubject = subjectInput ? subjectInput.value.trim() : '';
    let rawMessage = messageInput ? messageInput.value.trim() : '';

    if (sanitizer) {
      rawName = sanitizer.escapeHTML(rawName);
      rawEmail = sanitizer.sanitizeEmail(rawEmail);
      rawSubject = sanitizer.escapeHTML(rawSubject);
      rawMessage = sanitizer.escapeHTML(rawMessage);
    }

    const payload = {
      name: rawName,
      email: rawEmail,
      subject: rawSubject,
      message: rawMessage
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
