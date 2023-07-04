const shortModel = require("../models/shortProdModel");

const getSearchResult = async (query) => {
    return await shortModel.find(query)
}

module.exports = {
    getSearchResult,
}