const reward = require('express').Router();
const { body } = require('express-validator');

const rewardController = require('../controllers/rewardController');

reward.get('/wheel',
    // body('email').isEmail().withMessage('Missing email'),
    rewardController.getRewardWheel
)


module.exports = reward;