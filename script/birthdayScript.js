const { getBirthdays, saveCodeUsers } = require("../services/rewardService");
const { emailsSender } = require("./emailScript");

const { createDateWithOption } = require("../util/dates");
const { generateCode } = require("../util/generatePromocode");


const sendGiftForBirthday = async () => {
    const date = createDateWithOption(2); // 2 day befor birthday
    const allBirthdays = await getBirthdays(`${date.day}/${date.month}`);
    const promocode = generateCode();
    const purcendDiscount = 20; // To Do outsit this code;

    const sendedCode = await emailsSender(allBirthdays, 'Happy Birthday after 2 days', 'sendGiftForBirthdat', { promocode, purcendDiscount });
    await saveCodeUsers({ promocode, description: 'Happy Byrhday Code', sendedCode, purcendDiscount });
}

const congratulationForBirthday = async () => {
    const date = createDateWithOption(0); //  day on birthday
    const allBirthdays = await getBirthdays(`${date.day}/${date.month}`);

    emailsSender(allBirthdays, 'Today your Birthday', 'congratulationForBirthday');
}


module.exports = {
    sendGiftForBirthday,
    congratulationForBirthday,
}