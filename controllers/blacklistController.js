const { getAllBlacklists, getPersonalBlacklist, addPersonToBlacklist, removePersonPromBlacklist } = require("../services/blacklistService");


const getBlackList = async (req, res) => {
    console.log('getBlacklist');
    const blackList = await getAllBlacklists();
    res.json(blackList);
};

const getOneBlacklist = async (req, res) => {
    const { userId, commentId, description, date, type, isDeleted } = await getPersonalBlacklist(req.params.userId);
    res.json({ userId, commentId, description, date, type, isDeleted });
}

const addToBlackList = async (req, res) => {
    const { userId, commentId, description, date, type } = req.body;
    const result = await addPersonToBlacklist({ userId, commentId, description, date, type });
    res.json(result);
};

const removeFromBlackList = async (req, res) => {
    const blackList = await removePersonPromBlacklist(req.params.userId);
    res.json(blackList);
};


module.exports = {
    getBlackList,
    getOneBlacklist,
    addToBlackList,
    removeFromBlackList
}