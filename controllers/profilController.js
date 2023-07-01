const { validationResult } = require('express-validator');

const { getUserById, editUserById, deleteUserById } = require("../services/profileService");
const { createNewDate } = require('../util/dates');
const { errorParser } = require('../util/parser');


const getUser = async (req, res) => {
    const { _id, email, imgUrl, telephone, birthday, firstName, middleName, lastName } = await getUserById(req.user._id);
    res.json({ _id, email, imgUrl, telephone, birthday, firstName, middleName, lastName });
}

const updateUser = async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errors
        }

        if (body.birthday) {
            const birthdayDate = body.birthday.split('/');
            const year = birthdayDate[2];
            const month = birthdayDate[1];
            const day = birthdayDate[0];
            const checkDate = new Date(year, month, day);

            const todayDate = createNewDate();
            if (todayDate >= checkDate) {
                throw new Error('Birthday date is invalid');
            }
        }

        const { _id, email, imgUrl, telephone, birthday, firstName, middleName, lastName } = await editUserById(req.user._id, req.body);
        res.json({ _id, email, imgUrl, telephone, birthday, firstName, middleName, lastName });

    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

const deleteUser = async (req, res) => {
    await deleteUserById(req.user._id);
    res.status(204).end();
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
}