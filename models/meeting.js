'use strict';
const { Model, Op } = require('sequelize');
const { ERRORS } = require('./../constants/user');

const modelName = 'Meeting';

module.exports = (sequelize, DataTypes) => {
	class Meeting extends Model {
		static associate(models) {
			Meeting.belongsTo(models.User, { foreignKey: 'attendee' });
			Meeting.belongsTo(models.User, { foreignKey: 'createdBy' });
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
		attendee: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdBy: {
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
	
	// (a >= A && a <= B) || (b >= A && b <= B) || (a < A && b > B)
	
	const validate = {
		dateTime: function () {
			return (async function (meeting) {
				const isAnyUserBusy = await Meeting.findOne({
					where: {
						[Op.or]: [
							{
								createdBy: meeting.createdBy,
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
													[Op.gte]: meeting.start
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
							},
							{
								attendee: meeting.attendee,
								[Op.or]: [
									{
										[Op.and]: [
											{
												start: {
													[Op.gte]: meeting.start
												}
											},
											{
												start: {
													$lte: meeting.end
												}
											}
										]
									},
									{
										[Op.and]: [
											{
												end: {
													[Op.gte]: meeting.start
												}
											},
											{
												end: {
													$lte: meeting.end
												}
											}
										]
									},
									{
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