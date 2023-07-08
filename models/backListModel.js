const { model, Schema } = require('mongoose');

const blackListSchema = new Schema({
    inActivateToken: { type: String, required: true }
});

const BlackListModel = model('BlackList', blackListSchema);

module.exports = BlackListModel;