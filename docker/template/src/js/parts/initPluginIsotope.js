import { $ } from './_utility';

/* Isotope */
function initPluginIsotope() {
    if (typeof window.Isotope === 'undefined') {
        return;
    }
    const self = this;

    $('.nk-isotope').each(function eachIsotope() {
        const $grid = $(this).isotope({
            itemSelector: '.nk-isotope-item',
        });

        if (typeof $.fn.imagesLoaded !== 'undefined') {
            $grid.imagesLoaded().progress(() => {
                $grid.isotope('layout');
            });
        }

        $grid.on('arrangeComplete', () => {
            self.debounceResize();
        });

        // filter
        const $filter = $(this).prev('.nk-isotope-filter');
        if ($filter.length) {
            $filter.on('click', '[data-filter]', function isotopeFilterOnClick(e) {
                e.preventDefault();
                const filter = $(this).attr('data-filter');

                $(this).addClass('active').siblings().removeClass('active');

                $grid.isotope({
                    filter: filter === '*' ? '' : `[data-filter*=${filter}]`,
                });
            });
        }
    });
}

export { initPluginIsotope };
