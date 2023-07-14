const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
require('dotenv').config();

const JWT_Secret = process.env.JWT_SECRES;

const UserModel = require('../models/UserModel');
const BlackListTokenModel = require('../models/BackListTokenModel');
const ActivationModel = require('../models/ActivationModel');
const ResetPasswordModel = require('../models/ResetPasswordModel');

const { createNewDate } = require('../util/dates');
const { sendFromNoReplyEmail } = require('./emailService');
const { generateCode } = require('../util/generatePromocode');

async function register(email, imgUrl, password, telephone, birthday, firstName, middleName, lastName, circulation) {

    const existingEmail = await UserModel.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken');
    }

    const existingTelephoneNumber = await UserModel.findOne({ telephone });
    if (existingTelephoneNumber) {
        throw new Error('Telephone Number is using');
    }

    const userData = await UserModel.create({
        email,
        imgUrl,
        circulation,
        password: await hashPassword(password),
        telephone,
        birthday,
        firstName,
        middleName,
        lastName,
        createdAt: createNewDate(),//I got an error (Path `createdAt` is required.);
        lastUpdate: createNewDate(),
    });

    const activateCodel = uuid.v4().slice(0, 7);
    const userId = userData._id;
    await ActivationModel.create({
        userId: userId,
        sendCode: activateCodel,
        dateSend: createNewDate(),
    });

    sendFromNoReplyEmail(email, 'Successful Register', 'register', { userId, activateCodel })

    return createTokent(userData);
}

async function login(email, password, stayLogin) {

    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail.isDelete) {
        throw new Error('Profile is delete, contact with administrate');
    }

    if (!existingEmail) {
        throw new Error('Email or Password is not valit');
    }

    const matchPassword = await bcrypt.compare(password, existingEmail.password);

    if (!matchPassword) {
        throw new Error('Email or Password is not valit')
    }
    return createTokent(existingEmail, stayLogin)
}

async function logout(token) {
    const request = await BlackListTokenModel.create({
        inActivateToken: token,
    });
    return request;
}

function createTokent({ _id, email, imgUrl, firstName, lastName, role, isActivate, circulation }, stayLogin) {
    const payload = {
        _id,
        email,
        firstName,
        role,
    }

    let expire = '12h'
    if (stayLogin) {
        expire = '29d'
    }

    return {
        _id,
        imgUrl,
        firstName,
        lastName,
        role,
        isActivate,
        circulation,
        accessToken: jwt.sign(payload, JWT_Secret, { expiresIn: expire }),
    }
}

async function verificationToken(token) {
    const existingToken = await BlackListTokenModel.findOne({ inActivateToken: token });
    if (existingToken) {
        throw new Error('Expected Token');
    }
    return jwt.verify(token, JWT_Secret);
}

async function activateAccount(userId, activateCode) {
    const resultCode = await ActivationModel.findOne({ userId });

    if (resultCode.sendCode == activateCode) {
        resultCode.dateUsing = createNewDate();
        const userDate = await UserModel.findById(userId);
        userDate.isActivate = true;
        await resultCode.save();
        await userDate.save();
        return { message: 'Complete verification' }
    }

    throw new Error('Activation Code don\'t match');
}

async function checkFieldInDB(date) {
    const isUsing = await UserModel.findOne(date).count() > 0;
    return isUsing;
}

async function resetPassword({ email, telephone }) {
    const checkEmail = await UserModel.findOne({ email, telephone });
    if (checkEmail.length === 0) {
        throw new Error('Email address or telephone number is not valid');
    }

    const code = generateCode();
    await ResetPasswordModel.create({
        userId: checkEmail._id,
        sendCode: code,
        dateSend: createNewDate(),
    });

    sendFromNoReplyEmail(checkEmail.email, 'Reset Password', 'resetPassword', code);
    return checkEmail
}

async function resetPasswordWithCode({ resetCode, newPassword, repeatNewPassword }) {
    const checkResetCode = await ResetPasswordModel.findOne({ isExpired: false, sendCode: resetCode });
    if(!checkResetCode) {
        throw new Error('Reset code is using or expired')
    }
    checkResetCode.userData = createNewDate();
    checkResetCode.isExpired = true;
    
    const newPass = await hashPassword(newPassword);
    if (newPassword !== repeatNewPassword) {
        throw new Error('Password don\'t match');
    }
    
    const userDate = await UserModel.findOne({ _id: checkResetCode.userId });
    userDate.password = newPass
    userDate.lastUpdate = createNewDate();
    const date = await userDate.save();
    
    await checkResetCode.save();

    return createTokent(date)
}

const hashPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = {
    register,
    login,
    logout,
    verificationToken,
    activateAccount,
    checkFieldInDB,
    resetPassword,
    resetPasswordWithCode,
}