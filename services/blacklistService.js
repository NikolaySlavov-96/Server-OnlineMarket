const blacklistUserModel = require('../models/BlackListUserModel');

const getAllBlacklists = async() => {
    return await blacklistUserModel.find({ isDeleted: false });
};

const getPersonalBlacklist = async(userId) => {
    return await blacklistUserModel.findOne({ userId });
};

const addPersonToBlacklist = async(data) => {
    return await blacklistUserModel.create(data);
};

const removePersonPromBlacklist = async(userId) => {
    const blacklistedUser = await blacklistUserModel.findOne({ userId });
    blacklistedUser.isDeleted = true;
    return await blacklistedUser.save();
};

module.exports = {
    getAllBlacklists,
    getPersonalBlacklist,
    removePersonPromBlacklist,
    addPersonToBlacklist
}