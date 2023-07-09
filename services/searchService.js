const ShortModel = require("../models/ShortProdModel");

const getSearchResult = async (query) => {
    return await ShortModel.find(query)
}

module.exports = {
    getSearchResult,
}