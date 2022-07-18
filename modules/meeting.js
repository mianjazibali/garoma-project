const moment = require('moment');
const { Op } = require('sequelize');

const createMeeting = ({ title, start, end, attendeeUserId, createdByUserId }) => {
	const { Meeting } = global.db;
	const currentTimeStamp = moment().unix();

	return Meeting.create({
		title,
		start,
		end,
		attendeeUserId,
		createdByUserId,
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
					createdByUserId: userId
				},
				{
					attendeeUserId: userId
				}
			]
		}
	});
};

module.exports = {
	createMeeting,
	fetchUserMeetings,
};
