const ShortModel = require("../models/ShortProdModel");

const getSearchResult = async (query,limit, skipSource) => {
    return await ShortModel.find(query).limit(limit).skip(skipSource);
}

module.exports = {
    getSearchResult,
}