const profile = require('express').Router();
const { body } = require('express-validator');

const profileController = require('../controllers/profilController');
const { hasUser } = require('../middlewares/guards');

profile.get('/profile', 
    hasUser(), 
    profileController.getUser
);

profile.put('/profile',
    hasUser(),
    body('password').isLength({ min: 5 }).withMessage('Password is required'),
    body('telephone').isMobilePhone().withMessage('Telephone number is invalid'),
    body('birthday').notEmpty().withMessage('Birthday is required')
        .custom(e => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(e))
        .withMessage('Invalid birthday date'),
    body('firstName').isLength({ min: 3 }).withMessage('First name is minilam 3 letter'),
    body('lastName').isLength({ min: 3 }).withMessage('Last name is minimal 3 letter'),
    profileController.updateUser
);

profile.delete('/profile',
    hasUser(),
    profileController.deleteUser);


module.exports = profile;