const blacklist = require('express').Router();

const blacklistController = require('../controllers/blacklistController')
const { hasUser, hasRole } = require('../middlewares/guards');
const role = require('./role');


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
);

blacklist.get('/codes',
    hasUser(),
    hasRole(role.forBlackList),
    blacklistController.getAllCodes
);



module.exports = blacklist