const { validationResult } = require('express-validator');

const { register, login, logout } = require('../services/authService');
const { errorParser } = require('../util/parser');
const { createNewDate } = require('../util/dates');

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

        if (!body.imgUrl) {
            body.imgUrl = '/statcil/profile1' // To Do change picture address
        }

        if (body.birthday) {
            const birthdayDate = body.birthday.split('/');
            const year = birthdayDate[2];
            const month = birthdayDate[1];
            const day = birthdayDate[0];
            const checkDate = new Date(year, month, day);

            const todayDate = createNewDate();
            if (todayDate <= checkDate) {
                throw new Error('Birthday date is invalid');
            }
        }

        const token = await register(body.email, body.imgUrl, body.password, body.telephone, body.birthday, body.firstName, body.middleName, body.lastName);
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
        const token = await login(body.email, body.password);
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


module.exports = {
    createUser,
    getUser,
    exitUset
}