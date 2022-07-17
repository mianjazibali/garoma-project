const _ = require('lodash');
const { ValidationError } = require('sequelize');

const { VALUES : { STATUS_CODES } } = require('./../constants/server');

const createResponseData = ({ status = STATUS_CODES.OK, data = null, message = null } = {}) => {
	return { status, data, message };
};

const sendSuccess = ({response, data}) => {
	// Keeping It Simple For Now (KISS)
	return response.status(200).json(data);
};

const sendError = ({error, response}) => {
	// Will Update This For Other Status Codes In Future
	const status = error instanceof ValidationError ? STATUS_CODES.BAD_REQUEST : STATUS_CODES.INTERNAL_SERVER;
	const message = error.errors ? _.first(error.errors).message : error.message;
	return response.status(status).json(createResponseData({ status, message }));
};

module.exports = {
	sendSuccess,
	sendError,
};
