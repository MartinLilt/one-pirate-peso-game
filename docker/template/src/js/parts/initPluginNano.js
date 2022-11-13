import { $, $doc } from './_utility';

/* Nano Scroller */
function initPluginNano($context) {
    if (typeof $.fn.nanoScroller !== 'undefined') {
        ($context || $doc).find('.nano').nanoScroller();
    }
}

export { initPluginNano };
