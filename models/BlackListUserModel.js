const { model, Schema, Types: { ObjectId } } = require('mongoose');

const blacklistUserSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    commentId: { type: [ObjectId], default: [], ref: 'Comment' },
    type: { type: [String], default: [] },
    description: { type: [String], default: [] },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false }
});

const blacklistUserModel = model('BlackListUser', blacklistUserSchema);

module.exports = blacklistUserModel;