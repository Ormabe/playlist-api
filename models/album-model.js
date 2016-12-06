const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

const Album = sequelizeConnection.define('album', {
	title: {
		type: Sequelize.STRING,
		validate: {
			min: 1,
			max: 100,
			notEmpty: true
		}
	}
});


module.exports = Album;
