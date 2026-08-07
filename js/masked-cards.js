(function() {
    'use strict';

    var HERO_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
    var SECTION2_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

    function setupMaskedCards(sectionEl, cardSelector, imageUrl, mf, df) {
        var cards = sectionEl.querySelectorAll(cardSelector);
        if (!cards.length) return;
        var img = new Image();
        img.onload = function() {
            var nw = img.naturalWidth, nh = img.naturalHeight;
            var rafPending = false;
            function update() {
                var isMobile = window.matchMedia('(max-width: 767px)').matches;
                var focalX = isMobile ? mf : df;
                var sRect = sectionEl.getBoundingClientRect();
                var sh = sRect.height, sw = sRect.width;
                var rw = nw * (sh / nh);
                cards.forEach(function(card) {
                    var cRect = card.getBoundingClientRect();
                    var x = cRect.left - sRect.left;
                    var y = cRect.top - sRect.top;
                    var overflow = Math.max(0, rw - sw);
                    var fo = overflow * focalX;
                    card.style.backgroundImage = 'url(' + imageUrl + ')';
                    card.style.backgroundSize = 'auto ' + sh + 'px';
                    card.style.backgroundPosition = '-' + (x + fo) + 'px -' + y + 'px';
                    card.style.backgroundRepeat = 'no-repeat';
                });
                rafPending = false;
            }
            function throttledUpdate() {
                if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(update);
                }
            }
            update();
            new ResizeObserver(throttledUpdate).observe(sectionEl);
            window.matchMedia('(max-width: 767px)').addEventListener('change', throttledUpdate);
        };
        img.src = imageUrl;
    }

    setupMaskedCards(document.getElementById('section1'), '.masked-card-s1', HERO_IMAGE, 0.7, 0.8);
    setupMaskedCards(document.getElementById('section2'), '.masked-card-s2', SECTION2_IMAGE, 0.65, 0.8);

})();