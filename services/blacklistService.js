const blacklistUserModel = require('../models/BlackListUserModel');
const { createNewDate } = require('../util/dates');

const getAllBlacklists = async () => {
    return await blacklistUserModel.find({ isDeleted: false });
};

const getPersonalBlacklist = async (userId) => {
    return await blacklistUserModel.findOne({ userId });
};

const addPersonToBlacklist = async (body, message) => {
    const isExsisting = await blacklistUserModel.findOne({ userId: body.userId });
    if(!isExsisting) {
        return await blacklistUserModel.create({
            userId: body.userId,
            commentId: body.commentId,
            type: body.type,
            description: message,
            createAt: createNewDate(),
            lastUpdate: createNewDate(),
        });
    };
    isExsisting.commentId.push(body.commentId);
    isExsisting.type.push(body.type);
    isExsisting.description.push(body.description);
    isExsisting.lastUpdate = createNewDate();

    await isExsisting.save();
};

const removePersonPromBlacklist = async (userId) => {
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