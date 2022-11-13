/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
const $ = jQuery;
const tween = window.gsap;
const isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
const isFireFox = typeof InstallTrigger !== 'undefined';
const isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;


// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
const $wnd = $(window);
const $doc = $(document);
const $body = $('body');
let wndW = 0;
let wndH = 0;
let docH = 0;
function getWndSize() {
    wndW = $wnd.width();
    wndH = $wnd.height();
    docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
const resizeArr = [];
let resizeTimeout;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (resizeArr.length) {
            for (let k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('load resize orientationchange', debounceResized);
$(debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
const hideOnScrollList = [];
let didScroll;
let lastST = 0;

$wnd.on('scroll load resize orientationchange', () => {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    const ST = $wnd.scrollTop();

    let type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach((value) => {
        if (typeof value === 'function') {
            value(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(() => {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}


/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
let bodyOverflowEnabled;
let isBodyOverflowing;
let scrollbarWidth;
let originalBodyPadding;
const $header = $('.nk-header');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'nk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    const result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        const documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body[0].style.paddingRight || '';
    }

    if (isBodyOverflowing) {
        $body.add($header.filter(':not(.nk-header-opaque)').children())
            .add($header.filter('.nk-header-opaque').children('.nk-navbar-fixed'))
            .css('paddingRight', `${scrollbarWidth}px`);
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $header.children().css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
        $body.addClass('nk-body-overflow');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        $body.removeClass('nk-body-overflow');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    const rect = $item[0].getBoundingClientRect();
    let result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        const beforeTopEnd = Math.max(0, rect.height + rect.top);
        const beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        const afterTop = Math.max(0, -rect.top);
        const beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}


/**
 * Scroll To
 */
function scrollTo($to, callback) {
    let scrollPos = false;
    const speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs,
            },
            duration: speed,
            ease: Power2.easeOut,
            overwrite: 5,
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

export {
    $, tween, isIOs, isMobile, isFireFox, isTouch, $wnd, $doc, $body, wndW, wndH, docH, debounceResize, throttleScroll, bodyOverflow, isBodyOverflowed, isInViewport, scrollTo,
};
