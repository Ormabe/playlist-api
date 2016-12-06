// REQUIRE IN EXPRESS:
const express = require('express');

// CREATE INSTANCE OF EXPRESS ROUTER:
const router = express.Router();

// REQUIRE IN MODELS:
const Artist = require('../models/artist-model');
const Genre = require('../models/genre-model');
const Song = require('../models/song-model');


// ================================================
// ON ROUTES THAT END IN '/', AS BELOW:

const getSongInfo = ((req, res) => {
		Song.findAll({
			order: [['title', 'ASC']],
			include: [{
		        model: Artist
		    },	
		    {
		    	model: Genre
		    }]
		})
		.then((songs) => {
			console.log('Listing all the songs')
			res.send(songs)
		})
		.catch((err) => {
			console.log(err)
		})

	})

const createNewSong = ((req, res) => {
		return Artist.findOrCreate({
			where: {
				name: req.body.name
			}
		})
		.then((artist) => {
			console.log('artist: ', artist[0].dataValues.id)
			return Song.findOrCreate({
				where: {
					title: req.body.title,
					youtube_url: req.body.youtube_url,
					artistId: artist[0].dataValues.id
				},
				include: [Artist, Genre]
			})
		})
		.then((song) => {
			console.log('new song:',song)

		})
		.catch((err) => {
			console.log(err)
		})
	});

// ================================================
// ON ROUTES THAT END IN '/songs/:id', AS BELOW:

const findSongById = ((req, res) => {
		Song.findById(req.params.id)
		.then( (song) => {
			res.send(song);
		})
		.catch( (err) => {
			console.log(err);
		})
	})

// ================================================
// ON ROUTES THAT END IN '/songs/:id', AS BELOW:


router.route('/')
	.get(getSongInfo)
	.post(createNewSong)
router.route('/:id')
	.get(findSongById)

module.exports = router;