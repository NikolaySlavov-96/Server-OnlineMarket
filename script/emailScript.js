const { sendFromNoReplyEmail } = require("../services/emailService");

const emailsSender = async (arrayOfDate, theme, template, promocode) => {
    const sendedCode = [];
    arrayOfDate.map(e => {
        // To Do happy anniversary
        // const userYear = e.birthday.split('/')[2]
        // const currentDate = date.year

        sendedCode.push(e._id);
        e = { ...e._doc, code: promocode }
        sendFromNoReplyEmail(e.email, theme, template, e);
    });

    if (promocode) {
        return sendedCode;
    }
}

module.exports = {
    emailsSender,
}