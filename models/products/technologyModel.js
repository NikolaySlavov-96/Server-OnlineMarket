const { model, Schema } = require('mongoose');

const technologySchema = new Schema({
    imgs: { type: [String], required: true },
    description: { type: String, required: true },
    sizes: { type: String, required: true },
    release: { type: String, }
});

const TechnologyModel = model('Technology', technologySchema);

module.exports = TechnologyModel;