const userModule = require('./../modules/user');
const { ERRORS } = require('./../constants/user');

const loadUser = async (req, res, next) => {
	try {
    const {params: { userId }} = req;
		const user = await userModule.getUser({ userId });
		if (!user) {
			throw new Error(ERRORS.USER_NOT_FOUND);
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	loadUser,
};
