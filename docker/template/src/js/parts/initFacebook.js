import { $, $body } from './_utility';

/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/
function initFacebook() {
    if (!$('.fb-page').length) {
        return;
    }
    $body.append('<div id="fb-root"></div>');

    (function facebookClosure(d, s, id) {
        if (window.location.protocol === 'file:') {
            return;
        }
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        const js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export { initFacebook };
