const { model, Schema, Types: { ObjectId } } = require('mongoose');

const activateSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    sendCode: { type: String, required: true },
    dateSend: { type: Date, required: true },
    dateUsing: { type: Date },
});

const ActivationModel = model('Activation', activateSchema);

module.exports = ActivationModel;