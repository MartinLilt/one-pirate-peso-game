import {
    $, tween, isTouch, $doc, $body, wndW,
} from './_utility';

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function initNavbarSide() {
    const self = this;
    const $overlay = $('<div class="nk-navbar-overlay">').appendTo($body);

    // side navbars
    const $leftSide = $('.nk-navbar-left-side');
    const $rightSide = $('.nk-navbar-right-side');
    const $sideNavs = $('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        $('[data-nav-toggle]').each(function eachNavToggle() {
            const active = $($(this).attr('data-nav-toggle')).hasClass('open');
            $(this)[`${active ? 'add' : 'remove'}Class`]('active');
        });
    }
    self.toggleSide = ($side, speed) => {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = ($side, speed) => {
        if ($side.css('display') === 'none') {
            return;
        }

        $side.addClass('open');

        // show sidebar
        tween.to($side, {
            x: $side.hasClass('nk-navbar-left-side') ? '100%' : '-100%',
            duration: speed || 0.4,
            force3D: true,
        });

        // show overlay
        if ($side.hasClass('nk-navbar-overlay-content')) {
            tween.to($overlay, {
                opacity: 0.8,
                duration: 0.3,
                display: 'block',
                force3D: true,
            });
        }

        updateTogglers();
    };
    self.closeSide = ($side, speed) => {
        $side.each(function eachSide() {
            $(this).removeClass('open');

            // hide sidebar
            tween.to(this, {
                x: '0%',
                duration: speed || 0.4,
                force3D: true,
            });
            updateTogglers();
        });

        if (!$sideNavs.filter('.nk-navbar-overlay-content.open').length) {
            // hide overlay
            tween.to($overlay, {
                opacity: 0,
                duration: 0.3,
                display: 'none',
                force3D: true,
            });
        }
    };
    $doc.on('click', '[data-nav-toggle]', function onNavToggleClick(e) {
        const $nav = $($(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            $('[data-nav-toggle]').each(function eachNavToggle() {
                self.closeSide($($(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    $doc.on('click', '.nk-navbar-overlay', () => {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(() => {
        $sideNavs.filter('.open').each(function eachOpenedNavs() {
            if (!$(this).is(':visible')) {
                self.closeSide($(this));
            }
        });
    });

    // swipe side navbars
    if (!isTouch || typeof Hammer === 'undefined') {
        return;
    }
    const swipeStartSize = 50;
    let $swipeItem;
    let navSize;
    let openNav;
    let closeNav;
    let isRightSide;
    let isLeftSide;
    let isScrolling = 0;
    let swipeDir;
    let sidePos = false;
    let startSwipe = false;
    let endSwipe = false;

    // strange solution to fix pan events on the latest Chrome
    // https://github.com/hammerjs/hammer.js/issues/1065
    const mc = new Hammer.Manager(document, {
        touchAction: 'auto',
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
        recognizers: [
            [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        ],
    });

    // If we detect a scroll before a panleft/panright, disable panning
    // thanks: https://github.com/hammerjs/hammer.js/issues/771
    mc.on('panstart', (e) => {
        if (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown') {
            isScrolling = 1;
        }
    });
    // Reenable panning
    mc.on('panend', (e) => {
        if (!isScrolling) {
            if ($swipeItem) {
                let swipeSize;
                if (sidePos) {
                    if (openNav) {
                        swipeSize = sidePos;
                    } else if (closeNav) {
                        swipeSize = navSize - sidePos;
                    } else {
                        swipeSize = 0;
                    }
                } else {
                    swipeSize = 0;
                }

                const transitionTime = Math.max(0.15, 0.4 * (navSize - swipeSize) / navSize);
                let swiped = 0;

                if (swipeSize && swipeSize > 10) {
                    const velocityTest = Math.abs(e.velocityX) > 0.7;
                    if (swipeSize >= navSize / 3 || velocityTest) {
                        swiped = 1;
                        if (openNav) {
                            self.openSide($swipeItem, transitionTime);
                        } else {
                            self.closeSide($swipeItem, transitionTime);
                        }
                    }
                }
                if (!swiped) {
                    if (openNav) {
                        self.closeSide($swipeItem, transitionTime);
                    } else {
                        self.openSide($swipeItem, transitionTime);
                    }
                }
            }
            openNav = false;
            closeNav = false;
            isRightSide = false;
            isLeftSide = false;
            swipeDir = false;
            sidePos = false;
            $swipeItem = false;
            startSwipe = false;
            endSwipe = false;
        }
        isScrolling = 0;
    });
    mc.on('panleft panright panup pandown', (e) => {
        if (isScrolling) {
            return;
        }

        let isFirst = false;
        const isFinal = e.isFinal;

        if (startSwipe === false) {
            startSwipe = e.center.x;
            isFirst = true;
        }
        endSwipe = e.center.x;

        // init
        if (isFirst) {
            if (e.direction === 2) {
                swipeDir = 'left';
            } else if (e.direction === 4) {
                swipeDir = 'right';
            } else {
                swipeDir = false;
            }

            // right side
            if ($rightSide && $rightSide.length) {
                navSize = $rightSide.width();

                // open
                if (wndW - startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isRightSide = 1;

                // close
                } else if (wndW - startSwipe >= navSize - 100 && $rightSide.hasClass('open')) {
                    closeNav = 1;
                    isRightSide = 1;
                }
            }

            // left side
            if ($leftSide && $leftSide.length && !isRightSide && $leftSide.is(':visible')) {
                navSize = $leftSide.width();

                // open
                if (startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isLeftSide = 1;

                // close
                } else if (startSwipe >= navSize - 100 && $leftSide.hasClass('open')) {
                    closeNav = 1;
                    isLeftSide = 1;
                }
            }

            // swipe item
            if (isLeftSide) {
                $swipeItem = $leftSide;
            } else if (isRightSide) {
                $swipeItem = $rightSide;
            } else {
                $swipeItem = false;
            }

        // move
        } else if (!isFinal && $swipeItem) {
            if (isRightSide && (openNav && swipeDir === 'left' || closeNav && swipeDir === 'right')) {
                // open side navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, startSwipe - endSwipe));
                }

                // close side navbar
                if (closeNav) {
                    let curPos = startSwipe - endSwipe;
                    if (startSwipe < wndW - navSize) {
                        curPos = wndW - navSize - endSwipe;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos)));
                }

                tween.set($swipeItem, {
                    x: `${-100 * sidePos / navSize}%`,
                });
            } else if (isLeftSide && (openNav && swipeDir === 'right' || closeNav && swipeDir === 'left')) {
                // open mobile navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, endSwipe - startSwipe));
                }

                // close mobile navbar
                if (closeNav) {
                    let curPos2 = endSwipe - startSwipe;
                    if (startSwipe > navSize) {
                        curPos2 = endSwipe - navSize;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos2)));
                }

                tween.set($swipeItem, {
                    x: `${100 * sidePos / navSize}%`,
                });
            }
        }
    });

    // prevent scrolling when opening/hiding navigation
    window.addEventListener('touchmove', (e) => {
        if (isRightSide || isLeftSide) {
            e.srcEvent.preventDefault();
            e.preventDefault();
        }
    }, { passive: false });
}

export { initNavbarSide };
