(function () {
    'use strict';

    /* Yalnızca [data-reveal] kademeli reveal (ana sayfa hero / galeri / implant bölümleri).
       [data-anim] animasyonları tüm sayfalarda ortak olan js/site.js içindedir. */

    function revealNow(item) {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    }

    ['section1', 'section2', 'section3'].forEach(function (id) {
        var section = document.getElementById(id);
        if (!section) return;
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

})();