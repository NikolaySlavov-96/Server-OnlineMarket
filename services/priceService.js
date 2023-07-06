const PriceModel = require("../models/priceModel");
const { calculatePrice } = require("../util/prices");

const createPriceWithProduct = async (dataSource) => {
    return await PriceModel.create({
        buyPrice: dataSource.buyPrice,
        quantity: dataSource.quantity,
        sellPrice: calculatePrice(dataSource.buyPrice, '200'),
    });
}

module.exports = {
    createPriceWithProduct,
}