const { model, Schema, Types: { ObjectId } } = require('mongoose');

const DATE_PATTERN = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const blacklistUserSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
    commentId: { type: [ObjectId], default: [], ref: 'Comment' },
    description: { type: [String], default: [] },
    date: { type: String, required: true, validate: {
        validator: (value) => DATE_PATTERN.test(value),
        message: 'Invalid date format'
    }},
    type: { type: [String], default: [], required: true },
    isDeleted: { type: Boolean, default: false }
});

blacklistUserSchema .index({ userId: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const blacklistUserModel = model('BlackListUser', blacklistUserSchema);

module.exports = blacklistUserModel;