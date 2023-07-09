const UserModel = require("../models/userModel");
const RewardCodeModel = require("../models/rewartCodeModel");
const PartnerCodeModel = require("../models/partnerCodeModel");

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

const saveCodeUsers = async (promocode, description, sendedCode) => {
    return await RewardCodeModel.create({
        promocode,
        description,
        sendedCode,
        lastUpdate: createNewDate(),
        createAt: createNewDate(),
    });
};

const getRewarCode = async (promocode) => {
    const rewardCode = await RewardCodeModel.find({ promocode }).find({ isExpired: false }).count() > 0;
    const partnerCode = !rewardCode && await PartnerCodeModel.find({ promocode }).find({ isDelete: false }).count() > 0;

    return rewardCode || partnerCode;
};

const createPartnerCode = async (promocode) => {
    return await PartnerCodeModel.create({
        promocode,
        createAt: createNewDate(),
        lastUpdate: createNewDate(),
    });
};

module.exports = {
    getWheelReward,
    getBirthdays,
    saveCodeUsers,
    getRewarCode,
    createPartnerCode,
}