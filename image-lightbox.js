(function() {
  var lightbox = null;
  var overlay = null;
  var currentIndex = 0;
  var images = [];

  function open(index) {
    if (!lightbox) createLightbox();
    currentIndex = index;
    showImage();
    overlay.classList.add('lightbox-visible');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeydown);
  }

  function close() {
    if (overlay) overlay.classList.remove('lightbox-visible');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
  }

  function showImage() {
    if (!images[currentIndex]) return;
    var img = images[currentIndex];
    var imgEl = lightbox.querySelector('.lightbox-image');
    var caption = lightbox.querySelector('.lightbox-caption');
    var counter = lightbox.querySelector('.lightbox-counter');
    imgEl.src = img.src;
    imgEl.alt = img.alt || 'Product image';
    caption.textContent = img.alt || '';
    counter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function next() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      showImage();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      showImage();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  function createLightbox() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.setAttribute('aria-modal', 'true');

    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-content';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    closeBtn.setAttribute('aria-label', 'Close image viewer');

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>';
    prevBtn.setAttribute('aria-label', 'Previous image');

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
    nextBtn.setAttribute('aria-label', 'Next image');

    var imgContainer = document.createElement('div');
    imgContainer.className = 'lightbox-image-container';

    var img = document.createElement('img');
    img.className = 'lightbox-image';
    img.alt = '';

    var caption = document.createElement('p');
    caption.className = 'lightbox-caption';

    var counter = document.createElement('span');
    counter.className = 'lightbox-counter';

    imgContainer.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(imgContainer);
    lightbox.appendChild(caption);
    lightbox.appendChild(counter);
    overlay.appendChild(lightbox);
    document.body.appendChild(overlay);

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });
  }

  function init() {
    document.querySelectorAll('.product-image img, .card img, .new-product img').forEach(function(img) {
      if (img.closest('.lightbox-image')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        var parent = img.closest('.products-grid, .flex.g-one-half, .new-arrivals-grid');
        if (parent) {
          images = Array.from(parent.querySelectorAll('img')).map(function(i) {
            return { src: i.src, alt: i.alt };
          });
        } else {
          images = [{ src: img.src, alt: img.alt }];
        }
        var idx = images.findIndex(function(i) { return i.src === img.src; });
        open(idx >= 0 ? idx : 0);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.openLightbox = open;
  window.closeLightbox = close;
})();
