(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.password-wrapper').forEach(function(wrapper) {
      var toggle = wrapper.querySelector('.password-toggle');
      var input = wrapper.querySelector('input[type="password"], input[type="text"]');
      if (!toggle || !input) return;

      toggle.addEventListener('click', function() {
        var isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.classList.toggle('password-visible', isPassword);
        var eyeIcon = toggle.querySelector('i');
        if (eyeIcon) {
          eyeIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        }
        toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    });
  });
})();
