import {
    $, tween, isMobile, isFireFox, $wnd, wndW, wndH,
} from './_utility';

/*------------------------------------------------------------------

  Mouse Parallax

-------------------------------------------------------------------*/
let $parallaxMouseList = false;
let parallaxMouseTimeout;
// run parallax animation
function runParallaxMouse(x, y) {
    let data;
    let itemX;
    let itemY;
    let itemCenterLeft;
    let itemCenterTop;
    $parallaxMouseList.each(function eachParallaxMouse() {
        data = $(this).data('nk-parallax-mouse-data');

        // don't animate if block isn't in viewport
        if (typeof data !== 'object' || !data.isInViewport) {
            return;
        }

        // mouse calculate
        itemCenterLeft = data.rect.left + data.rect.width / 2;
        itemCenterTop = data.rect.top + data.rect.height / 2;

        itemX = (itemCenterLeft - x) / (x > itemCenterLeft ? wndW - itemCenterLeft : itemCenterLeft);
        itemY = (itemCenterTop - y) / (y > itemCenterTop ? wndH - itemCenterTop : itemCenterTop);

        // animate
        // yep, magic number just to let user add attribute data-mouse-parallax="4" instead of data-mouse-parallax="20"
        const maxOffset = 5 * data.z;
        tween.to(this, {
            x: itemX * maxOffset,
            y: itemY * maxOffset,
            duration: data.speed,
            force3D: true,
        });
    });
}

function initParallaxMouse() {
    const self = this;
    if (!self.options.enableMouseParallax || isMobile) {
        return;
    }

    clearTimeout(parallaxMouseTimeout);
    parallaxMouseTimeout = setTimeout(() => {
        const $newParallax = $('[data-mouse-parallax-z]:not(.parallaxed)').addClass('parallaxed');
        if ($newParallax.length) {
            // add new parallax blocks
            if ($parallaxMouseList) {
                $parallaxMouseList = $parallaxMouseList.add($newParallax);

            // first init parallax
            } else {
                $parallaxMouseList = $newParallax;
                if (!isFireFox) {
                    $wnd.on('mousemove', (event) => {
                        runParallaxMouse(event.clientX, event.clientY);
                    });
                }
            }
        }

        // update data for parallax blocks
        if ($parallaxMouseList) {
            $parallaxMouseList.each(function eachParallaxMouse() {
                const $this = $(this);
                $this.data('nk-parallax-mouse-data', {
                    isInViewport: self.isInViewport($this) ? $this.is(':visible') : 0,
                    rect: $this[0].getBoundingClientRect(),
                    z: parseFloat($this.attr('data-mouse-parallax-z')),
                    speed: parseFloat($this.attr('data-mouse-parallax-speed') || 2),
                });
            });
        }
    }, 100);
}

export { initParallaxMouse };
