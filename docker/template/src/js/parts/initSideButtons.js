import { $, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Side Buttons

-------------------------------------------------------------------*/
function initSideButtons() {
    const self = this;
    const $sideButtons = $('.nk-side-buttons');

    // hide on scroll
    self.throttleScroll((type, scroll) => {
        const start = 400;

        if (scroll > start) {
            $sideButtons.addClass('nk-side-buttons-show-scroll-top');
        } else {
            $sideButtons.removeClass('nk-side-buttons-show-scroll-top');
        }
    });

    // scroll top
    $doc.on('click', '.nk-scroll-top', (e) => {
        e.preventDefault();
        self.scrollTo('top');
    });
}

export { initSideButtons };
