const { getSearchResult } = require("../services/searchService");

const getFindValue = async (req, res) => {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;
    const skipSource = (page - 1) * limit;

    const findData = req?.query?.where?.split('=');
    const valueFilt = findData[1];
    const patter = new RegExp(valueFilt, 'i');

    const query = {
        $or: [{ productCode: { $regex: patter } },
        { productName: { $regex: patter } },
        { category: { $regex: patter } },
        { subCategory: { $regex: patter } },
        { release: { $regex: patter } }]
    }

    const searchResult = await getSearchResult(query, limit, skipSource);
    res.json(searchResult);
}

module.exports = {
    getFindValue,
}