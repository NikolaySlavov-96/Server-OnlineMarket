const { getCallsWithCustomer, createCallWithCustomer, editCallWithCustomer } = require("../services/lastCallService");
const { errorParser } = require("../util/parser");


const getUser = async (req, res) => {
    const typeSort = req.query.sortBy;
    const limit = req.query.limit;
    const userCalls = await getCallsWithCustomer(req.params.userId, { typeSort, limit });
    res.json(userCalls);
};

const createCall = async (req, res) => {
    const createCall = await createCallWithCustomer(req.params.userId, req.body);
    res.json(createCall);
};

const editCall = async (req, res) => {
    try {
        const editCall = await editCallWithCustomer(req.params.userId, req.query.callsId);
        res.json(editCall);
    } catch (err) {
        const message = errorParser(err);
        res.status(401).json({ message });
    }
};

module.exports = {
    getUser,
    createCall,
    editCall,
}