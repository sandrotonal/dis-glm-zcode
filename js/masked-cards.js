(function () {
    'use strict';

    /* Görsel kaynaklar ve odak noktaları App.config üzerinden gelir:
       tek yerden değiştir, her yere senkron yansısın. */

    function setupMaskedCards(sectionEl, cardSelector, imageUrl, mf, df) {
        var cards = sectionEl.querySelectorAll(cardSelector);
        if (!cards.length) return;
        var img = new Image();
        img.onload = function () {
            var nw = img.naturalWidth,
                nh = img.naturalHeight;
            var rafPending = false;
            function update() {
                var isMobile = !App.state.isDesktop;
                var focalX = isMobile ? mf : df;
                var sRect = sectionEl.getBoundingClientRect();
                var sh = sRect.height,
                    sw = sRect.width;
                var rw = nw * (sh / nh);
                cards.forEach(function (card) {
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
            /* Senkron: cihaz değişiminde odak noktası otomatik güncellenir */
            App.on('device', throttledUpdate);
        };
        img.src = imageUrl;
    }

    setupMaskedCards(document.getElementById('section1'), '.masked-card-s1', App.config.images.hero, 0.7, 0.8);
    setupMaskedCards(document.getElementById('section2'), '.masked-card-s2', App.config.images.section2, 0.65, 0.8);

})();