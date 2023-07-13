const { model, Schema, Types: { ObjectId } } = require('mongoose');

const resetPasswordSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    sendCode: { type: String, required: true },
    dateSend: { type: Date, required: true },
    dateUsing: { type: Date },
});

const ResetPasswordModel = model('ResetPassword', resetPasswordSchema);

module.exports = ResetPasswordModel;