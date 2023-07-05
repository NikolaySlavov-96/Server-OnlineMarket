const { model, Schema, Types: { ObjectId } } = require('mongoose');

const shortProductSchema = new Schema({
    coverImg: { type: String, required: true }, // check type file
    productCode: { type: Number, required: false, unique: true }, // change to true after create logic
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    release: { type: String, },
    price: { type: ObjectId, ref: 'Price', required: true },
    isDelete: { type: Boolean, default: false },
});

const shortProduct = model('ShortProduct', shortProductSchema);

module.exports = shortProduct;