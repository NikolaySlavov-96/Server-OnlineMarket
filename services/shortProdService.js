const shortProduct = require("../models/shortProdModel");
const TechnologyModel = require("../models/products/technologyModel");

const { createNewDate } = require("../util/dates");

const allProductCollection = {
    'technology': TechnologyModel
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
    const shortCategory = await shortProduct.create({
        coverImg: dataSource.coverImg,
        productName: dataSource.productName,
        category: dataSource.category,
        subCategory: dataSource.subCategory,
        release: dataSource.release,
    });

    // To Do Adding object save all field in all collection
    const specificCategory = await allProductCollection[dataSource.category].create({
        shortId: shortCategory._id,
        imgs: dataSource.imgs,
        description: dataSource.description,
        sizes: dataSource.sizes,
        createdAt: createNewDate(),
        lastUpdate: createNewDate(),
    });

    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldShortCategory = await shortProduct.findById(idSource);
    const oldSpecificCategory = await allProductCollection[dataSource.category].findOne({ shortId: idSource });
    // always stay same
    oldShortCategory.coverImg = dataSource.coverImg;
    oldShortCategory.productName = dataSource.productName;
    oldShortCategory.category = dataSource.category;
    oldShortCategory.subCategory = dataSource.subCategory;
    oldShortCategory.release = dataSource.release;

    // To Do Adding object save all field in all collection
    oldSpecificCategory.imgs = dataSource.imgs;
    oldSpecificCategory.description = dataSource.description;
    oldSpecificCategory.sizes = dataSource.sizes;

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