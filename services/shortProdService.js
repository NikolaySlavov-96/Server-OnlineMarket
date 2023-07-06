const shortProduct = require("../models/shortProdModel");
const TechnologyModel = require("../models/products/technologyModel");

const { createNewDate } = require("../util/dates");
const PriceModel = require("../models/priceModel");
const { createPriceWithProduct } = require("./priceService");

const allProductCollection = {
    'technology': TechnologyModel
}

const obectOfKeys = {
    'shortProduct': ['coverImg', 'productName', 'category', 'subCategory', 'release', 'mark', 'productCode'],
    'technology': ['imgs', 'description', 'sizes','manufacture'],
}

const getAll = (query, limit, skipSource) => {
    return shortProduct.find(query).limit(limit).skip(skipSource).populate({ path: 'price', select: ['sellPrice', 'discountPurcent', 'currency'] });
}

const getById = async (category, idSource) => {
    const shortDate = await shortProduct.findById(idSource).populate({ path: 'price', select: ['sellPrice', 'discountPurcent', 'currency'] }).lean();
    const otherDate = await allProductCollection[category].findOne({ shortId: idSource }).lean();
    const allDateOfDB = Object.assign({ ...shortDate }, otherDate);

    return allDateOfDB
}

const create = async (dataSource) => {

    const createPrice = await createPriceWithProduct(dataSource);
    const short = {
        price: createPrice._id,
    };
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

    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldShortCategory = await shortProduct.findById(idSource);
    const oldSpecificCategory = await allProductCollection[dataSource.category].findOne({ shortId: idSource });
    for (const key in dataSource) {
        if (obectOfKeys.shortProduct.includes(key)) {
            oldShortCategory[key] = dataSource[key];
        }
    }

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

const changeFilds = () => {
    for (const key in dataSource) {
        if (obectOfKeys.shortProduct.includes(key)) {
            oldShortCategory[key] = dataSource[key];
        }
    }

    for (const key in dataSource) {
        if (obectOfKeys[dataSource.category].includes(key)) {
            oldSpecificCategory[key] = dataSource[key];
        }
    }
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}