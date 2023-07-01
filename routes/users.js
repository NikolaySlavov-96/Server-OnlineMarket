const users = require('express').Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const { isGuest, hasUser } = require('../middlewares/guards');


users.post('/register',
    isGuest(),
    body('email').isEmail().withMessage('Emais is not corret'),
    body('password').isLength({ min: 5 }).withMessage('Password is not doesn\'t long'),
    body('telephone').notEmpty().withMessage('Telephone number is required')
        .isMobilePhone().withMessage('Telephone number is not valid'),
    body('birthday').notEmpty().withMessage('Birthday is required'),
    body('firstName').notEmpty().withMessage('First name required')
        .isLength({ min: 3 }).withMessage('First name is minilam 3 letter'),
    body('lastName').notEmpty().withMessage('Last name is required')
        .isLength({ min: 3 }).withMessage('Last name is minimal 3 letter'),
    userController.createUser);

users.post('/login',
    isGuest(),
    body('emil').notEmpty().withMessage('Username is requied'),
    body('password').notEmpty().withMessage('Passwor is required'),
    userController.getUser);

users.get('/logout',
    hasUser(),
    userController.exitUset);


module.exports = users;