const { model, Schema } = require('mongoose');

const shortProductSchema = new Schema({
    coverImg: { type: String, required: true }, // check type file
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    release: { type: String, },
    isDelete: { type: Boolean, default: false },
});

const shortProduct = model('ShortProduct', shortProductSchema);

module.exports = shortProduct;