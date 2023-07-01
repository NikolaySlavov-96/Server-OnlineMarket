const { model, Schema, Types: { ObjectId } } = require('mongoose');

const commentarSchema = new Schema({
    productId: { type: ObjectId, ref: 'User', required: true },
    ownerId: { type: ObjectId, ref: 'User', require: true },
    name: { type: String, required: true, minLength: [3, 'Name is with minimal length 3 characts'] },
    commentar: { type: String, required: true, minLength: [3, 'Commentar field is minilam 3 characters'] },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isDelete: { type: Boolean, default: false },
});

const Comment = model('Comment', commentarSchema);

module.exports = Comment;