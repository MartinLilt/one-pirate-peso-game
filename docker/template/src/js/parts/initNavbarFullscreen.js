import {
    $, tween, $wnd, $doc,
} from './_utility';

/*------------------------------------------------------------------

  Init Navbar Fullscreen

-------------------------------------------------------------------*/
function initNavbarFullscreen() {
    const self = this;
    const $navbar = $('.nk-navbar-full');
    const $navbarTop = $('.nk-navbar-top');
    const $navbarSocial = $navbar.find('.nk-nav-social');
    let navTransparent;
    let navRect;
    let isOpened;

    self.toggleFullscreenNavbar = () => {
        self[isOpened ? 'closeFullscreenNavbar' : 'openFullscreenNavbar']();
    };
    self.openFullscreenNavbar = () => {
        if (isOpened || !$navbar.length) {
            return;
        }
        isOpened = 1;

        let $navbarMenuItems = $navbar.find('.nk-nav .nk-drop-item.open > .dropdown:not(.closed) > li > a');
        if (!$navbarMenuItems.length) {
            $navbarMenuItems = $navbar.find('.nk-nav > li > a');
        }

        // active all togglers
        $('.nk-navbar-full-toggle').addClass('active');

        // padding bottom if there is social block
        const paddingBottom = $navbar.find('.nk-nav-social').innerHeight();

        // add navbar top position
        navTransparent = $navbarTop.length ? $navbarTop.hasClass('nk-navbar-transparent') && !$navbarTop.hasClass('nk-navbar-solid') : 1;
        navRect = $navbarTop[0] ? $navbarTop[0].getBoundingClientRect() : 0;

        // set top position and animate
        tween.set($navbar, {
            top: navRect ? navRect.top + (navTransparent ? 0 : navRect.height) : 0,
            paddingTop: navRect && navTransparent ? navRect.height : 0,
            paddingBottom,
        });
        tween.set($navbarMenuItems, {
            y: -10,
            opacity: 0,
        });
        tween.set($navbarSocial, {
            y: 10,
            opacity: 0,
        });
        tween.to($navbar, {
            opacity: 1,
            duration: 0.5,
            display: 'block',
            force3D: true,
            onComplete() {
                self.initPluginNano($navbar);
            },
        });
        tween.to($navbarMenuItems, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
            stagger: 0.1,
        });
        tween.to($navbarSocial, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.4,
            force3D: true,
        });

        $navbar.addClass('open');

        // prevent body scrolling
        self.bodyOverflow(1);

        // trigger event
        $wnd.trigger('nk-open-full-navbar', [$navbar]);
    };

    self.closeFullscreenNavbar = (dontTouchBody) => {
        if (!isOpened || !$navbar.length) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        $('.nk-navbar-full-toggle').removeClass('active');

        // set top position and animate
        tween.to($navbar, {
            opacity: 0,
            duration: 0.5,
            display: 'none',
            force3D: true,
            onComplete() {
                if (!dontTouchBody) {
                    // restore body scrolling
                    self.bodyOverflow(0);
                }
            },
        });

        // open navbar block
        $navbar.removeClass('open');

        // trigger event
        $wnd.trigger('nk-close-full-navbar', [$navbar]);
    };

    $doc.on('click', '.nk-navbar-full-toggle', (e) => {
        self.toggleFullscreenNavbar();
        e.preventDefault();
    });

    $wnd.on('nk-open-search-block nk-open-cart nk-open-sign-form', () => {
        self.closeFullscreenNavbar(1);
    });
}

export { initNavbarFullscreen };
