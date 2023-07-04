const reward = require('express').Router();

const rewardController = require('../controllers/rewardController');

reward.get('/wheel',
    rewardController.getRewardWheel
)


module.exports = reward;