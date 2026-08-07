(function () {
    'use strict';

    /* ============================================================
       COOKIE CONSENT — çerez tercihi bildirimi + düzenlenebilir
       panel. Tercihler localStorage'da saklanır; gerçek çerez ve
       takipçi çalışmaz. Banner ilk ziyarette görünür, panel daha
       sonra her an yeniden açılabilir (data-ck="open").
       ============================================================ */

    var KEY = 'dh_cookie_prefs';

    var CATEGORIES = [
        {
            id: 'preferences',
            label: 'Strictly Necessary',
            desc: 'Keep core features like navigation and your consent choices working. Always on.',
            required: true
        },
        {
            id: 'analytics',
            label: 'Analytics & Statistics',
            desc: 'Currently no analytics or tracking cookies run on this site. Stored for future optional statistics.',
            required: false
        }
    ];

    var prefs = load();
    if (!prefs) buildBanner();

    var state = {
        preferences: true,
        analytics: prefs ? !!prefs.analytics : false
    };

    function load() {
        try {
            var raw = localStorage.getItem(KEY);
            if (!raw) return null;
            var o = JSON.parse(raw);
            return { preferences: true, analytics: !!o.analytics };
        } catch (e) {
            return null;
        }
    }

    function save() {
        try {
            localStorage.setItem(KEY, JSON.stringify({
                preferences: true,
                analytics: state.analytics,
                savedAt: new Date().toISOString()
            }));
        } catch (e) { /* saklama engelliyse sessiz geç */ }
    }

    /* -------------------- BANNER -------------------- */
    function buildBanner() {
        var banner = document.createElement('div');
        banner.id = 'ck-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Cookie preferences');
        banner.className = 'fixed bottom-0 left-0 right-0 z-[70] border-t border-black/10 bg-white/95 backdrop-blur-xl';
        banner.innerHTML =
            '<div class="max-w-6xl mx-auto px-4 md:px-5 py-5 md:py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">' +
            '  <div class="flex-1 min-w-0">' +
            '    <p class="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-black/50 mb-1.5">Cookies &amp; Preferences</p>' +
            '    <p class="text-sm md:text-base text-black/70 font-semibold leading-relaxed">We keep things simple: no tracking cookies, no ad pixels. You decide what stays stored in your browser.</p>' +
            '  </div>' +
            '  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full sm:w-auto sm:min-w-[320px] shrink-0">' +
            '    <button type="button" data-ck="open" class="w-full px-6 py-3.5 bg-white rounded-full border border-black text-sm font-semibold text-center hover:bg-black hover:text-white transition-colors duration-200">Cookie Settings</button>' +
            '    <a href="#" data-ck="accept" class="w-full px-6 py-3.5 bg-black rounded-full text-white text-sm font-semibold no-underline text-center hover:bg-neutral-800 transition-colors duration-200">Accept All</a>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(banner);
    }

    /* -------------------- PANEL -------------------- */
    function toggleRow(c) {
        var locked = !!c.required;
        var on = locked || !!state[c.id];
        return '<div class="flex items-start justify-between gap-6 py-5 md:py-6 border-b border-black/10 last:border-b-0">' +
            '  <div class="min-w-0 pr-2">' +
            '    <p class="text-sm md:text-base font-bold text-black">' + c.label + '</p>' +
            '    <p class="text-xs md:text-sm text-black/45 font-semibold leading-relaxed mt-1">' + c.desc + '</p>' +
            '  </div>' +
            '  <div role="switch" aria-checked="' + on + '" tabindex="' + (locked ? '-1' : '0') + '"' +
            '       data-ck-toggle="' + c.id + '" class="ck-toggle ' + (locked ? 'locked on' : (on ? 'on' : '')) + '"></div>' +
            '</div>';
    }

    function openPanel() {
        if (document.getElementById('ck-panel')) return;
        var wrap = document.createElement('div');
        wrap.innerHTML =
            '<div id="ck-backdrop" data-ck="close" class="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm"></div>' +
            '<div class="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-4 md:p-6 pointer-events-none">' +
            '  <div id="ck-panel" role="dialog" aria-modal="true" aria-labelledby="ck-title"' +
            '       class="pointer-events-auto w-full md:w-[560px] bg-white rounded-2xl border border-black/10 max-h-[76vh] overflow-y-auto">' +
            '    <div class="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-start justify-between gap-4 border-b border-black/10">' +
            '      <div>' +
            '        <p class="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-1">Cookie Settings</p>' +
            '        <h2 id="ck-title" class="text-2xl md:text-3xl font-bold text-black tracking-tight">Preferences</h2>' +
            '      </div>' +
            '      <button type="button" data-ck="close" aria-label="Close" class="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 text-black text-lg leading-none hover:bg-black hover:text-white transition-colors duration-200">&times;</button>' +
            '    </div>' +
            '    <div class="px-6 md:px-8 py-1">' + CATEGORIES.map(toggleRow).join('') + '</div>' +
            '    <div class="px-6 md:px-8 py-5 md:py-6 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4">' +
            '      <p class="text-[10px] md:text-xs font-semibold text-black/40">Nothing leaves your browser.<br class="hidden md:block"/> See the <a href="privacy.html" class="underline underline-offset-4">privacy policy</a>.</p>' +
            '      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full md:w-auto md:min-w-[400px]">' +
            '        <button type="button" data-ck="reject" class="w-full px-4 py-3 bg-white rounded-full border border-black/15 text-xs font-semibold text-black/60 text-center hover:text-black hover:border-black transition-colors duration-200">Reject All</button>' +
            '        <button type="button" data-ck="accept" class="w-full px-4 py-3 bg-white rounded-full border border-black text-xs font-semibold text-center hover:bg-black hover:text-white transition-colors duration-200">Accept All</button>' +
            '        <button type="button" data-ck="save" class="w-full px-4 py-3 bg-black rounded-full text-white text-xs font-semibold text-center hover:bg-neutral-800 transition-colors duration-200">Save Choices</button>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(wrap.firstChild);
        document.body.appendChild(wrap.firstChild);
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        var backdrop = document.getElementById('ck-backdrop');
        var panel = document.getElementById('ck-panel');
        if (backdrop) backdrop.remove();
        if (panel) {
            var parent = panel.parentElement;
            if (parent && parent.parentElement === document.body) parent.remove();
        }
        document.body.style.overflow = '';
    }

    function setToggle(key, on) {
        var el = document.querySelector('[data-ck-toggle="' + key + '"]');
        if (!el) return;
        el.classList.toggle('on', on);
        el.setAttribute('aria-checked', String(on));
    }

    function toggle(key) {
        state[key] = !state[key];
        setToggle(key, state[key]);
    }

    function persist() {
        save();
        if (window.App && App.set) {
            App.set('cookiePrefs', { preferences: true, analytics: state.analytics });
        }
    }

    function acceptAll() {
        state.analytics = true;
        setToggle('analytics', true);
        persist();
        removeBanner();
        closePanel();
    }

    function rejectAll() {
        state.analytics = false;
        setToggle('analytics', false);
        persist();
        removeBanner();
        closePanel();
    }

    function saveChoices() {
        persist();
        removeBanner();
        closePanel();
    }

    function removeBanner() {
        var banner = document.getElementById('ck-banner');
        if (banner) banner.remove();
    }

    /* -------------------- BAĞLA -------------------- */
    document.addEventListener('click', function (e) {
        var t = e.target.closest ? e.target.closest('[data-ck]') : null;
        if (t) {
            var act = t.getAttribute('data-ck');
            if (act === 'accept') { e.preventDefault(); acceptAll(); }
            else if (act === 'reject') rejectAll();
            else if (act === 'save') saveChoices();
            else if (act === 'open') openPanel();
            else if (act === 'close') { e.stopPropagation(); closePanel(); }
            return;
        }
        var sw = e.target.closest ? e.target.closest('[data-ck-toggle]') : null;
        if (sw && sw.getAttribute('tabindex') !== '-1') toggle(sw.getAttribute('data-ck-toggle'));
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
    });

    window.openCookieSettings = openPanel;

})();