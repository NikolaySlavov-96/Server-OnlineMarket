const { validationResult } = require('express-validator');

const { getWheelReward, getBirthdays, saveCodeUsers } = require("../services/rewardService");
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
        res.status(401).json(message); //TO DO Change status
    }
};

const dayToMilisecond = milisecondsOfDays();
setInterval(() => {
    birthday(2, 'Happy Birthday after 2 days', 'sendGiftForBirthdat');
    setInterval(() => {
        birthday(0, 'Today your Birthday', 'congratulationForBirthday');
    }, 600000); //--> 10 minutes after first
}, dayToMilisecond);


const birthday = async (time, message, template) => {
    const date = createDateForBirthday(time);

    const promocode = generateCode();
    const sendedCode = [];
    const allBirthdays = (await getBirthdays(`${date.day}/${date.month}`));
    allBirthdays.map(e => {
        // To Do happy anniversary
        // const userYear = e.birthday.split('/')[2]
        // const currentDate = date.year

        sendedCode.push(e._id);
        e = { ...e._doc, code: promocode }
        sendFromNoReplyEmail(e.email, message, template, e);
    });
    await saveCodeUsers(promocode, 'Happy Byrhday Code', sendedCode);
}


module.exports = {
    getRewardWheel,
}
