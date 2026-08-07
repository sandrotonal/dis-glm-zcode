(function () {
    'use strict';

    function revealNow(item) {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    }

    /* Staggered reveal — hero / gallery / implant sectionları */
    ['section1', 'section2', 'section3'].forEach(function (id) {
        var section = document.getElementById(id);
        var items = section.querySelectorAll('[data-reveal]');
        if (!items.length) return;
        var triggered = false;
        new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !triggered) {
                    triggered = true;
                    items.forEach(function (item, i) {
                        if (App.state.reducedMotion) {
                            revealNow(item);
                        } else {
                            item.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) ' + (i * 120) + 'ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ' + (i * 120) + 'ms';
                            revealNow(item);
                        }
                    });
                    this.disconnect();
                }
            }.bind(this));
        }, { threshold: 0.15 }).observe(section);
    });

    /* Scroll tetikli [data-anim] animasyonları */
    var animElements = document.querySelectorAll('[data-anim]');
    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var delay = parseInt(el.dataset.animDelay || '0');
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

})();