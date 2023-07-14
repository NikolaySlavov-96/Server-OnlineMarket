const LastCallModell = require("../models/LastCallModel");
const { changeFilds } = require("../util/changeFilds");

const { createNewDate } = require("../util/dates");


const obectOfKeys = {
    'createCall': ['userId', 'type', 'description', 'extDescription'],
    'editCall': ['type', 'description', 'extDescription'],
}

const getCallsWithCustomer = async (userId, query) => {
    return LastCallModell.find({ userId }).sort(query.sortBy).limit(query.limit);
};

const createCallWithCustomer = async (userId, date, description) => {
    if (date.type == 999 && date.extDescription == '') {
        throw new Error('Not correct form');
    }
    const value = {
        createAt: createNewDate(),
    }
    const field = changeFilds(obectOfKeys['createCall'], value, { ...date, userId, description });
    const createCalls = await LastCallModell.create(field)

    return createCalls;
};

const editCallWithCustomer = async (userId, callId, date, description) => {

    const oldDate = await LastCallModell.findById(callId);
    if (oldDate.userId.toString() !== userId.toString()) {
        throw new Error('User id or call Id not match');
    }
    if (date.idType == 999 && date.extDescription == '') {
        throw new Error('Not correct form');
    }

    const field = changeFilds(obectOfKeys['editCall'], oldDate, { ...date, description })

    return await field.save();
};

module.exports = {
    getCallsWithCustomer,
    createCallWithCustomer,
    editCallWithCustomer,
}