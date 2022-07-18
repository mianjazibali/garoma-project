'use strict';
const { Model, Op } = require('sequelize');
const { ERRORS } = require('./../constants/user');

const modelName = 'Meeting';

module.exports = (sequelize, DataTypes) => {
	class Meeting extends Model {
		static associate(models) {
			Meeting.belongsTo(models.User, { foreignKey: 'attendeeUserId', as: 'attendee' });
			Meeting.belongsTo(models.User, { foreignKey: 'createdByUserId', as: 'creator' });
		}
	}
	
	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		start: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		end: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		attendeeUserId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdByUserId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	};
	
	const validate = {
		dateTime: function () {
			return (async function (meeting) {
				const isAnyUserBusy = await Meeting.findOne({
					where: {
						[Op.and]: [
							{
								[Op.or]: [
									{
										createdByUserId: meeting.createdByUserId,
									},
									{
										attendeeUserId: meeting.attendeeUserId,
									}
								]
							},
							{
								[Op.or]: [
									{
										// Scenario 1: New Meeting Start Date Is Between The Scheduled Meeting
										[Op.and]: [
											{
												start: {
													[Op.gte]: meeting.start
												}
											},
											{
												start: {
													[Op.lt]: meeting.end
												}
											}
										]
									},
									{
										// Scenario 2: New Meeting End Date Is Between The Scheduled Meeting
										[Op.and]: [
											{
												end: {
													[Op.gt]: meeting.start
												}
											},
											{
												end: {
													[Op.lt]: meeting.end
												}
											}
										]
									},
									{
										// Scenario 3: Scheduled Meeting Lies Between The Start and End Date Of New Meeting
										[Op.and]: [
											{
												start: {
													[Op.lt]: meeting.start
												}
											},
											{
												end: {
													[Op.gt]: meeting.end
												}
											}
										]
									}
								]
							}
						]
					}
				});
				
				if (!!isAnyUserBusy) {
					throw new Error(ERRORS.USER_BUSY);
				}
			})(this);
		}
	}
	
	Meeting.init(attributes, { sequelize, modelName, validate, timestamps: false });
	return Meeting;
};
