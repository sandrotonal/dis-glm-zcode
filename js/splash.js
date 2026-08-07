(function() {
    'use strict';

    var splash = document.getElementById('splash');
    var splashCounter = document.getElementById('splash-counter');
    var count = 0;
    var splashTimer = setInterval(function() {
        count++;
        splashCounter.textContent = count;
        if (count >= 100) {
            clearInterval(splashTimer);
            setTimeout(function() {
                splash.classList.add('splash-exit');
                setTimeout(function() { splash.remove(); }, 700);
            }, 200);
        }
    }, 20);

})();