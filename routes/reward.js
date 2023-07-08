const reward = require('express').Router();
const { body, query } = require('express-validator');

const rewardController = require('../controllers/rewardController');
const { hasUser, hasRole } = require('../middlewares/guards');
const { role } = require('./role');

reward.get('/wheel',
    // body('email').isEmail().withMessage('Missing email'),
    rewardController.getRewardWheel
);

reward.get('/code',
    // query('promocode'),
    hasUser(),
    hasRole(role.createCommentar),
    rewardController.verifyRewardCode
);

reward.get('/adding',
    // query('partnercode'),
    hasUser(),
    hasRole(role.createPartner),
    rewardController.addingPartnerCode
);


module.exports = reward;