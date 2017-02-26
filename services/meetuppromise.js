let fetch = require('node-fetch');

let httpsOptions = {
    hostname: 'api.meetup.com',
    port: 443,
    path: '/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key,
    method: 'GET'
};

function getNextMeetup() {
    return fetch('https://' + httpsOptions.hostname + '/' + httpsOptions.path)
        // .then(response => response.json())
        // .then(nextMeeting => {
        //     var err = false;
        //     if (nextMeeting && nextMeeting.toString().slice(0, 6) !== '<html>') {
        //         let meetingObject = JSON.parse(nextMeeting);
        //         let meetingArray = meetingObject.results;
        //         // permanent fix for the changing timezone plus moment deprecation fix.
        //         setTimeToNewYork(meetingArray);
        //         cache.put('nextMeeting', meetingArray, 3600000);
        //         nextMeeting = '';
        //         cb(meetingArray[0]);
        //     } else {
        //         let meetingObject2 = {};
        //         meetingObject2.results = [{}];
        //         cb(meetingObject2.results[0]);
        //     }
        // }).catch(err => { 
        //     console.log('problem with request: ' + e.message);
        //     let meetingObject3 = {};
        //     meetingObject3.results = [{}];
        //     cb(meetingObject3.results[0]);
        // });
}

module.exports = getNextMeetup;