const ShortModel = require("../models/shortProdModel");

const getSearchResult = async (query) => {
    return await ShortModel.find(query)
}

module.exports = {
    getSearchResult,
}