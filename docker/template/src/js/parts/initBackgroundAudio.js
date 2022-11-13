import hasLocalStorage from 'has-localstorage';

import { $, $wnd, isMobile } from './_utility';

// We need this to prevent JS error in the iframe in Incognito mode.
const localStorage = hasLocalStorage() ? window.localStorage : false;

/*------------------------------------------------------------------

  Init Background Audio

-------------------------------------------------------------------*/
function initBackgroundAudio() {
    const self = this;
    const $toggle = $('.nk-bg-audio-toggle');
    const $audio = $('.nk-page-background-audio');

    if (!($audio.length || self.options.backgroundMusic) || typeof soundManager === 'undefined') {
        $toggle.hide();
        return;
    }
    let api;

    let audio;
    let audioVolume;
    let audioAutoplay;
    let audioLoop;
    let pauseOnPageLeave;

    if ($audio.length) {
        audio = $audio.attr('data-audio');
        audioVolume = $audio.attr('data-audio-volume') || 100;
        audioAutoplay = $audio.attr('data-audio-autoplay') !== 'false';
        audioLoop = $audio.attr('data-audio-loop') !== 'false';
        pauseOnPageLeave = $audio.attr('data-audio-pause-on-page-leave') !== 'false';

    // deprecated.
    } else if (self.options.backgroundMusic) {
        console.warn('Deprecated background audio from Godlike JS init options. Please, use `data-audio` block on the page.');

        audio = self.options.backgroundMusic;
        audioVolume = self.options.backgroundMusicVolume;
        audioAutoplay = self.options.backgroundMusicAutoplay;
        audioLoop = self.options.backgroundMusicLoop;
        pauseOnPageLeave = true;
    }

    // hide / show play icon
    $toggle.find('.nk-bg-audio-play-icon').hide();

    function saveParams() {
        if (api && localStorage) {
            localStorage.nkBackgroundAudio = JSON.stringify({
                playing: !api.paused && api.playState,
                progress: api.position,
            });
        }
    }
    // save on close window and every 20 seconds
    $wnd.on('unload', saveParams);
    setInterval(saveParams, 20000);

    function getParams() {
        let params = {
            playing: audioAutoplay,
            progress: 0,
        };

        // restore local data
        if (localStorage && typeof localStorage.nkBackgroundAudio !== 'undefined') {
            const storedData = JSON.parse(localStorage.nkBackgroundAudio);
            params = $.extend(params, storedData);
        }

        // prevent autoplay on mobile devices
        if (isMobile) {
            params.playing = false;
        }

        return params;
    }

    function onPlay() {
        $toggle.find('.nk-bg-audio-play-icon').hide();
        $toggle.find('.nk-bg-audio-pause-icon').show();
    }
    function onStop() {
        $toggle.find('.nk-bg-audio-pause-icon').hide();
        $toggle.find('.nk-bg-audio-play-icon').show();
    }


    const params = getParams();

    // toggle button if autoplay
    if (params.playing) {
        onPlay();
    } else {
        onStop();
    }

    // fade
    let fadeInterval;
    function fadeOut() {
        let volume = api.volume;
        const dur = 1000;
        const toVol = 0;
        const interval = dur / Math.abs(volume - toVol);
        clearInterval(fadeInterval);
        fadeInterval = setInterval(() => {
            volume = volume > toVol ? volume - 1 : volume + 1;
            api.setVolume(volume);
            if (volume === toVol) {
                clearInterval(fadeInterval);
                api.pause();
            }
        }, interval);
    }
    function fadeIn() {
        let volume = 0;
        const dur = 1000;
        const toVol = audioVolume;
        const interval = dur / Math.abs(volume - toVol);
        api.play({
            url: audio,
        });
        api.setVolume(volume);

        clearInterval(fadeInterval);
        fadeInterval = setInterval(() => {
            volume = volume > toVol ? volume - 1 : volume + 1;
            api.setVolume(volume);
            if (volume === toVol) {
                clearInterval(fadeInterval);
            }
        }, interval);
    }

    soundManager.onready(() => {
        let firstLoad = 1;
        api = soundManager.createSound({
            onplay() {
                onPlay();
            },
            onresume() {
                onPlay();
            },
            onpause() {
                onStop();
            },
            onstop() {
                onStop();
            },
            volume: audioVolume,
            onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            },
            onfinish() {
                if (audioLoop) {
                    api.play();
                }
            },
            onbufferchange() {
                // move to saved progress position on first load
                if (firstLoad && api.duration) {
                    firstLoad = 0;
                    api.setPosition(params.progress);
                }
            },
        });

        // autoplay
        if (params.playing) {
            fadeIn();
        }

        // play / pause
        $toggle.on('click', () => {
            if (api.paused || !api.playState) {
                fadeIn();
            } else {
                api.pause();
            }
        });

        // window focus / blur
        if (pauseOnPageLeave) {
            let pausedOnBlur = false;
            $wnd.on('blur focus', (e) => {
                // timeout for FireFox
                setTimeout(() => {
                    if (e.type === 'blur') {
                        // don't pause the background audio when clicked on iframe.
                        if (document.activeElement && document.activeElement.nodeName === 'IFRAME') {
                            return;
                        }
                        if (!api.paused && api.playState) {
                            pausedOnBlur = true;
                            fadeOut();
                        }
                    } else if (pausedOnBlur) {
                        pausedOnBlur = false;
                        fadeIn();
                    }
                }, 0);
            });
        }
    });
}

export { initBackgroundAudio };
