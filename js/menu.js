(function () {
    'use strict';

    var hamburger = document.getElementById('hamburger');
    var menuOverlay = document.getElementById('mobile-menu');
    var menuBackdrop = document.getElementById('menu-backdrop');
    var menuPanel = document.getElementById('menu-panel');
    var menuBottom = document.getElementById('menu-bottom');
    var menuLinks = menuOverlay.querySelectorAll('.menu-link');
    var hamLines = hamburger.querySelectorAll('.ham-line');

    function openMenu() {
        App.set('menuOpen', true);
        document.body.style.overflow = 'hidden';
        menuOverlay.style.pointerEvents = 'auto';
        menuBackdrop.style.opacity = '1';
        menuPanel.style.transform = 'translateX(0)';
        menuBottom.style.opacity = '1';
        hamLines[0].style.transform = 'rotate(45deg) translate(0,0)';
        hamLines[1].style.opacity = '0';
        hamLines[1].style.transform = 'scaleX(0)';
        hamLines[2].style.transform = 'rotate(-45deg) translate(0,0)';
        menuLinks.forEach(function (link, i) {
            setTimeout(function () {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 100 + i * 60);
        });
    }

    function closeMenu() {
        App.set('menuOpen', false);
        document.body.style.overflow = '';
        menuBackdrop.style.opacity = '0';
        menuPanel.style.transform = 'translateX(100%)';
        menuBottom.style.opacity = '0';
        hamLines[0].style.transform = 'translateY(-8px)';
        hamLines[1].style.opacity = '1';
        hamLines[1].style.transform = 'scaleX(1)';
        hamLines[2].style.transform = 'translateY(8px)';
        menuLinks.forEach(function (link) {
            link.style.opacity = '0';
            link.style.transform = 'translateX(32px)';
        });
        setTimeout(function () {
            if (!App.state.menuOpen) menuOverlay.style.pointerEvents = 'none';
        }, 500);
    }

    hamburger.addEventListener('click', function () {
        if (App.state.menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    menuBackdrop.addEventListener('click', closeMenu);
    menuLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* Senkron: masaüstüne geçildiğinde menü açıksa otomatik kapanır */
    App.on('device', function (d) {
        if (d.isDesktop && App.state.menuOpen) closeMenu();
    });

})();