const { model, Schema } = require('mongoose');

const blackListSchema = new Schema({
    inActivateToken: { type: String, required: true }
});

const BlackListTokenModel = model('BlackListToken', blackListSchema);

module.exports = BlackListTokenModel;