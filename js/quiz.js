(function () {
    'use strict';

    /* ============================================================
       SMILE ASSESSMENT (index.html) — 4 soruluk mini quiz.
       Cevaplara göre önerilen hizmet(ler)i gösterir ve randevuya
       yönlendirir. [data-quiz] bloğu varsa çalışır.
       ============================================================ */

    var root = document.getElementById('smile-quiz');
    if (!root) return;

    var SERVICE_NAMES = {
        implants: 'Dental Implants',
        whitening: 'Teeth Whitening',
        cosmetic: 'Cosmetic Dentistry',
        orthodontics: 'Orthodontics',
        checkup: 'Check-up & Hygiene',
        emergency: 'Emergency Dental Care'
    };

    var QUESTIONS = [
        {
            q: 'What brings you here today?',
            options: [
                { label: 'A routine cleaning', value: 'checkup' },
                { label: 'Whitening my smile', value: 'whitening' },
                { label: 'Straightening my teeth', value: 'orthodontics' },
                { label: 'Replacing a missing tooth', value: 'implants' },
                { label: 'Pain or an emergency', value: 'emergency' }
            ]
        },
        {
            q: 'When would you like to visit?',
            options: [
                { label: 'As soon as possible', value: 'soon' },
                { label: 'Within the next month', value: 'month' },
                { label: 'Just exploring for now', value: 'later' }
            ]
        },
        {
            q: 'How comfortable are you with the dentist?',
            options: [
                { label: 'Completely fine', value: 'fine' },
                { label: 'A little nervous', value: 'nervous' },
                { label: 'Very anxious', value: 'anxious' }
            ]
        },
        {
            q: 'Anything else we should know?',
            options: [
                { label: 'I have dental insurance', value: 'insurance' },
                { label: 'I would like payment options', value: 'pay' },
                { label: 'Nothing — ready to book', value: 'ready' }
            ]
        }
    ];

    var step = 0;
    var answers = [];

    var main = root.querySelector('[data-quiz-main]');
    var done = root.querySelector('[data-quiz-done]');
    var title = root.querySelector('[data-quiz-q]');
    var list = root.querySelector('[data-quiz-options]');
    var backBtn = root.querySelector('[data-quiz-back]');
    var progress = root.querySelector('[data-quiz-progress]');

    var RECO = {
        checkup: { service: 'checkup', note: 'A gentle, thorough cleaning with a hygiene plan.' },
        whitening: { service: 'whitening', note: 'Enamel-friendly whitening — several shades in one visit.' },
        orthodontics: { service: 'orthodontics', note: 'Clear aligners and discreet braces, at any age.' },
        implants: { service: 'implants', note: 'Permanent, natural-looking tooth replacement.' },
        emergency: { service: 'emergency', note: 'Same-day appointments — call us first.' },
        cosmetic: { service: 'cosmetic', note: 'Crowns and restorations built around your smile.' }
    };

    function recommend() {
        var a = answers;
        var key = 'checkup';
        if (a[0] === 'emergency') key = 'emergency';
        else if (a[0] === 'implants') key = 'implants';
        else if (a[0] === 'whitening') key = 'whitening';
        else if (a[0] === 'orthodontics') key = 'orthodontics';
        else if (a[0] === 'checkup') key = 'checkup';
        return RECO[key];
    }

    function showStep() {
        var q = QUESTIONS[step];
        title.textContent = q.q;
        list.innerHTML = '';
        q.options.forEach(function (o, i) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'quiz-option';
            btn.textContent = o.label;
            btn.addEventListener('click', function () {
                answers[step] = o.value;
                step++;
                if (step < QUESTIONS.length) {
                    showStep();
                } else {
                    showResult();
                }
            });
            list.appendChild(btn);
        });
        backBtn.classList.toggle('invisible', step === 0);
        var pct = Math.round((step / QUESTIONS.length) * 100);
        progress.style.width = pct + '%';
    }

    function showResult() {
        main.classList.add('hidden');
        done.classList.remove('hidden');
        var rec = recommend();
        document.getElementById('quiz-result-service').textContent = SERVICE_NAMES[rec.service];
        document.getElementById('quiz-result-note').textContent = rec.note;
    }

    backBtn.addEventListener('click', function () {
        if (step > 0) {
            step--;
            main.classList.remove('hidden');
            done.classList.add('hidden');
            showStep();
        }
    });

    var restart = root.querySelector('[data-quiz-restart]');
    if (restart) {
        restart.addEventListener('click', function () {
            step = 0;
            answers = [];
            main.classList.remove('hidden');
            done.classList.add('hidden');
            showStep();
        });
    }

    showStep();

})();