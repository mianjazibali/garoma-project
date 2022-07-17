const meetingModule = require('./../modules/meeting');
const responseModule = require('./../modules/response');

const createMeeting = async (request, response) => {
	try {
		const { userId: attendee } = req.params;
		
		// Using Created By Received In API Body For Now, But We Need To Use Id Of A LoggedIn User
		const meeting = await meetingModule.createMeeting({ ...request.body, attendee });
		
		return responseModule.sendSuccess({response, data: { meeting }});
	} catch (error) {
		return responseModule.sendError({error, response});
	}
};

const getUserMeetings = async (request, response) => {
	try {
		const meetings = await meetingModule.fetchUserMeetings({ userId: request.user.id });
		
		return responseModule.sendSuccess({response, data: { meetings }});
	} catch (error) {
		return responseModule.sendError({error, response});
	}
};

module.exports = {
	createMeeting,
	getUserMeetings,
};
