const { validationResult } = require('express-validator');

const { getWheelReward, getBirthdays, saveCodeUsers, getRewarCode, createPartnerCode } = require("../services/rewardService");
const { emailsSender } = require('../script/emailScript');

const { milisecondsOfDays, createDateWithOption } = require('../util/dates');
const { generateCode } = require('../util/generatePromocode');
const { errorParser } = require("../util/parser");
const { createInterval } = require('../util/setInterval');


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

const sendGiftForBirthday = async () => {
    const date = createDateWithOption(2); // 2 day befor birthday
    const allBirthdays = await getBirthdays(`${date.day}/${date.month}`);
    const promocode = generateCode();
    const purcendDiscount = 20; // To Do outsit this code;

    const sendedCode = await emailsSender(allBirthdays, 'Happy Birthday after 2 days', 'sendGiftForBirthdat', { promocode, purcendDiscount });
    await saveCodeUsers({ promocode, description: 'Happy Byrhday Code', sendedCode, purcendDiscount });
}
const dayToMilisecond = milisecondsOfDays();
createInterval(dayToMilisecond + 300000, sendGiftForBirthday);

const congratulationForBirthday = async () => {
    const date = createDateWithOption(0); //  day on birthday
    const allBirthdays = await getBirthdays(`${date.day}/${date.month}`);

    emailsSender(allBirthdays, 'Today your Birthday', 'congratulationForBirthday');
}
createInterval((dayToMilisecond + 600000), congratulationForBirthday);

module.exports = {
    getRewardWheel,
    verifyRewardCode,
    addingPartnerCode,
}