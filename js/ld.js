(function () {
    'use strict';

    /* ============================================================
       STRUCTURED DATA (JSON-LD) — tüm sayfalarda LocalBusiness /
       MedicalClinic, services.html'de ayrıca FAQPage. SEO ve AI
       motorlarının siteyi doğru okuması için tek noktadan enjekte.
       ============================================================ */

    var BASE = {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        '@id': 'https://dentalhealth.example/#clinic',
        name: 'Dental Health',
        description: 'Modern, gentle dentistry in West New York (NJ) — implants, whitening, cosmetic dentistry and orthodontics under one roof since 2010.',
        url: 'https://dentalhealth.example/',
        image: 'https://dentalhealth.example/img/clinic-1.jpg',
        telephone: '+1-201-555-0192',
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '6000 Boulevard East',
            addressLocality: 'West New York',
            addressRegion: 'NJ',
            postalCode: '07093',
            addressCountry: 'US'
        },
        geo: { '@type': 'GeoCoordinates', latitude: 40.7869, longitude: -74.0094 },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00'
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '14:00'
            }
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '8200'
        }
    };

    function inject(data) {
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        (document.head || document.documentElement).appendChild(script);
    }

    inject(BASE);

    var faqRows = document.querySelectorAll('.faq-row');
    if (faqRows.length) {
        var faqItems = [];
        faqRows.forEach(function (row) {
            var q = row.querySelector('[data-faq]');
            var a = row.querySelector('.faq-a p');
            if (q && a) faqItems.push({
                '@type': 'Question',
                name: q.textContent.trim(),
                acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
            });
        });
        if (faqItems.length) {
            inject({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqItems
            });
        }
    }

})();