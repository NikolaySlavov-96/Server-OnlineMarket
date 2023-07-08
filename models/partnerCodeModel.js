const { model, Schema } = require('mongoose');

const partnerCodeSchema = new Schema({
    howUsing: { type: Number, required: true, default: 0 },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isDelete: { type: Boolean, required: true, default: false },
});

const partnerCodeModel = model('PartnerCode', partnerCodeSchema);

module.exports = partnerCodeModel;