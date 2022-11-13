import { $ } from './_utility';

/*------------------------------------------------------------------

  Shortcuts
  https://github.com/madrobby/keymaster

-------------------------------------------------------------------*/
function key(name, fn) {
    if (typeof window.key === 'undefined') {
        return;
    }
    name = this.options && this.options.shortcuts && this.options.shortcuts[name];

    if (name) {
        window.key(name, fn);
    }
}
function initShortcuts() {
    if (typeof window.key === 'undefined' || !this.options.enableShortcuts) {
        return;
    }

    const self = this;

    // Search
    self.key('toggleSearch', () => {
        self.toggleSearch();
    });
    self.key('openSearch', () => {
        self.openSearch();
    });
    self.key('closeSearch', () => {
        self.closeSearch();
    });

    // Cart
    self.key('toggleCart', () => {
        self.toggleCart();
    });
    self.key('openCart', () => {
        self.openCart();
    });
    self.key('closeCart', () => {
        self.closeCart();
    });

    // Sign Form
    self.key('toggleSignForm', () => {
        self.toggleSignForm();
    });
    self.key('openSignForm', () => {
        self.openSignForm();
    });
    self.key('closeSignForm', () => {
        self.closeSignForm();
    });

    // FullScreen Video
    self.key('closeFullscreenVideo', () => {
        if (self.closeFullScreenVideo) {
            self.closeFullScreenVideo();
        }
    });

    // post single
    self.key('postLike', () => {
        if ($('.nk-blog-post-single').length) {
            $('.nk-action-heart:not(.liked):eq(0), .nk-action-like:eq(0) .like-icon').eq(0).click();
        }
    });
    self.key('postDislike', () => {
        if ($('.nk-blog-post-single').length) {
            $('.nk-action-heart.liked:eq(0), .nk-action-like:eq(0) .dislike-icon').eq(0).click();
        }
    });
    self.key('postScrollToComments', () => {
        const $comments = $('#comments');
        if ($comments.length) {
            self.scrollTo($comments);
        }
    });

    // Side Left Navbar
    const $leftSide = $('.nk-navbar-left-side');
    self.key('toggleSideLeftNavbar', () => {
        self.toggleSide($leftSide);
    });
    self.key('openSideLeftNavbar', () => {
        self.openSide($leftSide);
    });
    self.key('closeSideLeftNavbar', () => {
        self.closeSide($leftSide);
    });

    // Side Right Navbar
    const $rightSide = $('.nk-navbar-right-side');
    self.key('toggleSideRightNavbar', () => {
        self.toggleSide($rightSide);
    });
    self.key('openSideRightNavbar', () => {
        self.openSide($rightSide);
    });
    self.key('closeSideRightNavbar', () => {
        self.closeSide($rightSide);
    });

    // Fullscreen Navbar
    self.key('toggleFullscreenNavbar', () => {
        self.toggleFullscreenNavbar();
    });
    self.key('openFullscreenNavbar', () => {
        self.openFullscreenNavbar();
    });
    self.key('closeFullscreenNavbar', () => {
        self.closeFullscreenNavbar();
    });

    // ESC - use also inside form elements
    window.key.filter = (event) => {
        const tagName = (event.target || event.srcElement).tagName;
        const isContentEditable = (event.target || event.srcElement).getAttribute('contenteditable');
        const isESC = window.key.isPressed('esc');
        return isESC || !(isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
    };
}

export { key, initShortcuts };
