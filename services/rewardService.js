const UserModel = require("../models/userModel");

const { generateCode } = require("../util/generatePromocode");

const getWheelReward = async () => {
    const rewardsArray = ['HEADPHONES', 'T-SHIRT', 'KEYCHAIN', 'MUG', 'WRIST BAND', 'NECKLESS']; //TO DO change to database
    const randomNumber = Math.random();
    let reward = '';
    

    if(rewardsArray.length == 0 || randomNumber > 0.05){ // 95% for promocode 
        reward = generateCode();
    } else {
        reward = rewardsArray[Math.floor(Math.random() * rewardsArray.length)];
    };

    return reward;
};

const getBirthdays = async (birthday) => {
    return UserModel.find({ birthday: { $regex: `^${birthday}` } }).select(['email', 'firstName', 'lastName', 'birthday']);
};

module.exports = {
    getWheelReward,
    getBirthdays,
}