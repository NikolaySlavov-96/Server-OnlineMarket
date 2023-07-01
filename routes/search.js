const search = require('express').Router();

const searchController = require('../controllers/searchController');


search.get('/', searchController.getFindValue);

module.exports = search;