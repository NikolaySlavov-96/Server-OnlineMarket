const { model, Schema } = require('mongoose');

const BIR_PATTERN = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, require: true, unique: true },
    birthday: {
        type: String, required: true, validate: {
            validator: (value) => BIR_PATTERN.test(value),
            message: 'Invalid birthday date'
        }
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    creadAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    role: { type: [{ type: String, enum: ['customer', 'seller', 'partner', 'moderator', 'marketing', 'manager', 'admin'] }], default: ['customer'] },
    isActivate: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
});


userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const UserMode = model('User', userSchema);


module.exports = UserMode;