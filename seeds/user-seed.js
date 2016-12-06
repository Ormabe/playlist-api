const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

const User = require('../models/user-model');
const Playlist = require('../models/playlist-model');

User.sync({ force: true })
.then(() => sequelizeConnection.sync())

.then((data) => User.create({
	username: "iLuvTrap1998", email: "twerkingturkey@gmail.com", password: "i##love##country"}
	)
)

.then( (user) => {
	user.addPlaylist([1, 2])
})

.catch( (err) => console.log(err))