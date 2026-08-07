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
        '@id': 'https://gucluyumhe.dev/#clinic',
        name: 'Dental Health',
        description: 'Modern, gentle dentistry in West New York (NJ) — implants, whitening, cosmetic dentistry and orthodontics under one roof since 2010.',
        url: 'https://gucluyumhe.dev/',
        image: 'https://gucluyumhe.dev/img/clinic-1.jpg',
        telephone: '+1-201-555-0192',
        priceRange: '$$',
        foundingDate: '2010',
        knowsAbout: [
            'Dental implants',
            'Porcelain veneers',
            'Cosmetic dentistry',
            'Teeth whitening',
            'Orthodontics',
            'Emergency dental care'
        ],
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

    var pageTitle = (document.title || '').replace(/\s*\|\s*Dental Health.*$/i, '').trim() || 'Home';
    var crumbs = [{
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gucluyumhe.dev/'
    }];
    if (pageTitle !== 'Home') {
        crumbs.push({
            '@type': 'ListItem',
            position: 2,
            name: pageTitle,
            item: 'https://gucluyumhe.dev/' + (window.location.pathname.split('/').pop() || 'index.html')
        });
    }
    inject({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs
    });

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