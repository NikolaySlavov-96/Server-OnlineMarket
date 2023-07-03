const { model, Schema, Types: { ObjectId } } = require('mongoose');

const lastCallSchema = new Schema({
    userId: { type: ObjectId, required: true },
    callDate: { type: Date, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
});

const lastCallModell = model('LastCall', lastCallSchema);

module.exports = lastCallModell;