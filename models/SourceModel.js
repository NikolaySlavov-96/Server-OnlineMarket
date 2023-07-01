const { model, Schema, Types: { ObjectId } } = require('mongoose');

const sourceSchema = new Schema({
    articul: { type: String, required: true, minLength: [5, 'Articul field is with minilam long 5 charactrs'] },
    mark: { type: String, required: true, minLength: [5, 'Mark field is with minilam long 5 charactrs'] },
    model: { type: String, required: true, minLength: [5, 'Model field is with minilam long 5 charactrs'] },
    release: { type: String, required: true, },
    description: { type: String, required: true, minLength: [5, 'Description field is with minilam long 5 charactrs'] },
    createAt: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    owner: { type: ObjectId, required: true },
    isDelete: { type: Boolean, default: false }
});

const Source = model('Source', sourceSchema);

module.exports = Source;

//5 characters