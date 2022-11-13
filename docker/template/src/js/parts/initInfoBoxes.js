import { $, tween, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/
function initInfoBoxes() {
    const self = this;

    // close
    $doc.on('click', '.nk-info-box .nk-info-box-close', function onInfoboxCloseClick(e) {
        e.preventDefault();
        const $box = $(this).parents('.nk-info-box:eq(0)');
        tween.to($box, {
            opacity: 0,
            duration: 0.3,
            onComplete() {
                tween.to($box, {
                    height: 0,
                    padding: 0,
                    margin: 0,
                    duration: 0.3,
                    display: 'none',
                    onComplete() {
                        self.debounceResize();
                    },
                });
            },
        });
    });
}

export { initInfoBoxes };
