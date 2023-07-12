const UserModel = require("../models/UserModel");
const RewardCodeModel = require("../models/RewartCodeModel");
const PartnerCodeModel = require("../models/PartnerCodeModel");

const { createNewDate } = require("../util/dates");
const { generateCode } = require("../util/generatePromocode");


const getWheelReward = async () => {
    const rewardsArray = ['HEADPHONES', 'T-SHIRT', 'KEYCHAIN', 'MUG', 'WRIST BAND', 'NECKLESS']; //TO DO change to database
    const randomNumber = Math.random();
    let reward = '';

    if (rewardsArray.length == 0 || randomNumber > 0.05) { // 95% for promocode 
        reward = generateCode();
    } else {
        reward = rewardsArray[Math.floor(Math.random() * rewardsArray.length)];
    };
    return reward;
};

const getBirthdays = async (birthday) => {
    return UserModel.find({ birthday: { $regex: `^${birthday}` } }).select(['email', 'firstName', 'lastName', 'birthday']);
};

const saveCodeUsers = async (date) => {
    return await RewardCodeModel.create({
        promocode: date.promocode,
        description: date.description,
        sendedCode: date.sendedCode,
        purcendDiscount: date.purcendDiscount,
        lastUpdate: createNewDate(),
        createAt: createNewDate(),
    });
};

const getRewarCode = async (query) => {
    const rewardCode = await RewardCodeModel.find(query).count() > 0;
    const partnerCode = !rewardCode && await PartnerCodeModel.find(query).count() > 0;

    return rewardCode || partnerCode;
};

const getRewarExpireCode = async (query) => {
    const rewardCode = await RewardCodeModel.find(query);

    return rewardCode
}

const createPartnerCode = async (query) => {
    return await PartnerCodeModel.create({
        promocode: query.promocode,
        purcendDiscount: query.purcendDiscount,
        createAt: createNewDate(),
        lastUpdate: createNewDate(),
    });
};

const editExpireCode = async (idCode) => {
    const code = await RewardCodeModel.findById(idCode);

    code.lastUpdate = createNewDate();
    code.isExpired = !code.isExpired;
    return await code.save();
};

module.exports = {
    getWheelReward,
    getBirthdays,
    saveCodeUsers,
    getRewarCode,
    getRewarExpireCode,
    createPartnerCode,
    editExpireCode,
}