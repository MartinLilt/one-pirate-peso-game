/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
const options = {
    enableSearchAutofocus: true,
    enableActionLikeAnimation: true,
    enableShortcuts: true,
    enableFadeBetweenPages: true,
    enableMouseParallax: true,
    enableCookieAlert: true,
    scrollToAnchorSpeed: 700,
    parallaxSpeed: 0.6,

    templates: {
        secondaryNavbarBackItem: 'Back',

        likeAnimationLiked: 'Liked!',
        likeAnimationDisliked: 'Disliked!',

        cookieAlert:
            `<span class="nk-cookie-alert-close"><span class="nk-icon-close"></span></span>
            Cookie alert are ready to use. You can simply change content inside this alert or disable it in javascript theme options. <a href="#">Cookies policy</a>.
            <div class="nk-gap"></div>
            <span class="nk-cookie-alert-confirm nk-btn link-effect-4 nk-btn-bg-white nk-btn-color-dark-1">Confirm</span>`,

        plainVideoIcon: '<span class="nk-video-icon"><i class="fa fa-play pl-5"></i></span>',
        plainVideoLoadIcon: '<span class="nk-loading-spinner"><i></i></span>',
        fullscreenVideoClose: '<span class="nk-icon-close"></span>',
        gifIcon: '<span class="nk-gif-icon"><i class="fa fa-hand-pointer-o"></i></span>',

        audioPlainButton:
            `<div class="nk-audio-plain-play-pause">
                <span class="nk-audio-plain-play">
                    <span class="ion-play ml-3"></span>
                </span>
                <span class="nk-audio-plain-pause">
                    <span class="ion-pause"></span>
                </span>
            </div>`,

        instagram:
            `<div class="col-4">
                <a href="{{link}}" target="_blank">
                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">
                </a>
            </div>`,
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter:
            `<div class="nk-twitter">
                <span class="nk-twitter-icon fa fa-twitter"></span>
                <div class="nk-twitter-text">
                   {{tweet}}
                </div>
                <div class="nk-twitter-date">
                    <span>{{date}}</span>
                </div>
            </div>`,
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown:
            `<div>
                <span>%D</span>
                Days
            </div>
            <div>
                <span>%H</span>
                Hours
            </div>
            <div>
                <span>%M</span>
                Minutes
            </div>
            <div>
                <span>%S</span>
                Seconds
            </div>`,
    },

    shortcuts: {
        toggleSearch: 's',
        showSearch: '',
        closeSearch: 'esc',

        toggleCart: 'p',
        showCart: '',
        closeCart: 'esc',

        toggleSignForm: 'f',
        showSignForm: '',
        closeSignForm: 'esc',

        closeFullscreenVideo: 'esc',

        postLike: 'l',
        postDislike: 'd',
        postScrollToComments: 'c',

        toggleSideLeftNavbar: 'alt+l',
        openSideLeftNavbar: '',
        closeSideLeftNavbar: 'esc',

        toggleSideRightNavbar: 'alt+r',
        openSideRightNavbar: '',
        closeSideRightNavbar: 'esc',

        toggleFullscreenNavbar: 'alt+f',
        openFullscreenNavbar: '',
        closeFullscreenNavbar: 'esc',
    },
    events: {
        actionHeart(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(() => {
                const result = params.currentNum + (params.type === 'like' ? 1 : -1);
                params.updateNum(result);
            }, 300);
        },
        actionLike(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(() => {
                let additional = 0;
                if (params.type === 'like') {
                    if (params.isLiked) {
                        additional = -2;
                    }
                    if (params.isDisliked) {
                        additional = 1;
                    }
                }
                if (params.type === 'dislike') {
                    if (params.isLiked) {
                        additional = -1;
                    }
                    if (params.isDisliked) {
                        additional = 2;
                    }
                }
                const result = params.currentNum + (params.type === 'like' ? 1 : -1) + additional;
                params.updateNum(result);
            }, 300);
        },
    },
};

export { options };
