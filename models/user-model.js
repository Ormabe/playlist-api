const Sequelize = require('sequelize');
// const sequelize = CONFIG.database;
const sequelizeConnection = require('../db');
const path = require('path');

// Models:
const Playlist = require('../models/playlist-model');

// Password Encryption (via: https://nodeontrain.xyz/tuts/secure_password/)
// http://docs.sequelizejs.com/en/latest/docs/migrations/
const bcrypt = require('bcrypt');

var User = sequelizeConnection.define('user', {
	userId: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4
	},
	username: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
			min: 6,
			max: 25
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true,
			max: 255
		}
	},
	password_digest: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: Sequelize.VIRTUAL,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	password_confirmation: {
		type: Sequelize.VIRTUAL
	}
}, {
	freezeTableName: true,
	indexes: [{unique: true, fields: ['email']}],
	instanceMethods: {
		authenticate: function(value) {
			if (bcrypt.compareSync(value, this.password_digest))
				return this;
			else
				return false;
			
		}
	}
});

const hasSecurePassword = function (user, options, callback) {
	if (user.password != user.password_confirmation) {
		throw new Error("Password confirmation does not match Password")
	}
	bcrypt.hash(user.get('password'), 10, function (err, hash) {
		if (err) return callback(err);
		user.set('password_digest', hash);
		return callback(null, options);
	});
};

User.beforeCreate(function(user, options, callback) {
	user.email = user.email.toLowerCase();
	if (user.password)
		hasSecurePassword(user, options, callback);
	else
		return callback(null, options);
})

module.exports = User;