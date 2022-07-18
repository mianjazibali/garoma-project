const moment = require('moment');
const request = require('supertest');

const app = require('./../../server');
const fixtures = require('./../fixtures');
const testHelpers = require('./../helpers');
const meetingModule = require('./../../modules/meeting');

const { VALUES : { STATUS_CODES } } = require('./../../constants/server');
const { ERRORS } = require('./../../constants/user');

describe('Meeting Controller Tests', function() {
  beforeEach(async function() {
    this.user_1 = await fixtures.user.createUser();
    this.user_2 = await fixtures.user.createUser();

    this.meetingData = testHelpers.meeting.getMeetingData({
      start: moment('2022-01-01 01:00:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      end: moment('2022-01-01 02:00:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      attendeeUserId: this.user_1.id,
      createdByUserId: this.user_2.id
    });
  });

  describe('Create Meeting API', function() {
    it('should create meeting for a user', async function() {
      const { body: { meeting } } = await request(app)
				.post(`/api/users/${this.user_1.id}/meetings/add`)
				.set('Accept', 'application/json')
        .send(this.meetingData)
				.expect(STATUS_CODES.OK);

      testHelpers.meeting.verifyMeeting({ actual: meeting, expected: this.meetingData});
    });

    // ----- A ----------- B
    //           a --- b
    it('should not create meeting if new meeting lies b/w existing one', async function() {
      await meetingModule.createMeeting(this.meetingData);

      const newMeetingData = {
        ...this.meetingData,
        start: moment('2022-01-01 01:15:00', 'YYYY-MM-DD hh:mm:ss').unix(),
        end: moment('2022-01-01 01:45:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      };

      const {body: response} = await request(app)
				.post(`/api/users/${this.user_1.id}/meetings/add`)
				.set('Accept', 'application/json')
        .send(newMeetingData)
				.expect(STATUS_CODES.BAD_REQUEST);

      const expectedResponse = testHelpers.error.getErrorData({
        status: STATUS_CODES.BAD_REQUEST,
        message: ERRORS.USER_BUSY
      });
      testHelpers.error.verifyError({ actual: response, expected: expectedResponse });
    });

    // ----- A ----------- B
    //              a ----------- b
    it('should not create meeting if new meeting start datetime lies b/w existing one', async function() {
      await meetingModule.createMeeting(this.meetingData);

      const newMeetingData = {
        ...this.meetingData,
        start: moment('2022-01-01 01:30:00', 'YYYY-MM-DD hh:mm:ss').unix(),
        end: moment('2022-01-01 02:30:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      };

      const {body: response} = await request(app)
				.post(`/api/users/${this.user_1.id}/meetings/add`)
				.set('Accept', 'application/json')
        .send(newMeetingData)
				.expect(STATUS_CODES.BAD_REQUEST);

      const expectedResponse = testHelpers.error.getErrorData({
        status: STATUS_CODES.BAD_REQUEST,
        message: ERRORS.USER_BUSY
      });
      testHelpers.error.verifyError({ actual: response, expected: expectedResponse });
    });

    // ----- A ----------- B
    //   a ----------- b
    it('should not create meeting if new meeting end datetime lies b/w existing one', async function() {
      await meetingModule.createMeeting(this.meetingData);

      const newMeetingData = {
        ...this.meetingData,
        start: moment('2022-01-01 00:45:00', 'YYYY-MM-DD hh:mm:ss').unix(),
        end: moment('2022-01-01 01:45:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      };

      const {body: response} = await request(app)
				.post(`/api/users/${this.user_1.id}/meetings/add`)
				.set('Accept', 'application/json')
        .send(newMeetingData)
				.expect(STATUS_CODES.BAD_REQUEST);

      const expectedResponse = testHelpers.error.getErrorData({
        status: STATUS_CODES.BAD_REQUEST,
        message: ERRORS.USER_BUSY
      });
      testHelpers.error.verifyError({ actual: response, expected: expectedResponse });
    });

    // ----- A ----------- B -----
    //   a ------------------- b
    it('should not create meeting if existing meeting lies b/w new one', async function() {
      await meetingModule.createMeeting(this.meetingData);

      const newMeetingData = {
        ...this.meetingData,
        start: moment('2022-01-01 00:45:00', 'YYYY-MM-DD hh:mm:ss').unix(),
        end: moment('2022-01-01 02:15:00', 'YYYY-MM-DD hh:mm:ss').unix(),
      };

      const {body: response} = await request(app)
				.post(`/api/users/${this.user_1.id}/meetings/add`)
				.set('Accept', 'application/json')
        .send(newMeetingData)
				.expect(STATUS_CODES.BAD_REQUEST);

      const expectedResponse = testHelpers.error.getErrorData({
        status: STATUS_CODES.BAD_REQUEST,
        message: ERRORS.USER_BUSY
      });
      testHelpers.error.verifyError({ actual: response, expected: expectedResponse });
    });
  });
});
