const ShortProduct = require("../models/shortProdModel");
const TechnologyModel = require("../models/products/technologyModel");

const { createPriceWithProduct, updatePriceWithProduct } = require("./priceService");

const { createNewDate } = require("../util/dates");
const { changeFilds } = require("../util/changeFilds");

const allProductCollection = {
    'technology': TechnologyModel
}

const obectOfKeys = {
    'shortProduct': ['coverImg', 'productName', 'category', 'subCategory', 'release', 'mark', 'productCode'],
    'technology': ['imgs', 'description', 'sizes', 'manufacture'],
}

const getAll = (query, limit, skipSource) => {
    return ShortProduct.find(query).limit(limit).skip(skipSource).populate({ path: 'price', select: ['sellPrice', 'discountPurcent', 'currency'] });
}

const getById = async (category, idSource) => {
    const shortDate = await ShortProduct.findById(idSource).populate({ path: 'price', select: ['sellPrice', 'discountPurcent', 'currency'] }).lean();
    const otherDate = await allProductCollection[category].findOne({ shortId: idSource }).lean();
    const allDateOfDB = Object.assign({ ...shortDate }, otherDate);

    return allDateOfDB
}

const create = async (dataSource) => {

    const createPrice = await createPriceWithProduct(dataSource);
    const short = {
        price: createPrice._id,
    };
    const dataShortCategory = changeFilds(obectOfKeys, short, dataSource, 'shortProduct');
    const shortCategory = await ShortProduct.create(dataShortCategory);


    const value = {
        shortId: shortCategory._id,
        createdAt: createNewDate(),
        lastUpdate: createNewDate(),
    }
    const dataSpecificCategory = changeFilds(obectOfKeys, value, dataSource, dataSource.category);
    const specificCategory = await allProductCollection[dataSource.category].create(dataSpecificCategory);

    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldShortCategory = await ShortProduct.findById(idSource);
    const oldSpecificCategory = await allProductCollection[dataSource.category].findOne({ shortId: idSource });

    const dataShortCategory = changeFilds(obectOfKeys, oldShortCategory, dataSource, 'shortProduct');
    const dataSpecificCategory = changeFilds(obectOfKeys, oldSpecificCategory, dataSource, dataSource.category);

    dataSpecificCategory.lastUpdate = createNewDate();

    await updatePriceWithProduct(oldShortCategory.price, dataSource);
    const shortCategory = await dataShortCategory.save();
    const specificCategory = await dataSpecificCategory.save();

    return shortCategory;
}

const deleteById = async (idSource) => {
    const oldData = await ShortProduct.findOne({ productId: idSource });

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