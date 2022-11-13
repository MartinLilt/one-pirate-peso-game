import {
    $, $wnd, $body, tween,
} from './_utility';

/*------------------------------------------------------------------

  Init Cookie Alert

-------------------------------------------------------------------*/
function initCookieAlert() {
    const self = this;
    const confirmedCookieName = 'nk_cookie_alert_dismissed';
    const expiration = 365;
    const showTimeout = 2000;

    // stop if already dismissed
    if (!self.options.enableCookieAlert || document.cookie.indexOf(confirmedCookieName) > -1 || window.navigator && window.navigator.CookiesOK) {
        return;
    }

    // create alert
    const $alert = $('<div class="nk-cookie-alert">').hide().append(self.options.templates.cookieAlert).appendTo($body);

    // hide alert
    function hideAlert() {
        tween.to($alert, {
            opacity: 0,
            duration: 0.5,
            display: 'none',
        });
    }

    // show alert
    function showAlert() {
        tween.set($alert, {
            opacity: 0,
            display: 'none',
            y: 20,
        });
        tween.to($alert, {
            opacity: 1,
            duration: 0.5,
            display: 'block',
            y: 0,
            force3D: true,
        });
    }

    // set cookie after confirmation
    function setConfirmed() {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiration);
        exdate = exdate.toUTCString();
        document.cookie = `${confirmedCookieName}=yes;expires=${exdate};path=/`;
    }

    $wnd.on('load', () => {
        setTimeout(showAlert, showTimeout);
    });
    $alert.on('click', '.nk-cookie-alert-confirm', () => {
        hideAlert();
        setConfirmed();
    });
    $alert.on('click', '.nk-cookie-alert-close', hideAlert);
}

export { initCookieAlert };
