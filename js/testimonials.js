(function() {
    'use strict';

    var testimonials = [
        { quote: 'The team at Dental Health made me feel completely at ease. My smile has never looked better.', author: 'Sarah M., Patient since 2021' },
        { quote: 'Professional, caring, and thorough. Best dental experience I have ever had in my life.', author: 'James R., Patient since 2019' },
        { quote: 'From the consultation to the final result, everything was seamless. Highly recommend this clinic.', author: 'Maria L., Patient since 2022' }
    ];
    var currentIdx = 0;
    var quoteEl = document.getElementById('testimonial-quote');
    var authorEl = document.getElementById('testimonial-author');
    var starsEl = document.getElementById('testimonial-stars');
    var dots = document.querySelectorAll('.testimonial-dot');

    function rotateTestimonial() {
        quoteEl.style.opacity = '0';
        quoteEl.style.transform = 'translateY(8px)';
        authorEl.style.opacity = '0';
        authorEl.style.transform = 'translateY(4px)';
        starsEl.style.opacity = '0';
        setTimeout(function() {
            currentIdx = (currentIdx + 1) % testimonials.length;
            quoteEl.textContent = testimonials[currentIdx].quote;
            authorEl.textContent = testimonials[currentIdx].author;
            dots.forEach(function(d, i) {
                d.style.background = i === currentIdx ? '#000' : 'rgba(0,0,0,0.15)';
            });
            quoteEl.style.opacity = '1';
            quoteEl.style.transform = 'translateY(0)';
            authorEl.style.opacity = '1';
            authorEl.style.transform = 'translateY(0)';
            starsEl.style.opacity = '1';
        }, 400);
    }

    setInterval(rotateTestimonial, 5000);

})();