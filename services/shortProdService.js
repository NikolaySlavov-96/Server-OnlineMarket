const shortProduct = require("../models/shortProdModel");
const TechnologyModel = require("../models/products/technologyModel");

const { createNewDate } = require("../util/dates");

const allProductCollection = {
    'technology': TechnologyModel
}

const obectOfKeys = {
    'shortProduct': ['coverImg', 'productName', 'category', 'subCategory', 'release'],
    'technology': ['imgs', 'description', 'sizes'],
}

const getAll = (query, limit, skipSource) => {
    return shortProduct.find(query).limit(limit).skip(skipSource);
}

const getById = async (category, idSource) => {
    const shortDate = await shortProduct.findOne({ productId: idSource }).lean();
    const otherDate = await allProductCollection[category].findById(idSource).lean();

    const allDateOfDB = Object.assign({ ...shortDate }, otherDate);

    return allDateOfDB
}

const create = async (dataSource) => {
    // always stay same
    const short = {};
    for (const key in dataSource) {
        if (obectOfKeys.shortProduct.includes(key)) {
            short[key] = dataSource[key];
        }
    }
    const shortCategory = await shortProduct.create(short);

    const value = {
        shortId: shortCategory._id,
        createdAt: createNewDate(),
        lastUpdate: createNewDate(),
    }
    for (const key in dataSource) {
        if (obectOfKeys[dataSource.category].includes(key)) {
            value[key] = dataSource[key]
        }
    }
    const specificCategory = await allProductCollection[dataSource.category].create(value);

    return dataSource;
    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldShortCategory = await shortProduct.findById(idSource);
    const oldSpecificCategory = await allProductCollection[dataSource.category].findOne({ shortId: idSource });
    // always stay same
    for (const key in dataSource) {
        if (obectOfKeys.shortProduct.includes(key)) {
            oldShortCategory[key] = dataSource[key];
        }
    }

    // To Do Adding object save all field in all collection
    for (const key in dataSource) {
        if (obectOfKeys[dataSource.category].includes(key)) {
            oldSpecificCategory[key] = dataSource[key];
        }
    }
    oldSpecificCategory.lastUpdate = createNewDate();

    const shortCategory = await oldShortCategory.save();
    const specificCategory = await oldSpecificCategory.save();

    return shortCategory;
}

const deleteById = async (idSource) => {
    const oldData = await shortProduct.findOne({ productId: idSource });

    oldData.isDelete = !oldData.isDelete;

    return oldData.save();
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}