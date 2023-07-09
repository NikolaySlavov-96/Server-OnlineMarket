const { model, Schema, Types: { ObjectId } } = require('mongoose');

const rewardCodeSchema = new Schema({
    promocode: { type: String, required: true },
    description: { type: String, required: true },
    sendedCode: { type: [ObjectId], required: true, default: [] },
    whichUsing: { type: [ObjectId], required: true, default: [] },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isExpired: { type: Boolean, required: true, default: false }, // marck after 7 days
    isDelete: { type: Boolean, required: true, default: false }, // mark after 355 days
});

const RewardCodeModel = model('RewardCode', rewardCodeSchema);

module.exports = RewardCodeModel;