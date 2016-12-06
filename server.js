const express = require('express');
// ROUTES FOR OUR API:
// This is an instance of the express router
const router = express.Router();
// const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

// REQUIRE IN ALL MODELS:
const Album = require('./models/album-model')
const Artist = require('./models/artist-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model');
const Song = require('./models/song-model');
const User = require('./models/user-model');

// REQUIRE IN ROUTE FOLDER & 'index.js':
const routes = require('./routes/index').routes;

// ================================================
// SETTING THE SERVER:
app.set('port', 9999)

// THIS SERVES UP THE BUNDLE FILE TO BE ACCESSED BY THE FRONT END:
app.use(express.static(path.join(__dirname, '/front/bundle')));

// BODY PARSER MIDDLEWARE ADDS '.body' PROPERTY TO 'req'
// USED TO ACCESS DATA IN POST REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================
// MIDDLEWARE TO USE FOR ALL REQUESTS:
var myLogger = (req, res, next) => {
	console.log('Something very exciting is happening');
	next();
};

// IF WHAT WE TYPE ISN'T IN THE API ROUTE - WE WANT TO SEND BACK OUR REACT APP:
console.log(__dirname)
app.get('/*', (req, res) => {
	res.sendFile(__dirname + '/front/index.html')
});

// ================================================
// STARTING THE SERVER:
app.listen(app.get('port'), () => console.log('Listening on Port 9999'));

// ================================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)

app.use(myLogger)
app.use('/api/albums', routes.albums);
app.use('/api/artists', routes.artists);
app.use('/api/genres', routes.genres);
app.use('/api/playlists', routes.playlists);
app.use('/api/songs', routes.songs);
app.use('/api/users', routes.users);

// NOTES:
// http://kerryritter.com/getting-started-with-sequelize-postgres-and-express/
