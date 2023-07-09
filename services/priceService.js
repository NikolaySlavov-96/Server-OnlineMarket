const PriceModel = require("../models/PriceModel");

const { calculatePrice } = require("../util/prices");


const createPriceWithProduct = async (dataSource) => {
    return await PriceModel.create({
        buyPrice: dataSource.buyPrice,
        quantity: dataSource.quantity,
        sellPrice: calculatePrice(dataSource.buyPrice, '200'),
    });
}

const updatePriceWithProduct = async (id, dataSource) => {
    const prices = await PriceModel.findById(id);
    prices.buyPrice = dataSource.buyPrice;
    prices.quantity = dataSource.quantity;
    prices.sellPrice = calculatePrice(dataSource.buyPrice, '200');

    return await prices.save();
}

module.exports = {
    createPriceWithProduct,
    updatePriceWithProduct,
}