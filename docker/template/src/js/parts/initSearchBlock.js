import {
    $, tween, $wnd, $doc, isIOs,
} from './_utility';

/*------------------------------------------------------------------

  Init Search Block

-------------------------------------------------------------------*/
function initSearchBlock() {
    const self = this;
    const $search = $('.nk-search');
    const $searchField = $search.find('.nk-search-field');
    const $nav = $('.nk-navbar-top');
    let navRect;
    let isOpened;

    self.toggleSearch = () => {
        self[`${isOpened ? 'close' : 'open'}Search`]();
    };

    self.openSearch = () => {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        // active all togglers
        $('.nk-search-toggle').addClass('active');

        // add search top position
        navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0;

        // set top position and animate
        tween.set($search, {
            paddingTop: navRect ? navRect.bottom : 0,
        });
        tween.set($searchField, {
            y: -10,
            opacity: 0,
        });
        tween.to($search, {
            opacity: 1,
            duration: 0.5,
            display: 'block',
            force3D: true,
        });
        tween.to($searchField, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
            force3D: true,
        });

        // open search block
        $search.addClass('open');

        // focus search input
        if (self.options.enableSearchAutofocus) {
            setTimeout(() => {
                $search.find('.nk-search-field input').focus();
            }, 100);
        }

        // trigger event
        $wnd.trigger('nk-open-search-block', [$search]);
    };

    self.closeSearch = () => {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        $('.nk-search-toggle').removeClass('active');

        tween.to($search, {
            opacity: 0,
            duration: 0.5,
            display: 'none',
            force3D: true,
        });

        // open search block
        $search.removeClass('open');

        // trigger event
        $wnd.trigger('nk-close-search-block', [$search]);
    };

    $doc.on('click', '.nk-search-toggle', (e) => {
        self.toggleSearch();
        e.preventDefault();
    });

    // prevent search close on iOS after scroll. Scroll event triggers after focus on search input
    $wnd.on(`nk-open-full-navbar nk-open-cart nk-open-sign-form${isIOs ? '' : ' scroll'}`, () => {
        self.closeSearch();
    });
}

export { initSearchBlock };
