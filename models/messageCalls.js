const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    message: { type: String, required: true, minLength: [4, 'Message is minal 4 characters'] },
});

const messageModel = model('Message', messageSchema);

module.exports = messageModel;