import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar() {
    if (typeof $.fn.stick_in_parent === 'undefined') {
        return;
    }

    $('.nk-sidebar-sticky').each(function eachStickySidebar() {
        const $this = $(this);
        const $parent = $this.parent();

        $parent.addClass('nk-sidebar-sticky-parent');

        $this.wrapInner('<div>').children().stick_in_parent({
            parent: $parent,
            recalc_every: 50,
            offset_top: parseInt($this.attr('data-offset-top'), 10) || 50,

            // fixed ADS reloading issue https://github.com/leafo/sticky-kit/issues/45
            spacer: false,
        })

        // we need to set min height on parent block (in theme it is equal height column) to prevent sidebar content jumping
            .on('sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom', function onStick() {
                $parent.css('min-height', $(this).height());
            })
            .on('sticky_kit:unstick', () => {
                $parent.css('min-height', '');
            });
    });
}

export { initPluginStickySidebar };
