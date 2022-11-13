import {
    $, tween, $wnd, $doc, wndW, wndH,
} from './_utility';

/*------------------------------------------------------------------

  Init Preloader

-------------------------------------------------------------------*/
function initPreloader() {
    const self = this;
    const $preloader = $('.nk-preloader');
    const $preloaderBG = $preloader.find('.nk-preloader-bg');
    const $content = $preloader.find('.nk-preloader-content, .nk-preloader-skip');
    if (!$preloader.length) {
        return;
    }

    let isBusy = 0;
    let isOpened = 1;

    // prepare preloader
    const closeData = {
        frames: parseInt($preloaderBG.attr('data-close-frames'), 10),
        speed: parseFloat($preloaderBG.attr('data-close-speed')),
        sprites: $preloaderBG.attr('data-close-sprites'),
        loaded: false,
        width: false,
        height: false,
    };
    const openData = {
        frames: parseInt($preloaderBG.attr('data-open-frames'), 10),
        speed: parseFloat($preloaderBG.attr('data-open-speed')),
        sprites: $preloaderBG.attr('data-open-sprites'),
        loaded: false,
        width: false,
        height: false,
    };

    // preload images
    function preloadImages(data, cb) {
        if (!data.frames || !data.speed || !data.sprites) {
            return;
        }

        const img = new Image();
        img.onload = function onImgLoad() {
            data.width = this.width;
            data.height = this.height;
            data.loaded = true;

            if (cb) {
                cb(data);
            }
        };
        img.src = data.sprites;
    }

    // set div size and position
    function prepareBgDiv(data) {
        // set size and position
        const w = data.width / data.frames;
        const h = data.height;
        const bgCSS = {
            left: 0,
            top: 0,
            backgroundImage: `url("${data.sprites}")`,
        };

        if (w / h > wndW / wndH) {
            bgCSS.height = wndH;
            bgCSS.width = bgCSS.height * w / h;
            bgCSS.left = (wndW - bgCSS.width) / 2;
        } else {
            bgCSS.width = wndW;
            bgCSS.height = bgCSS.width * h / w;
            bgCSS.top = (wndH - bgCSS.height) / 2;
        }

        // set css to background
        $preloaderBG.css(bgCSS);
    }

    // initial image preload (widhout this code background image was flickering)
    preloadImages(closeData, (data) => {
        if (!isBusy && isOpened) {
            $preloaderBG.css({
                backgroundPosition: '200% 50%',
            });
            prepareBgDiv(data);
        }
    });

    // close preloader
    self.closePreloader = function closePreloader(cb) {
        if (!isBusy && isOpened) {
            isBusy = 1;

            if (!closeData.loaded) {
                tween.to($preloader, {
                    opacity: 0,
                    duration: 0.3,
                    display: 'none',
                    force3D: true,
                    onComplete() {
                        // hide content
                        tween.set($content, {
                            opacity: 0,
                            display: 'none',
                        });

                        if (cb) {
                            cb();
                        }
                        isBusy = 0;
                        isOpened = false;
                    },
                });
                return;
            }

            prepareBgDiv(closeData);

            // animate background
            tween.set($preloaderBG, {
                backgroundPosition: '100% 50%',
                backgroundColor: 'transparent',
            });
            tween.to($preloaderBG, {
                backgroundPosition: '0% 50%',
                duration: closeData.speed,
                ease: SteppedEase.config(closeData.frames - 1),
                onComplete() {
                    tween.set($preloader, {
                        opacity: 0,
                        display: 'none',
                    });
                    if (cb) {
                        cb();
                    }
                    isBusy = 0;
                    isOpened = false;
                },
            });

            // animate content
            tween.to($content, {
                y: '-20px',
                opacity: 0,
                duration: 0.3,
                display: 'none',
                force3D: true,
            });
        }
    };

    // open preloader
    self.openPreloader = function openPreloader(cb) {
        if (!isBusy && !isOpened) {
            isBusy = 1;

            if (!openData.loaded) {
                if (cb) {
                    cb();
                }
                isBusy = 0;
                return;
            }

            tween.set($preloaderBG, {
                backgroundPosition: '0% 50%',
                backgroundColor: 'transparent',
            });

            prepareBgDiv(openData);

            tween.set($preloader, {
                opacity: 1,
                display: 'block',
            });

            // animate background
            tween.to($preloaderBG, openData.speed, {
                backgroundPosition: '100% 50%',
                duration: openData.speed,
                ease: SteppedEase.config(openData.frames - 1),
                onComplete() {
                    if (cb) {
                        cb();
                    }
                    isBusy = 0;
                    isOpened = true;
                },
            });
        }
    };

    // hide preloader after page load
    let preloadedOpenImage = 0;
    function firstClosePreloader() {
        self.closePreloader();

        // preload image for opening animation
        if (!preloadedOpenImage) {
            preloadedOpenImage = 1;
            setTimeout(() => {
                preloadImages(openData);
            }, 1000);
        }
    }
    $wnd.on('load', firstClosePreloader);
    $preloader.on('click', '.nk-preloader-skip', firstClosePreloader);

    // fade between pages
    if (!self.options.enableFadeBetweenPages) {
        return;
    }

    // Internal: Return the `href` component of given URL object with the hash
    // portion removed.
    //
    // location - Location or HTMLAnchorElement
    //
    // Returns String
    function stripHash(href) {
        return href.replace(/#.*/, '');
    }

    $doc.on('click', 'a:not(.no-fade):not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="javascript:"])', function onLinksClick(e) {
        const href = this.href;

        // stop if empty href
        if (!href) {
            return;
        }

        // Middle click, cmd click, and ctrl click should open
        // links in a new tab as normal.
        if (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }

        // Ignore case when a hash is being tacked on the current URL
        if (href.indexOf('#') > -1 && stripHash(href) === stripHash(window.location.href)) {
            return;
        }

        // Ignore e with default prevented
        if (e.isDefaultPrevented()) {
            return;
        }

        // prevent item clicked
        if ($(this).next('.dropdown').length) {
            if ($(this).next('.dropdown').css('visibility') === 'hidden' || $(this).parent().hasClass('open')) {
                return;
            }
        }

        e.preventDefault();
        self.openPreloader(() => {
            window.location.href = href;
        });
    });

    // fix safari back button
    // thanks http://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
    $wnd.on('pageshow', (e) => {
        if (e.originalEvent.persisted) {
            self.closePreloader();
        }
    });
}

export { initPreloader };
