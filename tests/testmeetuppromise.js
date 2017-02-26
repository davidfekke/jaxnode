const meetupdata = require('../services/meetuppromise.js');
let chai = require('chai');

let assert = chai.assert;

describe('Promise Services', function () {
    describe('GET Meetup', function () {
        it('Grab meetup data', function getMeetup(done) {
            meetupdata();
            done();
        });
    });
});