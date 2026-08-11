(function () {
    'use strict';

    var carousel = document.getElementById('about-carousel');
    if (!carousel) return;

    var slides = carousel.querySelectorAll('.about-slide');
    var dots = carousel.querySelectorAll('.carousel-dot');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var currentIdx = 0;
    var totalSlides = slides.length;
    var autoPlayTimer = null;
    var autoPlayDelay = 4500;
    var touchStartX = 0;
    var touchEndX = 0;

    if (totalSlides <= 1) return;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIdx = index;

        slides.forEach(function (slide, idx) {
            if (idx === currentIdx) {
                slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
                slide.classList.add('opacity-100', 'z-10');
            } else {
                slide.classList.remove('opacity-100', 'z-10');
                slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
            }
        });

        dots.forEach(function (dot, idx) {
            if (idx === currentIdx) {
                dot.className = 'carousel-dot h-1.5 rounded-full transition-all duration-300 w-5 bg-white';
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.className = 'carousel-dot h-1.5 rounded-full transition-all duration-300 w-1.5 bg-white/40 hover:bg-white/70';
                dot.removeAttribute('aria-current');
            }
        });
    }

    function nextSlide() {
        showSlide(currentIdx + 1);
    }

    function prevSlide() {
        showSlide(currentIdx - 1);
    }

    function startAutoPlay() {
        if (autoPlayTimer || (window.App && window.App.state && window.App.state.reducedMotion)) return;
        autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (!autoPlayTimer) return;
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }

    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
            nextSlide();
            restartAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            prevSlide();
            restartAutoPlay();
        });
    }

    // Dot indicators
    dots.forEach(function (dot) {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            var targetIdx = parseInt(dot.getAttribute('data-target') || '0', 10);
            showSlide(targetIdx);
            restartAutoPlay();
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch Swipe Gestures for Mobile
    carousel.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
        }
        stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
        if (e.changedTouches && e.changedTouches[0]) {
            touchEndX = e.changedTouches[0].clientX;
            var diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    nextSlide(); // swipe left
                } else {
                    prevSlide(); // swipe right
                }
            }
        }
        startAutoPlay();
    }, { passive: true });

    // Keyboard navigation when focused
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoPlay();
        }
    });

    // Visibility & Reduced Motion
    if (window.App && typeof window.App.on === 'function') {
        window.App.on('state:reducedMotion', function (isReduced) {
            if (isReduced) stopAutoPlay();
            else startAutoPlay();
        });
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAutoPlay();
        else startAutoPlay();
    });

    // Initialize
    showSlide(0);
    startAutoPlay();
})();
