// REQUIRE IN EXPRESS:
const express = require('express');

// CREATE INSTANCE OF EXPRESS ROUTER:
const router = express.Router();

// REQUIRE IN MODELS:
const Album = require('../models/album-model');

router.route('/')


module.exports = router;