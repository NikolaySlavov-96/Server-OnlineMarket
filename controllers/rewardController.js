const { validationResult } = require('express-validator');

const { getWheelReward, getRewarCode, createPartnerCode } = require("../services/rewardService");

const { errorParser } = require("../util/parser");


const getRewardWheel = async (req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) {
            throw errors
        }

        const reward = await getWheelReward()
        res.status(200).json(reward);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message }); //TO DO Change status
    }
};

const verifyRewardCode = async (req, res) => {
    try {
        const query = { isDelete: false, promocode: req.query.promocode }
        const code = await getRewarCode(query);
        res.json(code);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

const addingPartnerCode = async (req, res) => {
    try {
        const code = await createPartnerCode(req.query);
        res.json(code);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

module.exports = {
    getRewardWheel,
    verifyRewardCode,
    addingPartnerCode,
}