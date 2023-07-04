const { model, Schema, Types: { ObjectId } } = require('mongoose');

const shortProductSchema = new Schema({
    productId: { type: ObjectId, required: true },
    coverImg: { type: String, required: true }, // check type file
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    lastUpdate: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    isDelete: { type: Boolean, default: false },
});

const shortProduct = model('ShortProduct', shortProductSchema);

module.exports = shortProduct;