const blacklistController = require('../controllers/blacklistController')

const { hasUser, hasRole } = require('../middlewares/guards');
const { role } = require('./role');

const blacklist = require('express').Router();

blacklist.get('/',
    hasUser(),
    hasRole(role.forBlackList),
    blacklistController.getBlackList

);

blacklist.get('/:userId',
    hasUser(),
    hasRole(role.forBlackList),
    blacklistController.getOneBlacklist
);

blacklist.post('/',
    hasUser(),
    hasRole(role.forBlackList),
    blacklistController.addToBlackList
);

blacklist.delete('/:userId',
    hasUser(),
    hasRole(role.forBlackList),
    blacklistController.removeFromBlackList
)



module.exports = blacklist