'use strict';

require('dotenv').config();
const cache = require('memory-cache');
const { TwitterApi } = require('twitter-api-v2');

/*
 * Set up options for the Twitter API v2.
 * Uses OAuth 1.0a user context (compatible with existing env var names).
 */
/* eslint-disable */
const client = new TwitterApi({
    appKey: process.env.twitter_ck,
    appSecret: process.env.twitter_cs,
    accessToken: process.env.twitter_atk,
    accessSecret: process.env.twitter_ats
});
/* eslint-enable */

/*
 * Method used to format Twitter text using Regex.
 */
function formatTweets(item) {
    const resultText = item.text.replace(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        '<a href="$1">$1</a>'
    );
    const twitterText = resultText.replace(/@(\w+)/, '<a href="https://twitter.com/$1">@$1</a>');
    return { text: twitterText, icon: item.user.profile_image_url, name: item.user.screen_name };
}

async function getFeed() {
    const cTweets = cache.get('Tweets');
    if (cTweets !== null) {
        return { tweets: cTweets };
    }

    // Get the authenticated user's timeline (last 10 tweets)
    // v2 client doesn't expose user_timeline directly; we fetch the user and then their tweets
    const me = await client.v2.me({
        'user.fields': ['profile_image_url', 'username']
    });

    const tweetsResponse = await client.v2.userTimeline(me.data.id, {
        exclude: ['replies'],
        max_results: 10,
        expansions: ['author_id'],
        'tweet.fields': ['created_at', 'entities', 'text'],
        'user.fields': ['profile_image_url', 'username']
    });

    // Map tweets to expected format
    const results = tweetsResponse.tweets.map(t =>
        formatTweets({
            text: t.text,
            user: {
                profile_image_url: me.data.profile_image_url,
                screen_name: me.data.username
            }
        })
    );

    cache.put('Tweets', results, 3600000);
    return { tweets: results };
}

module.exports = getFeed;
