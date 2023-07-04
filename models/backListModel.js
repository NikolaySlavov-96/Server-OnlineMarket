const { model, Schema } = require('mongoose');

const blackListSchema = new Schema({
    inActivateToken: { type: String, required: true }
});

const BlackList = model('BlackList', blackListSchema);

module.exports = BlackList;