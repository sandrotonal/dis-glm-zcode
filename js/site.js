(function () {
    'use strict';

    /* ============================================================
       SITE SHARED — tüm sayfalarda aynı, senkron davranış.
       App çekirdeğine (core.js) bağlıdır: splash, mobil menü,
       kaydırma çubuğu/navbar/back-to-top, animasyon reveal'ı,
       footer yılı ve aktif sayfa işareti tek kaynaktan yönetilir.
       ============================================================ */

    /* -------------------- SPLASH (sayfada varsa) -------------------- */
    var splash = document.getElementById('splash');
    var splashSeen = false;
    try { splashSeen = sessionStorage.getItem('splashSeen') === '1'; } catch (e) {}
    var hasTarget = location.hash.length > 1;
    var reducedMotion = false;
    try { reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    /* Hedef (#...., örn. #testimonials) varsa navbar yüksekliğini hesaba
       katarak bölüme kay. Tıklamayla gelen ziyaretlerde boşuna oynatma olmaz. */
    function jumpToHash() {
        var id = decodeURIComponent(location.hash.slice(1));
        var target = document.getElementById(id);
        if (!target) return;
        var navEl = document.getElementById('navbar');
        var offset = (navEl ? navEl.offsetHeight : 0) + 16;
        setTimeout(function () {
            window.scrollTo({
                top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset),
                behavior: 'smooth'
            });
        }, 150);
    }

    if (splash && !splashSeen && !hasTarget && !reducedMotion) {
        var splashCounter = document.getElementById('splash-counter');
        var count = 0;
        var splashTimer = setInterval(function () {
            count++;
            splashCounter.textContent = count;
            if (count >= 100) {
                clearInterval(splashTimer);
                setTimeout(function () {
                    splash.classList.add('splash-exit');
                    setTimeout(function () {
                        splash.remove();
                        App.set('splashDone', true);
                        try { sessionStorage.setItem('splashSeen', '1'); } catch (e) {}
                    }, 700);
                }, 200);
            }
        }, 20);
    } else if (splash) {
        splash.remove();
        App.set('splashDone', true);
        try { sessionStorage.setItem('splashSeen', '1'); } catch (e) {}
    }

    if (hasTarget) jumpToHash();

    /* ------------------ MOBILE MENU ------------------ */
    var hamburger = document.getElementById('hamburger');
    var menuOverlay = document.getElementById('mobile-menu');
    if (hamburger && menuOverlay) {
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

        /* Senkron: masaüstüne geçince açık menü otomatik kapanır */
        App.on('device', function (d) {
            if (d.isDesktop && App.state.menuOpen) closeMenu();
        });
    }

    /* ---------- SCROLL: PROGRESS + NAVBAR + BACK-TO-TOP ---------- */
    var progressBar = document.getElementById('scroll-progress');
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('back-to-top');
    var thresholds = App.config.thresholds;
    var lastScrollY = 0;

    App.on('scroll', function (data) {
        var scrollY = data.scrollY;

        if (progressBar) progressBar.style.width = data.progress + '%';

        if (navbar) {
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
        }
        lastScrollY = scrollY;

        if (backToTop) {
            if (scrollY > thresholds.backToTop) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(16px)';
                backToTop.style.pointerEvents = 'none';
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ------------------ [data-anim] REVEAL ------------------ */
    var animElements = document.querySelectorAll('[data-anim]');
    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var delay = parseInt(el.dataset.animDelay || '0', 10);
                setTimeout(function () {
                    el.classList.add('anim-visible');
                }, App.state.reducedMotion ? 0 : delay);
                animObserver.unobserve(el);
            }
        });
    }, { threshold: 0.1 });
    animElements.forEach(function (el) {
        animObserver.observe(el);
    });

    /* ------------------ FOOTER YILI + AKTİF SAYFA ------------------ */
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.footer-link[href]').forEach(function (a) {
        var href = (a.getAttribute('href') || '').toLowerCase();
        var file = href.split('#')[0].split('/').pop() || 'index.html';
        if (file === currentFile) a.classList.add('footer-current');
    });

})();