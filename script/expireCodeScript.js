const { getRewarExpireCode } = require("../services/rewardService");

const { createDateWithOption, createNewDateWithDate } = require("../util/dates");


const expiredCode = async () => {
    const { month, day, year } = createDateWithOption(-7)
    const query = { createAt: { $lte: createNewDateWithDate(`${year}-${month}-${day}`) } }
    const rewart = await getRewarExpireCode(query);

    rewart.map(e => {
        // console.log(e)
        // expiredCode(e._id)
    });
}

module.exports = expiredCode;