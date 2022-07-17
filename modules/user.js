const getUser = ({ userId }) => {
	const { User } = global.db;

  return User.findOne({
		where: {
			id: userId
		}
	});
};

module.exports = {
  getUser,
};
