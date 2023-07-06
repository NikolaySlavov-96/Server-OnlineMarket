const calculatePrice = (price, purcent) => {
    return Number(price) * Number(purcent);
};

module.exports = {
    calculatePrice,
}