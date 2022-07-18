const { expect } = require("chai")

const getErrorData = ({ status = STATUS_CODES.OK, data = null, message = null } = {}) => {
	return { status, data, message };
};

const verifyError = ({ actual, expected } = {}) => {
  expect(actual).to.have.property('status', expected.status);
  expect(actual).to.have.property('data', expected.data);
  expect(actual).to.have.property('message', expected.message);
};

module.exports = {
  getErrorData,
  verifyError,
};
