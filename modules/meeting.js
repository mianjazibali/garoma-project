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
	const { Meeting, User } = global.db;

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
		},
		include: [
			{
				model: User,
				as: 'creator',
				required: true
			},
			{
				model: User,
				as: 'attendee',
				required: true
			}
		]
	});
};

module.exports = {
	createMeeting,
	fetchUserMeetings,
};
