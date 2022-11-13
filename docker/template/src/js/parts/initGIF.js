import { $, wndH } from './_utility';

/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/
function initGIF() {
    const self = this;

    // load gif in background
    function loadGif(url, cb) {
        const temp = new Image();
        temp.onload = () => {
            cb();
        };
        temp.src = url;
    }

    // play gif
    function playGif(item) {
        const $item = $(item);
        if (!item.gifPlaying) {
            item.gifPlaying = true;
            if (item.khGifLoaded) {
                $item.addClass('nk-gif-playing');
                $item.find('img').attr('src', $item.find('img').attr('data-gif'));
            } else if (!item.khGifLoading) {
                item.khGifLoading = 1;
                $item.addClass('nk-gif-loading');
                loadGif($item.find('img').attr('data-gif'), () => {
                    item.khGifLoaded = 1;
                    $item.removeClass('nk-gif-loading');
                    if (item.gifPlaying) {
                        item.gifPlaying = false;
                        playGif(item);
                    }
                });
            }
        }
    }

    // stop playing gif
    function stopGif(item) {
        const $item = $(item);
        if (item.gifPlaying) {
            item.gifPlaying = false;
            $item.removeClass('nk-gif-playing');
            $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
        }
    }

    // prepare gif containers
    $('.nk-gif').each(function eachGif() {
        const $this = $(this);
        // add toggle button
        $this.append(`<a class="nk-gif-toggle">${self.options.templates.gifIcon}</a>`);

        // add loading circle
        $this.append('<div class="nk-loading-spinner"><i></i></div>');

        $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
    });

    // hover gif
    $('.nk-gif-hover')
        .on('mouseenter', function gifOnMouseEnter() {
            $(this).addClass('hover');
            playGif(this);
        })
        .on('mouseleave', function gifOnMouseLeave() {
            $(this).removeClass('hover');
            stopGif(this);
        });

    // click gif
    $('.nk-gif-click').on('click', function gifOnClick() {
        if (this.gifPlaying) {
            $(this).removeClass('hover');
            stopGif(this);
        } else {
            $(this).addClass('hover');
            playGif(this);
        }
    });

    // autoplay in viewport
    const $gifVP = $('.nk-gif-viewport');
    if ($gifVP.length) {
        self.throttleScroll(() => {
            $gifVP.each(function eachGifInVeiwport() {
                const inVP = self.isInViewport($(this), 1);
                if (inVP[0]) {
                    if (inVP[1].height / wndH < 0.7) {
                        if (inVP[0] === 1) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    } else if (inVP[0] >= 0.7) {
                        playGif(this);
                    } else {
                        stopGif(this);
                    }
                } else {
                    stopGif(this);
                }
            });
        });
    }

    // autoplay gif
    $('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function eachGifAutoplay() {
        playGif(this);
    });
}

export { initGIF };
