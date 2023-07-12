const { getRewarExpireCode, editExpireCode } = require("../services/rewardService");

const { createDateWithOption, createNewDateWithDate } = require("../util/dates");


const expiredCode = async () => {
    const { month, day, year } = createDateWithOption(-7)
    const query = { isExpired: false, createAt: { $lte: createNewDateWithDate(`${year}-${month}-${day}`) } }
    const rewart = await getRewarExpireCode(query);

    rewart.map(async e => {
        await editExpireCode(e._id)
    });
}

module.exports = expiredCode;