const control = require('express').Router();

const { getAllComentarsForDates } = require('../controllers/commentController');
const { hasUser, hasRole } = require('../middlewares/guards');
const role = require('./role');


control.get('/allCommentars',
    hasUser(),
    hasRole(role.forCommentars),
    getAllComentarsForDates);

module.exports = control;