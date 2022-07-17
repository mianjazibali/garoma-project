'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Meetings', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			start: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			end: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			attendee: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
			},
			createdAt: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.INTEGER,
				allowNull: false,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Meetings');
	}
};
