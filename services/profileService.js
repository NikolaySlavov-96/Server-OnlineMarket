const UserModel = require("../models/UserModel");
const { changeFilds } = require("../util/changeFilds");

const { createNewDate } = require("../util/dates");

const obectOfKeys = {
    'editUser': ['imgUrl', 'circulation', 'firstName', 'middleName', 'lastName'],
}

const getUserById = async (userId) => {
    return await UserModel.findById(userId).find({ isDelete: false });
}

const editUserById = async (userId, data) => {
    const editUser = await UserModel.findById(userId);
    // To Do password and birthday waiting 
    const field = changeFilds(obectOfKeys['editUser'], editUser, data);

    return await field.save();
}

const deleteUserById = async (userId) => {
    const userDelete = await UserModel.findById(userId);
    userDelete.lastUpdate = createNewDate();
    userDelete.isDelete = !userDelete.isDelete;
    return await userDelete.save();
}

module.exports = {
    getUserById,
    editUserById,
    deleteUserById,
}