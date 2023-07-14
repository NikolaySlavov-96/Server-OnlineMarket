const { model, Schema, Types: { ObjectId } } = require('mongoose');

const likeSchema = new Schema({
    productId: { type: ObjectId, ref: 'ShortProduct', required: true},
    likeCount: { type: Number, default: 0 },
    users: { type: [ObjectId], ref: 'User', default: [] }
});

const LikeModel = model('Like', likeSchema)

module.exports = LikeModel;