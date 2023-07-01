const { validationResult } = require('express-validator');

const { register, login, logout } = require('../services/authService');
const { errorParser } = require('../util/parser');

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
        const token = await register(body.username, body.email, body.password, body.year);
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
        const token = await login(body.username, body.password);
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