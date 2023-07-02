const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
require('dotenv').config();

const JWT_Secret = process.env.JWT_SECRES;

const UserMode = require("../models/UserModel");
const BlackList = require('../models/backListModel');
const activationModel = require('../models/activationModel');

const { createNewDate } = require('../util/dates');
const { sendFromNoReplyEmail } = require('./emailService');

async function register(email, imgUrl, password, telephone, birthday, firstName, middleName, lastName) {

    const existingEmail = await UserMode.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken');
    }

    const existingTelephoneNumber = await UserMode.findOne({ telephone });
    if (existingTelephoneNumber) {
        throw new Error('Telephone Number is using');
    }

    const userData = await UserMode.create({
        email,
        imgUrl,
        password: await bcrypt.hash(password, 10),
        telephone,
        birthday,
        firstName,
        middleName,
        lastName,
        creadAt: createNewDate(),
        lastUpdate: createNewDate(),
    });

    const activateCodel = uuid.v4().slice(0, 7);
    const userId = userData._id;
    await activationModel.create({
        userId: userId,
        sendCode: activateCodel,
        dateSend: createNewDate(),
    });

    sendFromNoReplyEmail(email, 'Successful Register', 'register', { userId, activateCodel })

    return createTokent(userData);
}

async function login(email, password) {

    const existingEmail = await UserMode.findOne({ email });

    if (existingEmail.isDelete) {
        throw new Error('Profile is delete, contact with administrate');
    }

    if (!existingEmail) {
        throw new Error('Username or Password is not valit');
    }

    const matchPassword = await bcrypt.compare(password, existingEmail.password);

    if (!matchPassword) {
        throw new Error('Username or Password is not valit')
    }

    return createTokent(existingEmail)
}

async function logout(token) {
    const request = await BlackList.create({
        inActivateToken: token,
    });
    return request;
}

function createTokent({ _id, email, imgUrl, firstName, lastName, role, isActivate }) {
    const payload = {
        _id,
        email,
        firstName,
        role,
    }

    return {
        _id,
        imgUrl,
        firstName,
        lastName,
        role,
        isActivate,
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