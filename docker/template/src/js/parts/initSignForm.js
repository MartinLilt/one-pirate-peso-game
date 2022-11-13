import {
    $, tween, $wnd, $doc,
} from './_utility';

/*------------------------------------------------------------------

  Init Sign Form

-------------------------------------------------------------------*/
function initSignForm() {
    const self = this;
    const $signForm = $('.nk-sign-form');
    const $signFormContainer = $signForm.find('.nk-sign-form-container');
    const $signToggle = $('.nk-sign-toggle');
    const $nav = $('.nk-navbar-top');
    let navRect;
    let isOpened;

    // show / hide block with form
    self.toggleSignForm = () => {
        self[`${isOpened ? 'close' : 'open'}SignForm`]();
    };

    // show block with form
    self.openSignForm = () => {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        // active all togglers
        $signToggle.addClass('active');

        // add form top position
        navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0;

        // set top position and animate
        tween.set($signForm, {
            paddingTop: navRect ? navRect.bottom : 0,
        });
        tween.set($signFormContainer, {
            y: -10,
            opacity: 0,
        });
        tween.to($signForm, {
            opacity: 1,
            duration: 0.5,
            display: 'block',
            force3D: true,
        });
        tween.to($signFormContainer, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.4,
            force3D: true,
        });

        // open form block
        $signForm.addClass('open');

        // prevent body scrolling
        self.bodyOverflow(1);

        // trigger event
        $wnd.trigger('nk-open-sign-form', [$signForm]);
    };

    // hide block with form
    self.closeSignForm = (dontTouchBody) => {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        // deactive all togglers
        $signToggle.removeClass('active');

        tween.to($signForm, {
            opacity: 0,
            duration: 0.5,
            display: 'none',
            force3D: true,
            onComplete() {
                if (!dontTouchBody) {
                    // restore body scrolling
                    self.bodyOverflow(0);
                }
            },
        });

        // open form block
        $signForm.removeClass('open');

        // trigger event
        $wnd.trigger('nk-close-sign-form', [$signForm]);
    };

    $doc.on('click', '.nk-sign-toggle', (e) => {
        self.toggleSignForm();
        e.preventDefault();
    });
    $wnd.on('nk-open-full-navbar nk-open-search-block nk-open-cart', () => {
        self.closeSignForm(1);
    });

    // show / hide forms
    const $formLost = $signForm.find('.nk-sign-form-lost');
    const $formLogin = $signForm.find('.nk-sign-form-login');
    const $formRegister = $signForm.find('.nk-sign-form-register');
    const $toggles = $signForm.find('.nk-sign-form-lost-toggle, .nk-sign-form-login-toggle, .nk-sign-form-register-toggle');

    function animateForms($showItems, inverse = false) {
        const $hideItems = $formLost.filter('.active').add($formRegister.filter('.active')).add($formLogin.filter('.active'));
        tween.set($hideItems, {
            position: 'absolute',
            display: 'block',
            x: 0,
        });
        tween.set($showItems, {
            position: 'absolute',
            display: 'none',
            x: inverse ? '-60%' : '60%',
        });
        tween.to($hideItems, {
            opacity: 0,
            duration: 0.2,
            x: inverse ? '60%' : '-60%',
            display: 'none',
            force3D: true,
        });
        tween.to($showItems, {
            opacity: 1,
            duration: 0.2,
            display: 'block',
            x: '0%',
            force3D: true,
            onComplete() {
                tween.set($showItems, {
                    position: 'relative',
                });
            },
        });
        $hideItems.removeClass('active');
        $showItems.addClass('active');
    }

    $toggles.on('click', function (e) {
        e.preventDefault();

        const $this = $(this);

        if ($this.hasClass('active')) {
            return;
        }

        if ($this.hasClass('nk-sign-form-login-toggle')) {
            animateForms($formLogin, true);
        } else if ($this.hasClass('nk-sign-form-lost-toggle')) {
            animateForms($formLost);
        } else if ($this.hasClass('nk-sign-form-register-toggle')) {
            animateForms($formRegister);
        }

        $toggles.removeClass('active');
        $this.addClass('active');
    });
}

export { initSignForm };
