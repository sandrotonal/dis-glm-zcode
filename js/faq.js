(function () {
    'use strict';

    /* ============================================================
       FAQ ACCORDION (services.html) — satır satır açılan yaygın
       sorular. [data-faq] başlıklarına tıklayınca .open açılır.
       ============================================================ */

    var rows = document.querySelectorAll('.faq-row');

    rows.forEach(function (row) {
        var button = row.querySelector('[data-faq]');
        if (!button) return;
        button.addEventListener('click', function () {
            var isOpen = row.classList.contains('open');
            rows.forEach(function (r) {
                r.classList.remove('open');
                var b = r.querySelector('[data-faq]');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                row.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

})();