const { model, Schema } = require('mongoose');

const blackListSchema = new Schema({
    inActivateToken: { type: String, required: true }
});

const BlackList = model('blackList', blackListSchema);

module.exports = BlackList;