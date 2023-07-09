const BlacklistUserModel = require('../models/blackListUserModel');
const { createNewDate } = require('../util/dates');

const getAllBlacklists = async () => {
    return await BlacklistUserModel.find({ isDeleted: false });
};

const getPersonalBlacklist = async (userId) => {
    return await BlacklistUserModel.findOne({ userId });
};

const addPersonToBlacklist = async (body, message) => {
    const isExsisting = await BlacklistUserModel.findOne({ userId: body.userId });
    if(!isExsisting) {
        return await BlacklistUserModel.create({
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
    const blacklistedUser = await BlacklistUserModel.findOne({ userId });
    blacklistedUser.isDeleted = true;
    return await blacklistedUser.save();
};

module.exports = {
    getAllBlacklists,
    getPersonalBlacklist,
    removePersonPromBlacklist,
    addPersonToBlacklist
}