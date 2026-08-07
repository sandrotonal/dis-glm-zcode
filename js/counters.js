(function () {
    'use strict';

    /* ============================================================
       ANİMASYONLU SAYAÇLAR — [data-count] taşıyan sayılar
       görünüme girdiğinde 0'dan hedef değere sayar.
       data-count="8000" data-suffix="k+" data-decimals="1"
       ============================================================ */

    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    function format(v, decimals, short) {
        if (short === 'k' && v >= 1000) {
            var k = Math.round((v / 1000) * 10) / 10;
            return (Number.isInteger(k) ? k : k.toFixed(1)) + 'k';
        }
        if (decimals > 0) return v.toFixed(decimals);
        return Math.round(v).toLocaleString('en-US');
    }

    function animate(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var short = el.getAttribute('data-short') || '';
        var dur = parseInt(el.getAttribute('data-duration') || '1400', 10);
        var start = null;

        function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = format(target * eased, decimals, short) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animate(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    els.forEach(function (el) { io.observe(el); });

})();