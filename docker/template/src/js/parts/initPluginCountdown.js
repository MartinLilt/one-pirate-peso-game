import { $ } from './_utility';

/* Countdown */
function initPluginCountdown() {
    if (typeof $.fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
        return;
    }
    const self = this;

    $('.nk-countdown').each(function eachCountdown() {
        const tz = $(this).attr('data-timezone');
        let end = $(this).attr('data-end');
        end = moment.tz(end, tz).toDate();

        $(this).countdown(end, function onCountdownTick(event) {
            $(this).html(event.strftime(self.options.templates.countdown));
        });
    });
}

export { initPluginCountdown };
