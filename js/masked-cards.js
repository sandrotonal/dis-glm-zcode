(function () {
    'use strict';

    /* Görsel kaynaklar ve odak noktaları App.config üzerinden gelir:
       tek yerden değiştir, her yere senkron yansısın. */

    function setupMaskedCards(sectionEl, cardSelector, imageUrl, mf, df, mfy, dfy) {
        if (!sectionEl) return;
        var cards = sectionEl.querySelectorAll(cardSelector);
        if (!cards.length) return;
        var img = new Image();
        img.onload = function () {
            var nw = img.naturalWidth,
                nh = img.naturalHeight;
            if (!nw || !nh) return;
            var rafPending = false;
            function update() {
                var isMobile = !App.state.isDesktop;
                var focalX = isMobile ? (mf !== undefined ? mf : 0.5) : (df !== undefined ? df : 0.8);
                var focalY = isMobile ? (mfy !== undefined ? mfy : 0) : (dfy !== undefined ? dfy : 0.1);
                var sRect = sectionEl.getBoundingClientRect();
                var sh = sRect.height,
                    sw = sRect.width;
                if (!sh || !sw) return;

                // Tam kapsama (cover): Hem mobilde hem masaüstünde sağda/altta boşluk kalmaz
                var scale = Math.max(sw / nw, sh / nh);
                var renderW = nw * scale;
                var renderH = nh * scale;

                var overflowX = Math.max(0, renderW - sw);
                var overflowY = Math.max(0, renderH - sh);

                var foX = overflowX * focalX;
                var foY = overflowY * focalY;

                cards.forEach(function (card) {
                    var cRect = card.getBoundingClientRect();
                    var x = cRect.left - sRect.left;
                    var y = cRect.top - sRect.top;
                    card.style.backgroundImage = 'url(' + imageUrl + ')';
                    card.style.backgroundSize = renderW + 'px ' + renderH + 'px';
                    card.style.backgroundPosition = '-' + (x + foX) + 'px -' + (y + foY) + 'px';
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

    setupMaskedCards(document.getElementById('section1'), '.masked-card-s1', App.config.images.hero, 0.7, 0.8, 0, 0.1);
    setupMaskedCards(document.getElementById('section2'), '.masked-card-s2', App.config.images.section2, 0.65, 0.8, 0, 0.1);

})();