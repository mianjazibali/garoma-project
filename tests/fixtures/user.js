const userTestHelper = require('./../helpers/user');
const userModule = require('./../../modules/user');

const createUser = ({ firstName, lastName, email, password } = {}) => {
	const userData = userTestHelper.getUserData({ firstName, lastName, email, password });
	return userModule.createUser(userData);
};

module.exports = {
	createUser,
};
