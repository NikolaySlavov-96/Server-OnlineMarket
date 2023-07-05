const lastCallModell = require("../models/lastCallModel");
const { createNewDate } = require("../util/dates");


const getCallsWithCustomer = async (userId, query) => {
    return lastCallModell.find({ userId }).sort(query.sortBy).limit(query.limit);
};

const createCallWithCustomer = async (userId, date, messages) => {

    // const message = await messageModel.findById(date.idType);

    // if(date.type === messages[type]) {

    // }

    const createCalls = await lastCallModell.create({
        userId,
        callDate: createNewDate(),
        type: date.type,
        description: date.description,
    });

    return createCalls;
};

const editCallWithCustomer = async (userId, callId, messages) => {

    const oldDate = await lastCallModell.findById(callId);
    if (oldDate.userId.toString() !== userId.toString()) {
        throw new Error('User id or call Id not match');
    }
    //To Do given description from DB not browser

    oldDate.type = date.type;
    oldDate.description = date.description;
    oldDate.lastUpdate = createNewDate();

    await oldDate.save();
};

module.exports = {
    getCallsWithCustomer,
    createCallWithCustomer,
    editCallWithCustomer,
}