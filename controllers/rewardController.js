const { validationResult } = require('express-validator');

const { getWheelReward, getBirthdays, saveCodeUsers, getRewarCode, createPartnerCode } = require("../services/rewardService");
const { milisecondsOfDays, createDateForBirthday } = require('../util/dates');
const { generateCode } = require('../util/generatePromocode');
const { errorParser } = require("../util/parser");

const { sendFromNoReplyEmail } = require('../services/emailService');


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
        console.log(req.query)
        const code = await getRewarCode(req.query.promocode);
        res.json(code);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

const addingPartnerCode = async (req, res) => {
    try {
        const code = await createPartnerCode(req.query.partnercode);
        res.json(code);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

const dayToMilisecond = milisecondsOfDays();
setInterval(() => {
    sendGiftForBirthdat();
    setInterval(() => {
        congratulationForBirthday();
    }, 600000); //--> 10 minutes after first
}, dayToMilisecond);

const sendGiftForBirthdat = async () => {
    const promocode = generateCode();
    const array = await birthday(2, 'Happy Birthday after 2 days', 'sendGiftForBirthdat', promocode);
    await saveCodeUsers(promocode, 'Happy Byrhday Code', array);
}

const congratulationForBirthday = async () => {
    birthday(0, 'Today your Birthday', 'congratulationForBirthday');
}

const birthday = async (time, message, template, promocode) => {
    const date = createDateForBirthday(time);

    const sendedCode = [];
    const allBirthdays = await getBirthdays(`${date.day}/${date.month}`);
    allBirthdays.map(e => {
        // To Do happy anniversary
        // const userYear = e.birthday.split('/')[2]
        // const currentDate = date.year

        sendedCode.push(e._id);
        e = { ...e._doc, code: promocode }
        sendFromNoReplyEmail(e.email, message, template, e);
    });

    if (promocode) {
        return sendedCode;
    }
}


module.exports = {
    getRewardWheel,
    verifyRewardCode,
    addingPartnerCode,
}
