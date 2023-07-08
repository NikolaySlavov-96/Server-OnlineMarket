const { generateCode } = require("../util/generatePromocode");

const getWheelReward = async() => {
    const rewardsArray = [ 'HEADPHONES', 'T-SHIRT', 'KEYCHAIN', 'MUG', 'WRIST BAND', 'NECKLESS' ]; //TO DO change to database
    const randomNumber = Math.random();
    let reward = '';
    
    if(rewardsArray.length == 0 || randomNumber > 0.05){ // 95% for promocode 
        reward = generateCode();
    } else{
        reward = rewardsArray[Math.floor(Math.random() * rewardsArray.length)];
    };

    return reward;
};


module.exports = {
    getWheelReward,
}