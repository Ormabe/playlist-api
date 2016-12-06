const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////

const Artist = sequelizeConnection.define('artist', {
	name: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notEmpty: true
		}
	}
});

module.exports = Artist;
