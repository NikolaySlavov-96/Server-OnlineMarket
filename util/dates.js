function createNewDate() {
    const date = new Date();
    return date;
}

function createNewDateWithDate(data) {
    const date = new Date(data);
    return date;
}

function milisecondsOfDays() {
    const currentMoment = createNewDate();
    const minets = currentMoment.getMinutes();
    const hours = currentMoment.getHours();
    let currentH = 24;
    let result = 0;

    if (minets > 0 && minets < 60) {
        currentH -= 1;
        result = (60 - minets) * 60 * 1000;
    }
    const dayToMilisecond = (currentH - hours) * 60 * 60 * 1000 + result;
    return dayToMilisecond
};

function createDateWithOption(optionDate) {
    const currentDate = createNewDate();
    const getYear = currentDate.getFullYear();
    let getMonth = (currentDate.getMonth() + 1);
    const getDay = currentDate.getDate()
    let month = getMonth.toString().length == 1 ? '0' + getMonth : getMonth;
    let dayPlus = optionDate ? (Number(getDay) + Number(optionDate)) : getDay;
    let day = dayPlus.toString().length == 1 ? '0' + dayPlus : dayPlus;

    return {
        month,
        day,
        year: getYear,
    }
}

module.exports = {
    createNewDate,
    createNewDateWithDate,
    milisecondsOfDays,
    createDateWithOption,
}