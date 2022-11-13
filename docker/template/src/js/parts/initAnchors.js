import {
    $, $wnd, $doc, wndH,
} from './_utility';

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors() {
    const self = this;

    // click on anchors
    const $leftSide = $('.nk-navbar-left-side');
    const $rightSide = $('.nk-navbar-right-side');
    function closeNavs() {
        self.closeSide($leftSide);
        self.closeSide($rightSide);
        self.closeFullscreenNavbar();
    }
    $doc.on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function anchorsOnClick(e) {
        const isHash = this.hash;
        const isURIsame = this.baseURI === window.location.href;

        if (isHash && isURIsame) {
            // sometimes hashs have no valid selector like ##hash, it will throw errors
            try {
                const $hashBlock = $(isHash);
                const hash = isHash.replace(/^#/, '');

                if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
                    // close navigations
                    closeNavs();

                    // scroll to block
                    self.scrollTo($hashBlock.length ? $hashBlock : hash);

                    e.preventDefault();
                }
                // eslint-disable-next-line
            } catch (ev) {}
        }
    });

    // add active class on navbar items
    const $anchorItems = $('.nk-navbar .nk-nav > li > a[href*="#"]');
    const anchorBlocks = [];
    function hashInArray(item) {
        for (let k = 0; k < anchorBlocks.length; k++) {
            if (anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function eachAnchors() {
        const hash = this.hash.replace(/^#/, '');
        if (!hash) {
            return;
        }

        const $item = $(this).parent();
        const $block = $(`#${hash}`);

        if (hash && $block.length || hash === 'top') {
            const inArray = hashInArray(hash);
            if (inArray === false) {
                anchorBlocks.push({
                    hash,
                    $item,
                    $block,
                });
            } else {
                anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
            }
        }
    });
    // prepare anchor list and listen for scroll to activate items in navbar
    function updateAnchorItemsPositions() {
        for (let k = 0; k < anchorBlocks.length; k++) {
            const item = anchorBlocks[k];
            let blockTop = 0;
            let blockH = wndH;
            if (item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - wndH / 2;
            item.deactivate = blockTop + blockH - wndH / 2;
        }
    }
    function setAnchorActiveItem(type, ST) {
        for (let k = 0; k < anchorBlocks.length; k++) {
            const item = anchorBlocks[k];
            const active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if (anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', $wnd.scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}

export { initAnchors };
