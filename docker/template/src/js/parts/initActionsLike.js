import {
    $, tween, $doc, $body,
} from './_utility';

/*------------------------------------------------------------------

  Init Actions Like and Heart

-------------------------------------------------------------------*/
function initActionsLike() {
    const self = this;

    // like / dislike animation init
    let $likeAnimation;
    let $dislikeAnimation;
    if (self.options.enableActionLikeAnimation) {
        $likeAnimation = $(`<div class="nk-like-animation">${self.options.templates.likeAnimationLiked}</div>`).appendTo($body);
        $dislikeAnimation = $(`<div class="nk-dislike-animation">${self.options.templates.likeAnimationDisliked}</div>`).appendTo($body);
    }
    function runLikeAnimation(type) {
        const $animateItem = type === 'like' ? $likeAnimation : $dislikeAnimation;
        tween.set($animateItem, {
            scale: 1,
            opacity: 0,
        });
        tween.to($animateItem, {
            scale: 1.1,
            opacity: 0.5,
            duration: 0.3,
            display: 'block',
            ease: Power2.easeIn,
            force3D: true,
            onComplete() {
                tween.to($animateItem, {
                    scale: 1.2,
                    opacity: 0,
                    duration: 0.3,
                    display: 'none',
                    ease: Power2.easeOut,
                    force3D: true,
                });
            },
        });
    }

    // heart action
    $doc.on('click', '.nk-action-heart', function onActionHeartClick(e) {
        e.preventDefault();
        const $like = $(this);

        if ($like.hasClass('busy')) {
            return;
        }

        const $num = $like.find('.num');
        const type = $like.hasClass('liked') ? 'dislike' : 'like';
        const $parent = $like.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
        let updatedNum;
        let updatedIcon;
        $like.addClass('busy');
        self.options.events.actionHeart({
            $dom: $like,
            $parent,
            type,
            currentNum: parseInt($num.text(), 10),
            updateNum(num) {
                $num.text(num);
                updatedNum = 1;
                if (updatedNum && updatedIcon) {
                    $like.removeClass('busy');
                }
            },
            updateIcon() {
                $like[type === 'like' ? 'addClass' : 'removeClass']('liked');
                updatedIcon = 1;
                if (updatedNum && updatedIcon) {
                    $like.removeClass('busy');
                }

                // like / dislike animation
                if (self.options.enableActionLikeAnimation) {
                    runLikeAnimation(type);
                }
            },
        });
    });

    // like action
    $doc.on('click', '.nk-action-like .like-icon, .nk-action-like .dislike-icon', function onLikeClick(e) {
        e.preventDefault();
        const $like = $(this);
        const $parentLike = $like.parent();

        if ($parentLike.hasClass('busy')) {
            return;
        }

        const isLiked = $parentLike.hasClass('liked');
        const isDisliked = $parentLike.hasClass('disliked');
        const isDislike = $like.hasClass('dislike-icon');

        const $num = $parentLike.find('.num');
        const $parent = $parentLike.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
        const type = isDislike ? 'dislike' : 'like';
        let updatedNum;
        let updatedIcon;
        $parentLike.addClass('busy');
        self.options.events.actionLike({
            $dom: $like,
            $parent,
            type,
            isLiked,
            isDisliked,
            currentNum: parseInt($num.text(), 10),
            updateNum(num) {
                $num.text((num > 0 ? '+' : '') + num);
                updatedNum = 1;
                if (updatedNum && updatedIcon) {
                    $parentLike.removeClass('busy');
                }
            },
            updateIcon() {
                $parentLike.removeClass('liked disliked');
                if (!(isLiked && !isDislike || isDisliked && isDislike)) {
                    $parentLike.addClass(type === 'like' ? 'liked' : 'disliked');
                }
                updatedIcon = 1;
                if (updatedNum && updatedIcon) {
                    $parentLike.removeClass('busy');
                }

                // like / dislike animation
                if (self.options.enableActionLikeAnimation) {
                    if (type === 'like' && !isLiked || type === 'dislike' && !isDisliked) {
                        runLikeAnimation(type);
                    }
                }
            },
        });
    });
}

export { initActionsLike };
