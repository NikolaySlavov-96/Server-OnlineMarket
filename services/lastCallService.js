const lastCallModell = require("../models/lastCallModel");
const { createNewDate } = require("../util/dates");


const getCallsWithCustomer = async (userId, query) => {
    return lastCallModell.find({ userId }).sort(query.sortBy).limit(query.limit);
};

const createCallWithCustomer = async (userId, date, messages) => {
    if (date.idType == 999 && date.extDescription == '') {
        throw new Error('Not correct form');
    }
    const createCalls = await lastCallModell.create({
        userId,
        type: date.idType,
        description: messages,
        extDescription: date.extDescription,
        createAt: createNewDate(),
    });

    return createCalls;
};

const editCallWithCustomer = async (userId, callId, date, messages) => {

    const oldDate = await lastCallModell.findById(callId);
    if (oldDate.userId.toString() !== userId.toString()) {
        throw new Error('User id or call Id not match');
    }
    if (date.idType == 999 && date.extDescription == '') {
        throw new Error('Not correct form');
    }
    oldDate.type = date.idType;
    oldDate.description = messages;
    oldDate.extDescription = date.extDescription;
    oldDate.lastUpdate = createNewDate();

    await oldDate.save();
};

module.exports = {
    getCallsWithCustomer,
    createCallWithCustomer,
    editCallWithCustomer,
}