'use strict';

const _ = require('lodash');
const moment = require('moment');
const { faker } = require('@faker-js/faker');

module.exports = {
	async up (queryInterface, Sequelize) {
		const users = _.range(2).map(index => ({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(8),
			createdAt: moment().unix(),
			updatedAt: moment().unix(),
		}));
		
		return queryInterface.bulkInsert('Users', users, {});
	},
	
	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
