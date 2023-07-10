const { model, Schema, Types: { ObjectId } } = require('mongoose');

const technologySchema = new Schema({
    shortId: { type: ObjectId, required: true },
    imgs: { type: [String], required: true },
    manufacture: { type: String, required: true, },
    description: { type: String, required: true },
    sizes: { type: [String], required: true },
    createdAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
});

const BabysModel = model('Babys', technologySchema);

module.exports = BabysModel;