const { getWheelReward } = require("../services/rewardService");
const { errorParser } = require("../util/parser");



const getRewardWheel = async (req, res) => {
    try {
        if(!req.body.email){
            throw new Error('Missing email');
        };
        
        const reward = await getWheelReward()
        res.status(200).json(reward);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json(message); //TO DO Change status
    }
};


module.exports = {
    getRewardWheel,
}
