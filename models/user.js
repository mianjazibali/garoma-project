'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}
	}

	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	};

	const defaultScope = {
    attributes: {
			exclude: [ 'password' ]
		}
  };

	User.init(attributes, { sequelize, modelName: 'User', defaultScope, timestamps: false });
	return User;
};
