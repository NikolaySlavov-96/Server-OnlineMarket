const { model, Schema } = require('mongoose');

const priceSchema = new Schema({
    buyPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    currency: { type: String, required: true, default: 'BGN' },
    discountPurcent: { type: Number, default: 0 }
});

const PriceModel = model('Price', priceSchema);

module.exports = PriceModel;