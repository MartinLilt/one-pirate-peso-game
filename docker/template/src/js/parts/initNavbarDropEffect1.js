import { $, tween } from './_utility';

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function initNavbarDropEffect1() {
    const self = this;
    const $navbars = $('.nk-navbar-side, .nk-navbar-full').find('.nk-nav');

    // add perspective
    $navbars.css({
        perspective: '600px',
        perspectiveOrigin: 'center top',
    });

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend(`<li class="bropdown-back"><a href="#">${self.options.templates.secondaryNavbarBackItem}</a></li>`);

    // change height of opened dropdown
    function updateSideNavDropdown($item) {
        const $nav = $item.parents('.nk-navbar:eq(0)');
        const $khNav = $nav.find('.nk-nav');
        const $nanoCont = $khNav.children('.nano-content');
        const $khNavRow = $khNav.parent();
        const $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');

        if ($drop.length) {
            const dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if ($khNavRow.hasClass('nk-nav-row-center')) {
                $drop.css({
                    top: 0,
                });

                $khNav.hide();
                const nanoHeight = $khNavRow.innerHeight();
                $khNav.show();
                const nanoNavRowHeight = nanoHeight;
                const nanoTop = $khNavRow.offset().top;
                const dropTop = $drop.offset().top;

                let top = nanoTop - dropTop;
                if (dropHeight < nanoNavRowHeight) {
                    top += (nanoHeight - dropHeight) / 2;
                }

                $drop.css({
                    top,
                });
            }

            $khNav.css('height', dropHeight);
            self.initPluginNano($nav);

            // scroll to top
            tween.to($nanoCont, {
                scrollTo: { y: 0 },
                duration: 0.3,
                delay: 0.2,
            });
        } else {
            $khNav.css('height', '');
        }
        self.initPluginNano($nav);
    }

    // open / close submenu
    function toggleSubmenu(open, $drop) {
        let $newItems = $drop.find('> .dropdown > li > a');
        let $oldItems = $drop.parent().find('> li > a');

        if (open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            const tmp = $newItems;
            $newItems = $oldItems;
            $oldItems = tmp;
        }

        // show items
        tween.set($newItems, {
            x: open ? '30%' : '-30%',
            rotationY: open ? '30deg' : '-30deg',
            opacity: 0,
            display: 'block',
        }, 0.1);
        tween.to($newItems, {
            x: '0%',
            rotationY: '0deg',
            duration: 0.3,
            opacity: 1,
            delay: 0.1,
        });

        // hide items
        tween.to($oldItems, {
            x: open ? '-30%' : '30%',
            rotationY: open ? '-30deg' : '30deg',
            duration: 0.3,
            opacity: 0,
            onComplete() {
                $oldItems.css('display', 'none');
            },
        });
    }

    $navbars.on('click', '.nk-drop-item > a', function navbarDropItemClick(e) {
        toggleSubmenu(true, $(this).parent());
        updateSideNavDropdown($(this));
        e.preventDefault();
    });
    $navbars.on('click', '.bropdown-back > a', function navbarDropItemBackClick(e) {
        toggleSubmenu(false, $(this).parent().parent().parent());
        updateSideNavDropdown($(this));
        e.preventDefault();
    });
}

export { initNavbarDropEffect1 };
