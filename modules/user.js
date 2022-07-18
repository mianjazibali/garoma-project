const moment = require('moment');

const getUser = ({ userId }) => {
	const { User } = global.db;

  return User.findOne({
		where: {
			id: userId
		}
	});
};

const createUser = async ({ firstName, lastName, email, password } = {}) => {
	const { User } = global.db;
	const currentTimeStamp = moment().unix();

	return User.create({
		firstName,
		lastName,
		email,
		password,
		createdAt: currentTimeStamp,
		updatedAt: currentTimeStamp,
	});
};

module.exports = {
  getUser,
	createUser
};
