const { model, Schema } = require('mongoose');

const partnerCodeSchema = new Schema({
    promocode: { type: String, required: true, },
    purcendDiscount: { type: Number, required: true },
    howUsing: { type: Number, required: true, default: 0 },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isDelete: { type: Boolean, required: true, default: false },
});

const PartnerCodeModel = model('PartnerCode', partnerCodeSchema);

module.exports = PartnerCodeModel;