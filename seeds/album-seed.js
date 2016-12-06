const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

const Album = require('../models/album-model');
const Song = require('../models/song-model');

Album.sync({ force: true })
.then( () => sequelizeConnection.sync() )

.then( (data) => Album.create(
	{title: "Nostalgia, Ultra"}
	)
)
.then( (album) => {
	album.addSong([1]);
})
.then( () => Album.create(
	{title: "My Friends Never Die"}
	)
)
.then( (album) => {
	album.addSong([2]);
})
.then( () => Album.create(
	{title: "Illmatic"}
	)
)
.then( (album) => {
	album.addSong([3]);
})

.catch( (err) => console.log(err))
