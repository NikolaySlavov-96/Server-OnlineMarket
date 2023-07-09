const lastCall = require('express').Router();

const callController = require('../controllers/lastCallController');
const { hasRole } = require('../middlewares/guards');
const role = require('./role');


lastCall.get('/user/:userId',
    hasRole(role.callWithCustomer),
    callController.getUser
);

lastCall.post('/user/:userId',
    hasRole(role.callWithCustomer),
    callController.createCall
);

lastCall.put('/user/:userId',
    hasRole(role.editCallWithCustomer),
    callController.editCall
);


module.exports = lastCall;