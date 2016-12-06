// REQUIRE IN EXPRESS:
const express = require('express');

// CREATE INSTANCE OF EXPRESS ROUTER:
const router = express.Router();

// REQUIRE IN MODELS:
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');

// ================================================
// ON ROUTES THAT END IN '/artists', AS BELOW:

	// GET ALL ARTISTS, ORDERED BY A-Z:
const getAllArtists = ((req, res) => {
		Artist.findAll({
			order: [['name', 'ASC']]
		})
		.then((artists) => {
			res.send(artists)
		})
		.catch((err) => {
			console.log(err)
		})
	})

	// POST A NEW ARTIST:
const createNewArtist = ((req, res) => {
		Artist.findOrCreate({
			name: req.body.name
		})
		.then((artist) => {
			res.json(artist)
		})
		.catch((err) => {
			console.log(err)
		})
	});

// ================================================
// ON ROUTES THAT END IN '/artists/:id', AS BELOW:

	// FIND ONE (1) ARTIST BY ID:
const findArtistById = ((req, res) => {
		Artist.findById(req.params.id)
		.then( (artist) => {
			res.send(artist);
		})
		.catch( (err) => {
			console.log(err);
		})
	})

// 	// DELETE ONE (1) ARTIST BY ID:
const deleteArtistById = ((req, res) => {
		Artist.findById(req.params.id) 
		.then(function(artist) {
			artist.destroy()
		})
		.then((data) => {
			console.log('Deleted!')
			res.send(data)
		})
		.catch((err) => {
			res.send(err)
		})
	})

// // ================================================
// // ON ROUTES THAT END IN '/artists/:id:newName', AS BELOW:

const updateArtistByURL = ((req, res) => {
		Artist.findById(req.params.id)
		.then((artist) => {
			artist.update({name: req.param('newName')})
		})
		.then((data) => {
			console.log('Updated Artist\'s Name!')
			res.send(data)
		})
		.catch((err) => {
			res.send(err)
		})
	})

router.route('/')
	.get(getAllArtists)
	.post(createNewArtist)

router.route('/:id')
	.get(findArtistById)
	.delete(deleteArtistById)

router.route('/:id/:newName')
	.put(updateArtistByURL)

module.exports = router;