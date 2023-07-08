const { validationResult } = require('express-validator');

const { getWheelReward, getBirthdays } = require("../services/rewardService");
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
    sendRewardForBirthday();
    setInterval(() => {
        sendBirthdayWish()
    }, 600000); //--> 10 minutes after first
}, 10000);

const sendRewardForBirthday = async () => {
    birthday(0, 'Happy Birthday after 3 days', 'sendGiftForBirthdat');
}

const sendBirthdayWish = async () => {
    birthday(0, 'Today your Birthday', 'congratulationForBirthday')
}

const birthday = async (time, message, template) => {
    const date = createDateForBirthday(time);
    const allBirthdays = (await getBirthdays(`${date.day}/${date.month}`));
    allBirthdays.map(e => {
        // To Do happy anniversary
        // const userYear = e.birthday.split('/')[2]
        // const currentDate = date.year

        const promocode = generateCode();
        // To Do Save promocode in DB


        e = { ...e._doc, code: promocode }
        // sendFromNoReplyEmail(e.email, message, template, e);
    });
}


module.exports = {
    getRewardWheel,
}
