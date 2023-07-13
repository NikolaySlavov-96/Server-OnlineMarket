const users = require('express').Router();
const { body } = require('express-validator');

const userController = require('../controllers/authController');
const { isGuest, hasUser } = require('../middlewares/guards');


users.post('/register',
    isGuest(),
    body('email').isEmail().withMessage('Emais is not corret'),
    body('password').isLength({ min: 5 }).withMessage('Password is not doesn\'t long'),
    body('circulation').isLength({ min: 3 }).withMessage('Circulation is with minimal length 3 character'),
    body('telephone').notEmpty().withMessage('Telephone number is required')
        .isMobilePhone().withMessage('Telephone number is not valid'),
    body('birthday').notEmpty().withMessage('Birthday is required')
        .custom(e => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(e))
        .withMessage('Invalid birthday date'),
    body('firstName').notEmpty().withMessage('First name required')
        .isLength({ min: 3 }).withMessage('First name is minilam 3 letter'),
    body('lastName').notEmpty().withMessage('Last name is required')
        .isLength({ min: 3 }).withMessage('Last name is minimal 3 letter'),
    userController.createUser);

users.post('/login',
    isGuest(),
    body('email').notEmpty().withMessage('Email is requied'),
    body('password').notEmpty().withMessage('Passwor is required'),
    userController.getUser);

users.get('/logout',
    hasUser(),
    userController.exitUset);

users.post('/activation',
    //check have query
    userController.activateUser);

users.get('/check',
    userController.checkFields);

users.post('/reset',
    body('email').isEmail().withMessage('Email addres is required'),
    body('telephone').notEmpty().withMessage('Telephonbe nuber is required'),
    userController.resetPasswordWithEmail);

users.post('/createpassword',
    body('resetCode').notEmpty().withMessage('Reset code is required'),
    body('newPassword').isLength({ min: 3 }).withMessage('Password minimal length is 3 characters'),
    body('repeatNewPassword').isLength({ min: 3 }).withMessage('Password minimal length is 3 characters'),
    userController.changePasswordWithCode);

module.exports = users;