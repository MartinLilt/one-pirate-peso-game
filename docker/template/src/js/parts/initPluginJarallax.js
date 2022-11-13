import { $ } from './_utility';

/* Jarallax */
function initPluginJarallax() {
    if (typeof $.fn.jarallax === 'undefined') {
        return;
    }
    const self = this;

    // video backgrounds
    $('.bg-video[data-video]').each(function () {
        $(this).attr('data-jarallax-video', $(this).attr('data-video'));
        $(this).removeAttr('data-video');
    });

    // header parallax
    const $parallaxHeader = $('.nk-header-title-parallax').eq(0);
    if ($parallaxHeader.length) {
        const $headerImageOrVideo = $parallaxHeader.find('> .bg-image, > .bg-video').eq(0);
        const $headerContent = $headerImageOrVideo.find('~ *');
        const options = {
            speed: self.options.parallaxSpeed,
        };

        $headerImageOrVideo.addClass('bg-image-parallax');

        if ($parallaxHeader.hasClass('nk-header-title-parallax-opacity')) {
            $headerImageOrVideo.attr('data-type', 'scroll-opacity');
        }

        options.onScroll = (calc) => {
            let scrollContent = Math.min(50, 50 * (1 - calc.visiblePercent));

            // fix if top banner not on top
            if (calc.beforeTop > 0) {
                scrollContent = 0;
            }

            $headerContent.css({
                opacity: calc.visiblePercent < 0 || calc.beforeTop > 0 ? 1 : calc.visiblePercent,
                transform: `translateY(${scrollContent}px) translateZ(0)`,
            });
        };

        $headerImageOrVideo.jarallax(options);
    }

    // footer parallax
    const $parallaxFooter = $('.nk-footer-parallax, .nk-footer-parallax-opacity').eq(0);
    if ($parallaxFooter.length) {
        const $footerImage = $parallaxFooter.find('> .bg-image > div');
        const $footerContent = $parallaxFooter.find('> .bg-image ~ *');
        const footerParallaxScroll = $parallaxFooter.hasClass('nk-footer-parallax');
        const footerParallaxOpacity = $parallaxFooter.hasClass('nk-footer-parallax-opacity');
        $parallaxFooter.jarallax({
            type: 'custom',
            imgSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            imgWidth: 1,
            imgHeight: 1,
            onScroll(calc) {
                const scrollImg = -Math.min(100, 100 * (1 - calc.visiblePercent));
                const scrollInfo = -Math.min(50, 50 * (1 - calc.visiblePercent));
                if (footerParallaxScroll) {
                    $footerImage.css({
                        transform: `translateY(${scrollImg}px) translateZ(0)`,
                    });
                    $footerContent.css({
                        transform: `translateY(${scrollInfo}px) translateZ(0)`,
                    });
                }
                if (footerParallaxOpacity) {
                    $footerContent.css({
                        opacity: calc.visiblePercent < 0 ? 1 : calc.visiblePercent,
                    });
                }
            },
        });
    }

    // primary parallax
    $('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed,
    });

    // video without parallax
    $('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1,
    });
}

export { initPluginJarallax };
