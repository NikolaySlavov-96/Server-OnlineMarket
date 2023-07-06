const { model, Schema, Types: { ObjectId } } = require('mongoose');

const lastCallSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    description: { type: String },
    extDescription: { type: String, default: '' },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date },
});

const lastCallModell = model('LastCall', lastCallSchema);

module.exports = lastCallModell;