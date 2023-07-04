const UserModel = require("../models/userModel");
const { createNewDate } = require("../util/dates");


const getUserById = async (userId) => {
    return await UserModel.findById(userId).find({ isDelete: false });
}

const editUserById = async (userId, data) => {
    const editUser = await UserModel.findById(userId);

    editUser.imgUrl = data.imgUrl;
    editUser.password = data.password; // To Do verification password before change
    editUser.birthday = data.birthday;     // To Do verification without have cheating
    editUser.firstName = data.firstName;
    editUser.middleName = data.middleName;
    editUser.lastName = data.lastName;
    
    editUser.lastUpdate = createNewDate();

    return await editUser.save();
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