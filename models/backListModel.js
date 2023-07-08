const { model, Schema, Types: { ObjectId } } = require('mongoose');

// const blackListSchema = new Schema({
//     inActivateToken: { type: String, required: true }
// });

const DATE_PATTERN = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const blackListSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
    commentId: { type: [ObjectId], default: [], ref: 'Comment', required: true },
    description: { type: [String], default: [], required: true },
    date: { type: String, required: true, validate: {
        validator: (value) => DATE_PATTERN.test(value),
        message: 'Invalid date format'
    }},
    type: { type: [String], default: [], required: true },
    isDeleted: { type: Boolean, default: false }
});

blackListSchema .index({ userId: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const BlackListModel = model('BlackList', blackListSchema);

module.exports = BlackListModel;