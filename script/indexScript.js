const expiredCode = require("./expireCodeScript");
const { sendGiftForBirthday, congratulationForBirthday } = require("./birthdayScript");

const { milisecondsOfDays } = require("../util/dates");
const { createInterval } = require("../util/setInterval");


function call() {
    const dayToMilisecond = milisecondsOfDays();
    createInterval(dayToMilisecond, expiredCode);
    createInterval(dayToMilisecond + 300000, sendGiftForBirthday);
    createInterval(dayToMilisecond + 600000, congratulationForBirthday);
}


module.exports = call;