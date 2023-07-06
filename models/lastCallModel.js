const { model, Schema, Types: { ObjectId } } = require('mongoose');

const lastCallSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    callDate: { type: Date, required: true },
    type: { type: String, required: true },
    description: { type: String },
    lastUpdate: { type: Date },
});

const lastCallModell = model('LastCall', lastCallSchema);

module.exports = lastCallModell;