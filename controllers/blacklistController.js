const { getAllBlacklists, getPersonalBlacklist, addPersonToBlacklist, removePersonPromBlacklist } = require("../services/blacklistService");
const { errorParser } = require("../util/parser");

const typeCodes = {
    '010': 'uncensored comments',
    '020': 'uncollected orders',
    '030': 'not answaring calls',
    '444': 'uncategorized type'
}

const getBlackList = async (req, res) => {
    try {
        const blackList = await getAllBlacklists();
        res.json(blackList);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
};

const getOneBlacklist = async (req, res) => {
    try {
        const response = await getPersonalBlacklist(req.params.userId);
        res.json(response);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
}

const addToBlackList = async (req, res) => {
    const typeCode = req.body.type;
    try {
        if (!typeCodes[typeCode]) {
            throw new Error('type code non existing');
        }
        const result = await addPersonToBlacklist(req.body, typeCodes[typeCode]);
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

const getAllCodes = async (req, res) => {
    res.json(typeCodes);
};


module.exports = {
    getBlackList,
    getOneBlacklist,
    addToBlackList,
    removeFromBlackList,
    getAllCodes
}