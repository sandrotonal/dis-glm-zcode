(function () {
    'use strict';

    /* İletişim formu — App senkron yapısıyla bağlıdır.
       Gönderimde bilgileri toplar ve e-posta istemcisini açar. */

    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.querySelector('[name="name"]').value.trim();
        var email = form.querySelector('[name="email"]').value.trim();
        var phone = form.querySelector('[name="phone"]').value.trim();
        var message = form.querySelector('[name="message"]').value.trim();
        if (!name || !message) return;

        var subject = encodeURIComponent('Appointment request — ' + name);
        var body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Phone: ' + (phone || '-') + '\n\n' +
            'Message:\n' + message
        );
        window.location.href = 'mailto:booking@dentalhealth.com?subject=' + subject + '&body=' + body;
    });

})();