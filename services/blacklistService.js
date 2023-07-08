const blacklistModel = require('../models/backListModel');

const getAllBlacklists = async() => {
    return await blacklistModel.find({ isDeleted: false });
};

const getPersonalBlacklist = async(userId) => {
    return await blacklistModel.findOne({ userId: userId });
};

const addPersonToBlacklist = async(data) => {
    return await blacklistModel.create(data);
};

const removePersonPromBlacklist = async(userId) => {
    const blacklistedUser = await blacklistModel.findOne({ userId: userId });
    blacklistedUser.isDeleted = true;
    return await blacklistedUser.save();
};

module.exports = {
    getAllBlacklists,
    getPersonalBlacklist,
    removePersonPromBlacklist,
    addPersonToBlacklist
}