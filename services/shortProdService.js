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
    // To Do Adding object save all field in all collection
    const specificCategory = await allProductCollection[dataSource.category].create({
        imgs: dataSource.imgs,
        description: dataSource.description,
        sizes: dataSource.sizes,
        release: dataSource.release,
    });

    // always stay same
    const shortCategory = await shortProduct.create({
        productId: specificCategory._id,
        coverImg: dataSource.coverImg,
        productName: dataSource.productName,
        category: dataSource.category,
        subCategory: dataSource.subCategory,
        lastUpdate: createNewDate(),
        createdAt: createNewDate(),
    });

    return shortCategory;
}

const updateById = async (idSource, dataSource) => {
    const oldSpecificCategory = await allProductCollection[dataSource.category].findById(idSource);
    const oldShortCategory = await shortProduct.findOne({ productId: idSource });

    // To Do Adding object save all field in all collection
    oldSpecificCategory.imgs = dataSource.imgs;
    oldSpecificCategory.description = dataSource.description;
    oldSpecificCategory.sizes = dataSource.sizes;
    oldSpecificCategory.release = dataSource.release;

    // always stay same
    oldShortCategory.coverImg = dataSource.coverImg;
    oldShortCategory.productName = dataSource.productName;
    oldShortCategory.category = dataSource.category;
    oldShortCategory.subCategory = dataSource.subCategory;

    oldSpecificCategory.lastUpdate = createNewDate();

    const specificCategory = await oldSpecificCategory.save();
    const shortCategory = await oldShortCategory.save();

    return shortCategory;
}

const deleteById = async (idSource) => {
    const oldData = await shortProduct.findOne({ productId: idSource });

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