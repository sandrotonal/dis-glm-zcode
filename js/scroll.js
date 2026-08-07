(function () {
    'use strict';

    var progressBar = document.getElementById('scroll-progress');
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('back-to-top');
    var thresholds = App.config.thresholds;
    var lastScrollY = 0;

    /* Senkron: kaydırma verisi App çekirdeğinden tek akış olarak gelir */
    App.on('scroll', function (data) {
        var scrollY = data.scrollY;

        progressBar.style.width = data.progress + '%';

        if (scrollY > thresholds.navShadow) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = '';
        }

        if (scrollY > thresholds.navHide && scrollY > lastScrollY) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = scrollY;

        if (scrollY > thresholds.backToTop) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(16px)';
            backToTop.style.pointerEvents = 'none';
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();