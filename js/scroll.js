(function() {
    'use strict';

    var progressBar = document.getElementById('scroll-progress');
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('back-to-top');
    var lastScrollY = 0;
    var scrollTicking = false;

    function handleScroll() {
        var scrollY = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;

        progressBar.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + '%';

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = '';
        }

        if (scrollY > 300 && scrollY > lastScrollY) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = scrollY;

        if (scrollY > 600) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(16px)';
            backToTop.style.pointerEvents = 'none';
        }

        scrollTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();