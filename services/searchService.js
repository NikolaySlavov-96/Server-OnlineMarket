const Source = require("../models/SourceModel");

const getSearchResult = async (query) => {
    return await Source.find(query)
}

module.exports = {
    getSearchResult,
}