const { validationResult } = require('express-validator');

const { register, login, logout, activateAccount, checkFieldInDB, resetPassword, resetPasswordWithCode } = require('../services/authService');
const { errorParser } = require('../util/parser');
const { createNewDate, createNewDateWithDate } = require('../util/dates');

const createUser = async (req, res) => {
    const { errors } = validationResult(req);
    try {
        if (errors.length > 0) {
            throw errors
        }
        const body = req.body;
        if (body.password !== body.rePassword) {
            throw new Error('Password not\t match');
        }

        const [day, month, year] = body.birthday.split('/');
        const checkDate = createNewDateWithDate(year, month, day);
        const todayDate = createNewDate();

        if (todayDate <= checkDate) {
            throw new Error('Birthday date is invalid');
        }

        const token = await register(body);
        res.json(token);
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message });
    }
}

const getUser = async (req, res) => {
    const { errors } = validationResult(req);
    try {
        if (errors.length > 0) {
            throw errors
        }

        const body = req.body;
        const token = await login(body.email, body.password, body.stayLogin);
        res.json(token);
    } catch (err) {
        const message = errorParser(err);
        res.status(400).json({ message })
    }
}

const exitUset = async (req, res) => {
    const token = req.token;
    try {
        const data = await logout(token);
        res.status(204).end();
    } catch (err) {
        console.log(err);
    }
}

const activateUser = async (req, res) => {
    const query = req.query;
    const userId = query.userId;
    const activateCode = query.activateCode;

    try {
        const result = await activateAccount(userId, activateCode);
        res.status(202).json(result);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
};

const checkFields = async (req, res) => {
    const result = await checkFieldInDB(req.query);
    res.json(result);
}

const resetPasswordWithEmail = async (req, res) => {
    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            throw errors
        }
        const reset = await resetPassword(req.body);
        res.status(200).json({ message: 'successfull change password, Please check email' })
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message })
    }
}

const changePasswordWithCode = async (req, res) => {
    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            throw errors
        }
        const newPassword = await resetPasswordWithCode(req.body)
        res.json(newPassword);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}


module.exports = {
    createUser,
    getUser,
    exitUset,
    activateUser,
    checkFields,
    resetPasswordWithEmail,
    changePasswordWithCode,
}