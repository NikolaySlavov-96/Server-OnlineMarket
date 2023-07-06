const { getCallsWithCustomer, createCallWithCustomer, editCallWithCustomer } = require("../services/lastCallService");
const { errorParser } = require("../util/parser");

const messages = {
    '001': 'Client is Bussy',
    '002': 'Client not answers',
    '999': 'Other message',
};

const getUser = async (req, res) => {
    const typeSort = req.query.sortBy;
    const limit = req.query.limit;
    const userCalls = await getCallsWithCustomer(req.params.userId, { typeSort, limit });
    res.json(userCalls);
};

const createCall = async (req, res) => {
    const messageCode = req.body.idType;
    try {
        if (!messages[messageCode]) {
            throw new Error('Given not valid information')
        }
        const createCall = await createCallWithCustomer(req.params.userId, req.body, messages[messageCode]);
        res.json(createCall);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
};

const editCall = async (req, res) => {
    const messageCode = req.body.idType;
    try {
        if (!messages[messageCode]) {
            throw new Error('Given not valid information')
        }
        const editCall = await editCallWithCustomer(req.params.userId, req.query.callsId, req.body, messages[messageCode]);
        res.json(editCall);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
};

const getAllMessage = async (req, res) => {
    res.json(messages);
}

module.exports = {
    getUser,
    createCall,
    editCall,
    getAllMessage,
}