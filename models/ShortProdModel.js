const { model, Schema, Types: { ObjectId } } = require('mongoose');

const shortProductSchema = new Schema({
    coverImg: { type: String, required: true }, // check type file
    productCode: { type: Number, required: true, unique: true }, // change to true after create logic
    mark: { type: String, required: true, },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    release: { type: String, required: true },
    price: { type: ObjectId, ref: 'Price', required: true },
    discount: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, default: false },
});

const ShortProduct = model('ShortProduct', shortProductSchema);

module.exports = ShortProduct;