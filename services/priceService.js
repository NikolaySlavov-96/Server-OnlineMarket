const PriceModel = require("../models/PriceModel");
const { changeFilds } = require("../util/changeFilds");

const { calculatePrice } = require("../util/prices");

const obectOfKeys = {
    'priceCreateUpdate': ['buyPrice', 'quantity'],
}

const createPriceWithProduct = async (dataSource) => {
    const value = {
        sellPrice: calculatePrice(dataSource.buyPrice, '200'),
    };
    const field = changeFilds(obectOfKeys['priceCreateUpdate'], value, dataSource)
    return await PriceModel.create(field);
}

const updatePriceWithProduct = async (id, dataSource) => {
    const prices = await PriceModel.findById(id);
    const field = changeFilds(obectOfKeys['priceCreateUpdate'], prices, dataSource)
    field.sellPrice = calculatePrice(dataSource.buyPrice, '200');

    return await prices.save();
}

module.exports = {
    createPriceWithProduct,
    updatePriceWithProduct,
}