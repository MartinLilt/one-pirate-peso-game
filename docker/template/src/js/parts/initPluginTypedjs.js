import { $ } from './_utility';

/* Typed.js */
function initPluginTypedjs() {
    if (typeof Typed === 'undefined') {
        return;
    }

    $('.nk-typed').each(function eachTyped() {
        const $this = $(this);
        const strings = [];
        $this.children('span').each(function eachTypedChild() {
            strings.push($(this).html());
        });
        if (!strings.length) {
            return;
        }
        $this.html('');

        const loop = $this.attr('data-loop') ? $this.attr('data-loop') === 'true' : true;
        const shuffle = $this.attr('data-shuffle') ? $this.attr('data-shuffle') === 'true' : false;
        const typeSpeed = $this.attr('data-type-speed') ? parseInt($this.attr('data-type-speed'), 10) : 30;
        const startDelay = $this.attr('data-start-delay') ? parseInt($this.attr('data-start-delay'), 10) : 0;
        const backSpeed = $this.attr('data-back-speed') ? parseInt($this.attr('data-back-speed'), 10) : 10;
        const backDelay = $this.attr('data-back-delay') ? parseInt($this.attr('data-back-delay'), 10) : 1000;
        let cursor = $this.attr('data-cursor');

        if (!cursor) {
            cursor = '|';
        } else if (cursor === 'false') {
            cursor = false;
        }

        // eslint-disable-next-line
        new Typed($('<span>').appendTo($this)[0], {
            strings,
            typeSpeed,
            startDelay,
            backSpeed,
            backDelay,
            shuffle,
            loop,
            loopCount: false,
            showCursor: !!cursor,
            cursorChar: cursor,
        });

        // typed js used timeout from startDelay option
        setTimeout(() => {
            $this.addClass('ready');
        }, 0);
    });
}

export { initPluginTypedjs };
