const { model, Schema } = require('mongoose');

const blackListSchema = new Schema({
    inActivateToken: { type: String, required: true }
});

const BlackListTokenModel = model('BlackList', blackListSchema);

module.exports = BlackListTokenModel;