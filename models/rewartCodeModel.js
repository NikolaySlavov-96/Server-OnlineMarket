const { model, Schema, Types: { ObjectId } } = require('mongoose');

const rewardCodeSchema = new Schema({
    promocode: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    whichUsing: { type: [ObjectId], required: true, default: [] },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isExpired: { type: Boolean, required: true, default: false }, // marck after 7 days
    isDelete: { type: Boolean, required: true, default: false }, // mark after 355 days
});

const rewardCodeModel = model('PartnerCode', rewardCodeSchema);

module.exports = rewardCodeModel;