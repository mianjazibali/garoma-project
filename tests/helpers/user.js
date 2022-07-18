const { faker } = require('@faker-js/faker');

const getUserData = ({
	firstName = faker.name.firstName(),
	lastName = faker.name.lastName(),
	email = faker.internet.email(),
	password = faker.internet.password(),
} = {}) => {
	return {
		firstName,
		lastName,
		email,
		password,
	};
};

module.exports = {
	getUserData,
};