const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

// Models:
const Artist = require('./artist-model');
const Genre = require('./genre-model');
//const Album = require('./album-model');

//////////
// YOUR CODE HERE:
//////////

const Song = sequelizeConnection.define('song', {
	title: {
		type: Sequelize.STRING,
		validate: {
			max: 250,
			notEmpty: true
		}
	},
	youtube_url: {
		type: Sequelize.STRING,
		validate: {
			max: 100,
			notEmpty: true,
			isUrl: true 
		}
	}
})

Song.belongsTo(Artist);

// THIS {through: 'string'} WILL AUTOMATICALLY CREATE THIS TABLE:
Song.belongsToMany(Genre, {through: 'song_genre'});
Genre.belongsToMany(Song, {through: 'song_genre'});

Song.belongsToMany(Artist, {through: 'artists_songs'});
Artist.belongsToMany(Song, {through: 'artists_songs'});

module.exports = Song;
