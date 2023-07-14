const calculatePrice = (price, percent) => {
    return Number(price) + 13; //Currently every product makes 6лв profit
};

module.exports = {
    calculatePrice,
}