(function() {
    'use strict';

    /* Staggered reveal for hero / gallery / implant sections */
    ['section1', 'section2', 'section3'].forEach(function(id) {
        var section = document.getElementById(id);
        var items = section.querySelectorAll('[data-reveal]');
        if (!items.length) return;
        var triggered = false;
        new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !triggered) {
                    triggered = true;
                    items.forEach(function(item, i) {
                        item.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) ' + (i * 120) + 'ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ' + (i * 120) + 'ms';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                    this.disconnect();
                }
            }.bind(this));
        }, { threshold: 0.15 }).observe(section);
    });

    /* Scroll-triggered [data-anim] animations */
    var animElements = document.querySelectorAll('[data-anim]');
    var animObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var delay = parseInt(el.dataset.animDelay || '0');
                setTimeout(function() {
                    el.classList.add('anim-visible');
                }, delay);
                animObserver.unobserve(el);
            }
        });
    }, { threshold: 0.1 });
    animElements.forEach(function(el) { animObserver.observe(el); });

})();