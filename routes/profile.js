const profile = require('express').Router();

const profileController = require('../controllers/profilController');
const { hasUser } = require('../middlewares/guards');

profile.get('/profile',
    hasUser(),
    profileController.getUser);
profile.put('/profile',
    hasUser(),
    profileController.updateUser);
profile.delete('/profile',
    hasUser(),
    profileController.deleteUser);

module.exports = profile;