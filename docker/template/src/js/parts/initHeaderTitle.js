import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Header Title

-------------------------------------------------------------------*/
function initHeaderTitle() {
    const self = this;
    const $navbarHeader = $('.nk-header');
    const isNavbarOpaque = $navbarHeader.hasClass('nk-header-opaque');
    const isNavbarTransparent = $('.nk-navbar-top').hasClass('nk-header-transparent');
    const $headerTitle = $('.nk-header-title > .nk-header-table');
    const $fullHeaderTitle = $('.nk-header-title-full > .nk-header-table');

    // remove header title padding if navbar opaque
    if (isNavbarOpaque) {
        $headerTitle.css('padding-top', 0);
    }

    self.debounceResize(() => {
        if ((isNavbarTransparent || isNavbarOpaque) && (!$fullHeaderTitle.length || !isNavbarOpaque)) {
            return;
        }

        const navH = $navbarHeader.outerHeight() || 0;

        // add header title padding
        if (!isNavbarTransparent && !isNavbarOpaque) {
            $headerTitle.css('padding-top', navH);
        }

        // fix header title height
        if ($fullHeaderTitle.length) {
            let headerH = '100vh';

            if (isNavbarOpaque) {
                headerH = `calc(100vh - ${navH}px)`;
            }

            $fullHeaderTitle.css('min-height', headerH);
        }
    });
}

export { initHeaderTitle };
