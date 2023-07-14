const BlacklistUserModel = require('../models/BlackListUserModel');
const { changeFilds } = require('../util/changeFilds');
const { createNewDate } = require('../util/dates');

const obectOfKeys = {
    'addingInBlacklist': ['userId', 'commentId', 'type', 'description'],
}

const getAllBlacklists = async () => {
    return await BlacklistUserModel.find({ isDeleted: false });
};

const getPersonalBlacklist = async (userId) => {
    return await BlacklistUserModel.findOne({ userId });
};

const addPersonToBlacklist = async (body, message) => {
    const isExsisting = await BlacklistUserModel.findOne({ userId: body.userId });
    if (!isExsisting) {
        const value = {
            createAt: createNewDate(),
        }
        const field = changeFilds(obectOfKeys, value, { ...body, message }, 'addingInBlacklist');
        return await BlacklistUserModel.create(field);
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