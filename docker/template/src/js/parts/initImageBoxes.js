import { $, tween, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Image Boxes

-------------------------------------------------------------------*/
function initImageBoxes() {
    // overlay smart show
    $doc.on('mouseenter mouseleave', '.nk-image-box-4', function onImageBoxMouseEnterLeave(e) {
        const $overlay = $(this).find('.nk-image-box-overlay');
        const itemRect = $(this)[0].getBoundingClientRect();

        // detect mouse enter or leave
        const x = (itemRect.width / 2 - e.clientX + itemRect.left) / (itemRect.width / 2);
        const y = (itemRect.height / 2 - e.clientY + itemRect.top) / (itemRect.height / 2);
        const enter = e.type === 'mouseenter';
        let endX = '0%';
        let endY = '0%';
        if (Math.abs(x) > Math.abs(y)) {
            endX = (x > 0 ? '-10' : '10') + endX;
        } else {
            endY = (y > 0 ? '-10' : '10') + endY;
        }

        if (enter) {
            tween.set($overlay, {
                x: endX,
                y: endY,
            });
        }
        tween.to($overlay, {
            x: enter ? '0%' : endX,
            y: enter ? '0%' : endY,
            duration: 0.25,
            display: enter ? 'flex' : 'none',
            ease: Power1.easeInOut,
            force3D: true,
        });
    });
}

export { initImageBoxes };
