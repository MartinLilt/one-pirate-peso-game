import {
    $, tween, $doc, $body, wndW, wndH, isMobile,
} from './_utility';

/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/
function initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    const self = this;

    // open fullscreen videos
    let openedFSVideo;
    self.openFullScreenVideo = (url) => {
        if (isMobile) {
            window.open(url);
            return;
        }

        if (openedFSVideo) {
            return;
        }
        openedFSVideo = 1;

        // get api for this video
        self.FullScreenVideoApi = new VideoWorker(url, {
            autoplay: 1,
            loop: 0,
            mute: 0,
            controls: 1,
        });

        // set video size
        function setVideoSize() {
            const ratio = 16 / 9;
            let resultW;
            let resultH;

            if (ratio > wndW / wndH) {
                resultW = wndW * 0.9;
                resultH = resultW / ratio;
            } else {
                resultH = wndH * 0.9;
                resultW = resultH * ratio;
            }
            self.FullScreenVideoWrapper.css({
                width: resultW,
                height: resultH,
                top: (wndH - resultH) / 2,
                left: (wndW - resultW) / 2,
            });
        }

        // create fullscreen video wrapper if doesn't exist
        if (!self.FullScreenVideo) {
            self.FullScreenVideo = $('<div class="nk-video-fullscreen"></div>').appendTo($body);

            self.closeFullScreenVideo = () => {
                if (openedFSVideo) {
                    openedFSVideo = 0;

                    self.FullScreenVideoApi.pause();

                    // hide animation
                    tween.to(self.FullScreenVideo, {
                        opacity: 0,
                        duration: 0.4,
                        display: 'none',
                        force3D: true,
                        onComplete() {
                            self.FullScreenVideoWrapper.html('');
                        },
                    });
                    tween.to(self.FullScreenVideoWrapper, {
                        scale: 0.9,
                        duration: 0.4,
                        force3D: true,
                    });

                    // restore body scrolling
                    self.bodyOverflow(0);
                }
            };

            // close icon
            $(`<div class="nk-video-fullscreen-close">${self.options.templates.fullscreenVideoClose}</div>`)
                .on('click', self.closeFullScreenVideo)
                .appendTo(self.FullScreenVideo);

            // video container
            self.FullScreenVideoWrapper = $('<div class="nk-video-fullscreen-cont"></div>').appendTo(self.FullScreenVideo);

            setVideoSize();
            self.debounceResize(setVideoSize);
        }

        // check api and run fullscreen
        if (self.FullScreenVideoApi && self.FullScreenVideoApi.isValid()) {
            self.FullScreenVideoApi.getIframe((iframe) => {
                const $parent = $(iframe).parent();

                // fix Vimeo fullscreen features.
                iframe.setAttribute('webkitAllowFullScreen', '');
                iframe.setAttribute('mozAllowFullScreen', '');
                iframe.setAttribute('allowFullScreen', '');

                self.FullScreenVideoWrapper.append(iframe);
                $parent.remove();

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }

                // show animation
                tween.fromTo(self.FullScreenVideo, {
                    opacity: 0,
                    duration: 0.4,
                }, {
                    opacity: 1,
                    display: 'block',
                });
                tween.fromTo(self.FullScreenVideoWrapper, {
                    opacity: 0,
                    duration: 0.4,
                    scale: 0.9,
                }, {
                    opacity: 1,
                    scale: 1,
                    delay: 0.3,
                });

                // prevent body scrolling
                self.bodyOverflow(1);
            });
        }
    };
    $doc.on('click', '.nk-video-fullscreen-toggle', function videoFullscreenTogglerClick(e) {
        e.preventDefault();
        self.openFullScreenVideo($(this).attr('href'));
    });


    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon || self.options.templates.plainVideoIcon);
    }
    $('.nk-plain-video[data-video]').each(function plainVideoClick() {
        const $plainCont = $(this);
        let $plainIframe;
        const url = $(this).attr('data-video');
        const thumb = $(this).attr('data-video-thumb');
        const api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1,
        });

        if (api && api.isValid()) {
            let loaded = 0;
            let clicked = 0;

            // add play event
            $plainCont.on('click', () => {
                if (isMobile) {
                    window.open(api.url);
                    return;
                }

                if (clicked) {
                    return;
                }
                clicked = 1;

                // add loading button
                if (!loaded) {
                    addPlainLoadButton($plainCont);

                    api.getIframe((iframe) => {
                        // add iframe
                        $plainIframe = $(iframe);

                        // fix Vimeo fullscreen features.
                        iframe.setAttribute('webkitAllowFullScreen', '');
                        iframe.setAttribute('mozAllowFullScreen', '');
                        iframe.setAttribute('allowFullScreen', '');

                        const $parent = $plainIframe.parent();
                        tween.set(iframe, {
                            opacity: 0,
                            left: '100%',
                        });
                        $plainIframe.appendTo($plainCont);
                        $parent.remove();
                        api.play();
                    });
                } else {
                    api.play();
                }
            });

            // add play button
            $plainCont.append('<span class="nk-video-plain-toggle"></span>');
            addPlainPlayButton($plainCont);

            // set thumb
            if (thumb) {
                $plainCont.css('background-image', `url("${thumb}")`);
            } else {
                api.getImageURL((imgSrc) => {
                    $plainCont.css('background-image', `url("${imgSrc}")`);
                });
            }

            if (isMobile) {
                return;
            }

            api.on('ready', () => {
                api.play();
            });
            api.on('play', () => {
                tween.set($plainIframe, {
                    left: 0,
                });
                tween.to($plainIframe, {
                    opacity: 1,
                    duration: 0.5,
                    force3D: true,
                    onComplete() {
                        // add play button
                        if (!loaded) {
                            addPlainPlayButton($plainCont);
                            loaded = 1;
                        }
                    },
                });

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
        }
    });
}

export { initVideoBlocks };
