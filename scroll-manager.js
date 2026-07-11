(function() {
  var scrollCallbacks = [];
  var ticking = false;

  function handleScroll() {
    ticking = false;
    for (var i = 0; i < scrollCallbacks.length; i++) {
      scrollCallbacks[i](window.scrollY);
    }
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addScrollListener = function(callback) {
    if (typeof callback === 'function') {
      scrollCallbacks.push(callback);
    }
  };

  window.removeScrollListener = function(callback) {
    var index = scrollCallbacks.indexOf(callback);
    if (index !== -1) {
      scrollCallbacks.splice(index, 1);
    }
  };
})();
