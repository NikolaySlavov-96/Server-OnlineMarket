const ShortProduct = require("../models/ShortProdModel");
const ElectronicsModel = require("../models/products/ElectronicsModel");
const BabysModel = require("../models/products/BabysModel");
const FashionModel = require("../models/products/FashionModel");
const OfficeModel = require("../models/products/OfficeModel");

const { createPriceWithProduct, updatePriceWithProduct } = require("./priceService");

const { createNewDate } = require("../util/dates");
const { changeFilds } = require("../util/changeFilds");

const allProductCollection = {
    'electronics': ElectronicsModel,
    'babys': BabysModel,
    'fashion': FashionModel,
    'office': OfficeModel,
}

const obectOfKeys = {
    'shortProduct': ['coverImg', 'productName', 'category', 'subCategory', 'release', 'mark', 'productCode'],
    'electronics': ['imgs', 'description', 'sizes', 'manufacture'],
    'fashion': ['imgs', 'description', 'sizes', 'manufacture', 'material'],
    'babys': ['imgs', 'description', 'sizes', 'manufacture'],
    'office': ['imgs', 'description', 'sizes', 'manufacture'],
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

    await updatePriceWithProduct(oldShortCategory.price, dataSource);
    const shortCategory = await dataShortCategory.save();
    const specificCategory = await dataSpecificCategory.save();

    return shortCategory;
}

const deleteById = async (idSource) => {
    const oldData = await ShortProduct.findOne({ productId: idSource });

    oldData.lastUpdate = createNewDate();
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