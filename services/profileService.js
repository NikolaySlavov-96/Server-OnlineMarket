const UserModel = require("../models/UserModel");
const { changeFilds } = require("../util/changeFilds");

const { createNewDate } = require("../util/dates");

const obectOfKeys = {
    'editUser': ['imgUrl', 'circulation', 'firstName', 'middleName', 'lastName'],
    'register': ['imgUrl', 'circulation', 'firstName', 'middleName', 'lastName']
}

const getUserById = async (userId, query) => {
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

const getAllRegisterUsers = async (query, limit, skipSource) => {
    const usersProfile = await UserModel.find(query).limit(limit).skip(skipSource)
    return usersProfile;
}

const editUserAccount = async (body) => {
    const userDate = await UserModel.findById(body.userId);
    // change logic with adding new role in user
    const field = changeFilds(obectOfKeys['register'], userDate, body);
    return await field.save()
}

module.exports = {
    getUserById,
    editUserById,
    deleteUserById,
    getAllRegisterUsers,
    editUserAccount,
}