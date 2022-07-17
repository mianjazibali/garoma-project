const { Router } = require('express');
const router = Router();

const controllers = require('../controllers');

router.get('/', controllers.meeting.getUserMeetings);
router.post('/add', controllers.meeting.createMeeting);

module.exports = router;
