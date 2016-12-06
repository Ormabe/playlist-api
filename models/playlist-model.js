const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');


// Models:
const Song = require('./song-model')


//////////
// YOUR CODE HERE:
//////////
var Playlist = sequelizeConnection.define('playlist', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notEmpty: true
		}
	}
});

Song.belongsToMany(Playlist, {through: 'playlist_songs'});
Playlist.belongsToMany(Song, {through: 'playlist_songs'});


module.exports = Playlist;
