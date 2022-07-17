const moment = require('moment');
const { Op } = require('sequelize');

const createMeeting = ({ title, start, end, attendee, createdBy }) => {
	const { Meeting } = global.db;
	const currentTimeStamp = moment().unix();

	return Meeting.create({
		title,
		start,
		end,
		attendee,
		createdBy,
		createdAt: currentTimeStamp,
		updatedAt: currentTimeStamp,
	});
};

const fetchUserMeetings = ({ userId } = {}) => {
	const { Meeting } = global.db;

	return Meeting.findAll({
		where: {
			[Op.or]: [
				{
					createdBy: userId
				},
				{
					attendee: userId
				}
			]
		}
	});
};

module.exports = {
	createMeeting,
	fetchUserMeetings,
};
