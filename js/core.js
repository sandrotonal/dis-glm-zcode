(function () {
    'use strict';

    /* ============================================================
       APP CORE — herkesin bağlandığı tek merkez.
       Tek kaynak: durum (state) + olay veriyolu (event bus).
       Site genelindeki tüm modüller buradan beslenir; bir şey
       değiştiğinde tek taraflı kalmaz, abone olan her modül
       senkron olarak güncellenir.
       ============================================================ */

    var config = {
        breakpoint: 768,
        images: {
            hero: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85',
            section2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85'
        },
        thresholds: {
            navShadow: 50,
            navHide: 300,
            backToTop: 600
        }
    };

    var breakpointMql = window.matchMedia('(min-width: ' + config.breakpoint + 'px)');

    var state = {
        isDesktop: breakpointMql.matches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        menuOpen: false,
        splashDone: false,
        scrollY: window.pageYOffset || window.scrollY || 0,
        progress: 0
    };

    var handlers = {};

    function emit(name, payload) {
        var list = handlers[name];
        if (!list) return;
        for (var i = 0; i < list.length; i++) {
            list[i](payload);
        }
    }

    function on(name, fn) {
        (handlers[name] || (handlers[name] = [])).push(fn);
        return function off() {
            var list = handlers[name];
            var i = list ? list.indexOf(fn) : -1;
            if (i > -1) list.splice(i, 1);
        };
    }

    function set(key, value) {
        var changed = state[key] !== value;
        state[key] = value;
        if (changed) emit('state:' + key, value);
        return changed;
    }

    var App = {
        config: config,
        state: state,
        set: set,
        on: on,
        emit: emit
    };

    /* ---------- Cihaz (mobil/masaüstü) tek kaynak ---------- */

    function handleDevice(e) {
        var isDesktop = e.matches;
        set('isDesktop', isDesktop);
        App.emit('device', { isDesktop: isDesktop, isMobile: !isDesktop });
    }
    if ('addEventListener' in breakpointMql) {
        breakpointMql.addEventListener('change', handleDevice);
    } else {
        breakpointMql.addListener(handleDevice);
    }

    /* ---------- Azaltılmış hareket tercihi ---------- */
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
        set('reducedMotion', e.matches);
    });

    /* ---------- Kaydırma döngüsü (tek rAF, tek kaynak) ---------- */
    var ticking = false;
    function handleScrollEvent() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            var y = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var progress = max > 0 ? (y / max) * 100 : 0;
            set('scrollY', y);
            set('progress', progress);
            App.emit('scroll', { scrollY: y, progress: progress });
            ticking = false;
        });
    }
    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    window.App = App;
})();