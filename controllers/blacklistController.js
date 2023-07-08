const { getAllBlacklists, getPersonalBlacklist, addPersonToBlacklist, removePersonPromBlacklist } = require("../services/blacklistService");
const { errorParser } = require("../util/parser");

const typeCodes = {
    '010': 'uncensored comments',
    '020': 'uncollected orders',
    '030': 'not answaring calls',
    '444': 'uncategorized type'
}

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
    const typeCode = req.body.type;
    try {
        if(!typeCodes[typeCode]){
            throw new Error('type code non existing');
        }

        const { userId, commentId, description, date, type } = req.body;
        const result = await addPersonToBlacklist({ userId, commentId, description, date, type });
        res.json(result);

    } catch (error) {
        const message = errorParser(error);
        res.status(401).json({ message });
    }
};

const removeFromBlackList = async (req, res) => {
    const blackList = await removePersonPromBlacklist(req.params.userId);
    res.json(blackList);
};

const getAllCodes = async(req, res) => {
    res.json(typeCodes);
};


module.exports = {
    getBlackList,
    getOneBlacklist,
    addToBlackList,
    removeFromBlackList,
    getAllCodes
}