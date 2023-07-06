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
    'technology': ['imgs', 'description', 'sizes', 'manufacture'],
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
    const dataShortCategory = changeFilds(short, dataSource, 'shortProduct');
    const shortCategory = await shortProduct.create(dataShortCategory);


    const value = {
        shortId: shortCategory._id,
        createdAt: createNewDate(),
        lastUpdate: createNewDate(),
    }
    const dataSpecificCategory = changeFilds(value, dataSource, dataSource.category);
    const specificCategory = await allProductCollection[dataSource.category].create(dataSpecificCategory);

    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldShortCategory = await shortProduct.findById(idSource);
    const oldSpecificCategory = await allProductCollection[dataSource.category].findOne({ shortId: idSource });

    const dataShortCategory = changeFilds(oldShortCategory, dataSource, 'shortProduct');
    const dataSpecificCategory = changeFilds(oldSpecificCategory, dataSource, dataSource.category);

    dataSpecificCategory.lastUpdate = createNewDate();

    const shortCategory = await dataShortCategory.save();
    const specificCategory = await dataSpecificCategory.save();

    return shortCategory;
}

const deleteById = async (idSource) => {
    const oldData = await shortProduct.findOne({ productId: idSource });

    oldData.isDelete = !oldData.isDelete;

    return oldData.save();
}

const changeFilds = (oldDate, dataSource, collection) => {
    for (const key in dataSource) {
        if (obectOfKeys[collection].includes(key)) {
            oldDate[key] = dataSource[key];
        }
    }

    return oldDate
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}