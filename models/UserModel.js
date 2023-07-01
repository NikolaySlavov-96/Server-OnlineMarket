const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, minLength: [6, 'Username minimal size is 6 characters'] },
    password: { type: String, required: true },
    year: { type: Number, required: true, min: [1, 'Minimal years is 1'] },
    creadAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    isDelete: { type: Boolean, default: false },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const UserMode = model('User', userSchema);


module.exports = UserMode;