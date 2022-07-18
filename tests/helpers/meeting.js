const { expect } = require('chai');
const moment = require('moment');
const { faker } = require('@faker-js/faker');

const getMeetingData = ({
	title = faker.lorem.words(),
	start,
	end,
	attendeeUserId,
	createdByUserId,
	createdAt = moment().unix(),
	updatedAt = moment().unix()
} = {}) => {
	return {
		title,
		start,
		end,
		attendeeUserId,
		createdByUserId,
		createdAt,
		updatedAt
	};
};

const verifyMeeting = ({ actual, expected} = {}) => {
  expect(actual).to.have.property('title', expected.title);
  expect(actual).to.have.property('start', expected.start);
  expect(actual).to.have.property('end', expected.end);
  expect(actual).to.have.property('attendeeUserId', expected.attendeeUserId);
  expect(actual).to.have.property('createdByUserId', expected.createdByUserId);
  expect(actual).to.have.property('createdAt').to.be.closeTo(expected.createdAt, 10);
  expect(actual).to.have.property('updatedAt').to.be.closeTo(expected.updatedAt, 10);
};

module.exports = {
  getMeetingData,
  verifyMeeting,
};
