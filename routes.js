const middlewares = require('./middlewares');
const routers = require('./routers');

module.exports = function (app) {
	app.use('/api/users/:userId/meetings', middlewares.user.loadUser, routers.meeting);
};
