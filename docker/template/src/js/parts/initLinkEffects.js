import { $, $doc, isMobile } from './_utility';

/*------------------------------------------------------------------

  Init Link Effects

-------------------------------------------------------------------*/
function initLinkEffects() {
    if (isMobile) {
        return;
    }

    // add link effect for navbar
    $('.nk-navbar:not(.nk-navbar-no-link-effect) ul > li > a:not(.btn):not(.nk-btn):not(.no-link-effect)').addClass('link-effect-4');

    // Link Effect 1 (rotate all letters)
    $('.link-effect-1:not(.ready)').each(function eachLinkEffect1() {
        $(this).addClass('ready');

        $(this).contents().each(function () {
            // text node only
            if (this.nodeType === 3) {
                const itemText = $(this).text().replace(/([^\x00-\x80]|\w)/g, '<span>$&</span>');
                $(this).replaceWith(itemText);
            }
        });
    });

    // mouse over class
    let timeout;
    function toggleClass($span, type) {
        const $nextSpan = $span[type === 'add' ? 'next' : 'prev']();
        $span[`${type}Class`]('active');
        clearTimeout(timeout);

        if ($nextSpan.length) {
            timeout = setTimeout(() => {
                toggleClass($nextSpan, type);
            }, 40);
        }
    }
    $doc.on('mouseover', '.link-effect-1.ready', function linkEffect1OnMouseOver() {
        toggleClass($(this).children('span:not(.active):first'), 'add');
    }).on('mouseleave', '.link-effect-1.ready', function linkEffect1OnMouseLeave() {
        toggleClass($(this).children('span.active:last'), 'remove');
    });

    // Link Effect 2 and 3 (color for letters from left to right and top to bottom)
    $('.link-effect-2:not(.ready), .link-effect-3:not(.ready)').each(function eachLinkeEffect2and3() {
        $(this).addClass('ready');
        $(this).html((i, letters) => $('<span>').html(letters).prepend($('<span class="link-effect-shade">').html(letters)));
    });

    // Link Effect 4 (cut words)
    $('.link-effect-4:not(.ready)').each(function eachLinkEffect4() {
        // fix for navigation item descriptions
        const $descr = $(this).find('.nk-item-descr').clone();
        if ($descr.length) {
            $(this).find('.nk-item-descr').remove();
        }

        $(this).addClass('ready');
        $(this).html((i, letters) => $('<span class="link-effect-inner">').html(`<span class="link-effect-l"><span>${letters}</span></span><span class="link-effect-r"><span>${letters}</span></span><span class="link-effect-shade"><span>${letters}</span></span>`));

        if ($descr.length) {
            $(this).append($descr);
        }
    });
}

export { initLinkEffects };
