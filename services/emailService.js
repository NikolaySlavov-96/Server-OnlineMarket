const nodemailer = require('nodemailer');

const registerTemplate = require('../emailTemplates/registertemplate');
const sendGiftForBirthdat = require('../emailTemplates/sendGiftForBirthdat');
const congratulationForBirthday = require('../emailTemplates/congratulationForBirthday');

require('dotenv').config();

const templates = {
    'register': (date) => registerTemplate(date),
    'sendGiftForBirthdat': (date) => sendGiftForBirthdat(date),
    'congratulationForBirthday': (date) => congratulationForBirthday(date),
}


const sendMail = (from, to, subject, type, date) => {
    const head = {
        from: from,
        to: to,
        subject: subject,
        html: templates[type](date),
    }

    transporter.sendMail(head, (err, info) => {
        if (err) {
            throw err;
        }
    })
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_INFO_Nam,
        pass: process.env.EMAIL_INFO_Pass,
    }
});

const sendFromInfoEmail = sendMail.bind(null, process.env.EMAIL_INFO_NAM);
const sendFromNoReplyEmail = sendMail.bind(null, process.env.EMAIL_NOREPLY_Name);

module.exports = {
    sendFromInfoEmail,
    sendFromNoReplyEmail,
}