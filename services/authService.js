const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_Secret = process.env.JWT_SECTES;

const UserMode = require("../models/UserModel");
const BlackList = require('../models/backListModel');

async function register(username, email, password, year) {

    const existingUsername = await UserMode.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken');
    }

    const existingEmail = await UserMode.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken');
    }

    const date = new Date();

    const userData = await UserMode.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        year,
        creadAt: date,
        lastUpdate: date,
    })

    return createTokent(userData);
}

async function login(username, password) {

    const existingUsername = await UserMode.findOne({ username });

    if (existingUsername.isDelete) {
        throw new Error('Profile is delete, contact with administrate');
    }

    if (!existingUsername) {
        throw new Error('Username or Password is not valit');
    }

    const matchPassword = await bcrypt.compare(password, existingUsername.password);

    if (!matchPassword) {
        throw new Error('Username or Password is not valit')
    }

    return createTokent(existingUsername)
}

async function logout(token) {
    const request = await BlackList.create({
        inActivateToken: token,
    });
    return request;
}

function createTokent({ _id, email, username, year }) {
    const payload = {
        _id,
        email,
        username,
        year,
    }

    return {
        _id,
        email,
        username,
        year,
        accessToken: jwt.sign(payload, JWT_Secret),
    }
}

async function verificationToken(token) {
    const existingToken = await BlackList.findOne({ inActivateToken: token });
    if (existingToken) {
        throw new Error('Expected Token');
    }
    return jwt.verify(token, JWT_Secret);
}

module.exports = {
    register,
    login,
    logout,
    verificationToken
}