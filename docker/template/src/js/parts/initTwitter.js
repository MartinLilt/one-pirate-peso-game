import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/
function initTwitter() {
    const self = this;
    const $twtFeeds = $('.nk-twitter-list');
    if (!$twtFeeds.length || !self.options.templates.twitter) {
        return;
    }

    /**
     * Templating a tweet using '{{ }}' braces
     * @param  {Object} data Tweet details are passed
     * @return {String}      Templated string
     */
    function templating(data, temp) {
        const tempVariables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

        for (let i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp(`{{${tempVariables[i]}}}`, 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $twtFeeds.each(function eachTwitterFeed() {
        const $this = $(this);
        const options = {
            username: $this.attr('data-twitter-user-name') || null,
            list: null,
            hashtag: $this.attr('data-twitter-hashtag') || null,
            count: $this.attr('data-twitter-count') || 2,
            hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
            template: $this.attr('data-twitter-template') || self.options.templates.twitter,
            loadingText: self.options.templates.twitterLoadingText,
            failText: self.options.templates.twitterFailText,
            apiPath: self.options.templates.twitterApiPath,
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(options.failText);
            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Twitter');
            return;
        }

        // Set loading
        $this.html(`<span>${options.loadingText}</span>`);

        // Fetch tweets
        $.getJSON(options.apiPath, {
            username: options.username,
            list: options.list,
            hashtag: options.hashtag,
            count: options.count,
            exclude_replies: options.hideReplies,
        }, (twt) => {
            $this.html('');

            for (let i = 0; i < options.count; i++) {
                let tweet = false;
                if (twt[i]) {
                    tweet = twt[i];
                } else if (twt.statuses && twt.statuses[i]) {
                    tweet = twt.statuses[i];
                } else {
                    break;
                }

                const tempData = {
                    user_name: tweet.user.name,
                    date: tweet.date_formatted,
                    tweet: tweet.text_entitled,
                    avatar: `<img src="${tweet.user.profile_image_url}" />`,
                    url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
                    retweeted: tweet.retweeted,
                    screen_name: `@${tweet.user.screen_name}`,
                };

                $this.append(templating(tempData, options.template));
            }
        }).fail((a) => {
            $this.html(options.failText);
            $.error(a.responseText);
        });
    });
}

export { initTwitter };
