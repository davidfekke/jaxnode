'use strict';
const cache = require('memory-cache');
const moment = require('moment-timezone');

/*
 * GET home page.
 */

exports.index = function index(req, res) {
    req.service.getNextMeetup()
        .then(meetingObject => {
            const meetingArray = meetingObject.results;
            req.service.getTweets(function cb(err2, tweetResults) {
                if (err2) {
                    console.log('problem with twitter request: ' + err2);
                    res.status(500).render('error', {
                        message: 'No tweets',
                        error: {
                            status: '500',
                            stack: 'App Twitter Error'
                        }
                    });
                } else {
                    setTimeToNewYork(meetingArray);
                    cache.put('nextMeeting', meetingArray, 3600000);
                    if (meetingArray) {
                        const displayMeetup = Object.keys(meetingArray).length !== 0;
                        if (displayMeetup) {
                            const nextMeeting = meetingArray[0];
                            if (nextMeeting.hasOwnProperty('venue')) {
                                var displayMap = Object.keys(nextMeeting.venue).length !== 0;
                            }
                        }
                    }
                    var displayTweets = tweetResults.tweets.length !== 0;
                    res.render('index', {
                        title: 'JaxNode User Group',
                        meeting: meetingArray[0],
                        tweets: tweetResults.tweets,
                        displayMeetup: displayMeetup,
                        displayMap: displayMap,
                        displayTweets: displayTweets
                    });
                }
            });
        })
        .catch(err => {
            console.log('problem with meetup request: ' + err);
            res.status(500).render('error', {
                message: 'No meetup data exists',
                error: {
                    status: '500',
                    stack: 'App Error'
                }
            });
        });

    // req.service.getNextMeetup(function callback(err, results) {
    //     if (err) {
    //         console.log('problem with meetup request: ' + err);
    //         res.status(500).render('error', {
    //             message: 'No meetup data exists',
    //             error: {
    //                 status: '500',
    //                 stack: 'App Error'
    //             }
    //         });
    //     } else {
    //         var meetingArray = results;
    //         req.service.getTweets(function cb(err2, tweetResults) {
    //             if (err2) {
    //                 console.log('problem with twitter request: ' + err2);
    //                 res.status(500).render('error', {
    //                     message: 'No tweets',
    //                     error: {
    //                         status: '500',
    //                         stack: 'App Twitter Error'
    //                     }
    //                 });
    //             } else {
    //                 if (meetingArray) {
    //                     var displayMeetup = Object.keys(meetingArray).length !== 0;
    //                     if (displayMeetup && meetingArray.hasOwnProperty('venue')) {
    //                         var displayMap = Object.keys(meetingArray.venue).length !== 0;
    //                     }
    //                 }
    //                 var displayTweets = tweetResults.tweets.length !== 0;
    //                 res.render('index', {
    //                     title: 'JaxNode User Group',
    //                     meeting: meetingArray,
    //                     tweets: tweetResults.tweets,
    //                     displayMeetup: displayMeetup,
    //                     displayMap: displayMap,
    //                     displayTweets: displayTweets
    //                 });
    //             }
    //         });
    //     }
    // });
};

exports.code = function code(req, res) {
    req.getCode(function callback(err, results) {
        if (err) {
            console.log('problem with request: ' + err);
            res.status(500).render('error', {
                message: 'problem with request',
                error: {
                    status: '500',
                    stack: 'problem with request'
                }
            });
        } else {
            res.render('code', { title: 'Jax Node GitHub code', repos: results.repos });
        }
    });
};

exports.api = function api(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            console.log('problem with request: ' + err);
            res.status(500).send({ meeting: 'Error occured' });
        } else {
            res.send({ meeting: results });
        }
    });
};

/*
 * This function always sets the meeting to the correct time.
 */
function setTimeToNewYork(meetingArray) {
    if (meetingArray && meetingArray.length > 0) {
        var currTime = moment(meetingArray[0].time).utc().clone();
        meetingArray[0].time = currTime.tz('America/New_York').format('lll');
    }
}