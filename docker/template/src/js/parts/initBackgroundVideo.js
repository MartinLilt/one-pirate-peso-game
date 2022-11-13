import {
    $, $wnd, wndW, wndH, debounceResize,
} from './_utility';

/*------------------------------------------------------------------

  Init Background Video

-------------------------------------------------------------------*/
function initBackgroundVideo() {
    const $bg = $('.nk-page-background');
    if (!$bg.length || typeof window.VideoWorker === 'undefined') {
        return;
    }

    function resizeVideo($video, api) {
        if (!$video || !$video[0]) {
            return;
        }

        // native video size
        const vW = api.videoWidth || 1280;
        const vH = api.videoHeight || 720;
        let styles = {};

        if (wndW / vW > wndH / vH) {
            styles = {
                width: wndW,
                height: vH * wndW / vW,
                marginTop: (wndH - vH * wndW / vW) / 2,
                marginLeft: 0,
            };
        } else {
            styles = {
                width: vW * wndH / vH,
                height: wndH,
                marginTop: 0,
                marginLeft: (wndW - vW * wndH / vH) / 2,
            };
        }

        // hide progress bar
        styles.marginTop -= 220;
        styles.height += 440;

        $video.css(styles);
    }

    $bg.each(function eachBackground() {
        const $this = $(this);
        let url = $this.attr('data-video') || '';
        const loop = $this.attr('data-video-loop') !== 'false';
        const mute = $this.attr('data-video-mute') !== 'false';
        const volume = parseInt($this.attr('data-video-volume'), 10) || 0;
        const startTime = parseInt($this.attr('data-video-start-time'), 10) || 0;
        const endTime = parseInt($this.attr('data-video-end-time'), 10) || 0;
        const pauseOnPageLeave = $this.attr('data-video-pause-on-page-leave') !== 'false';

        // deprecated syntax
        if (!url) {
            console.warn('Deprecated background video attributes `data-bg-*`. Please, use `data-video` attribute instead.');

            url = [];
            const mp4 = $this.attr('data-bg-mp4') || '';
            const webm = $this.attr('data-bg-webm') || '';
            const ogv = $this.attr('data-bg-ogv') || '';
            const poster = $this.attr('data-bg-poster') || '';

            if (mp4) {
                url.push(`mp4:${mp4}`);
            }
            if (webm) {
                url.push(`webm:${webm}`);
            }
            if (ogv) {
                url.push(`ogv:${ogv}`);
            }
            url = url.join(',');

            // add background image
            if (poster) {
                $this.css({
                    'background-image': `url("${poster}")`,
                });
            }
        }

        // play video
        if (url) {
            const api = new VideoWorker(url, {
                autoplay: 1,
                controls: 0,
                loop,
                mute,
                volume,
                startTime,
                endTime,
            });

            if (api && api.isValid()) {
                // add API to the dom element.
                this.VideoWorkerAPI = api;

                let $video;
                api.getIframe((iframe) => {
                    // add iframe
                    $video = $(iframe);
                    const $parent = $video.parent();
                    $video.appendTo($this);
                    $parent.remove();
                    resizeVideo($video, api);
                });

                api.on('started', () => {
                    $this.addClass('nk-page-background-loaded');
                    resizeVideo($video, api);
                });

                // cover video on resize
                debounceResize(() => {
                    resizeVideo($video, api);
                });

                if (pauseOnPageLeave) {
                    $wnd.on('blur focus', (e) => {
                        // timeout for FireFox
                        setTimeout(() => {
                            // don't pause the background video when clicked on iframe.
                            if (document.activeElement && document.activeElement.nodeName === 'IFRAME') {
                                return;
                            }

                            if (e.type === 'blur') {
                                api.pause();
                            } else {
                                api.play();
                            }
                        }, 0);
                    });
                }
            }
        }
    });
}

export { initBackgroundVideo };
