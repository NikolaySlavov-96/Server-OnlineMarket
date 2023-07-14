const control = require('express').Router();

const { getAllComentarsForDates } = require('../controllers/commentController');
const { getRegisterUsers, editUserDate } = require('../controllers/profilController');
const { hasUser, hasRole } = require('../middlewares/guards');
const role = require('./role');


control.get('/allCommentars',
    hasUser(),
    hasRole(role.forCommentars),
    getAllComentarsForDates
);

control.get('/registerUsers',
    hasUser(),
    hasRole(role.callWithCustomer),
    getRegisterUsers
);

control.patch('/registerUsers',
    hasUser(),
    hasRole(role.forProduct),
    editUserDate
)

module.exports = control;