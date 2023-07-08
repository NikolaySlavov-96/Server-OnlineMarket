function createNewDate() {
    const date = new Date();
    return date;
}

function milisecondsOfDays() {
    const currentMoment = createNewDate();
    let minets = currentMoment.getMinutes();
    let hours = currentMoment.getHours();
    let result = 0;

    if (minets > 0 && minets < 60) {
        hours += 1;
        result = (minets + 20) * 60 * 1000;
    }
    const dayToMilisecond = (24 - hours) * 60 * 60 * 1000 + result;
    return dayToMilisecond
};

function createDateForBirthday(optionDate) {
    const currentDate = createNewDate();
    const getYear = currentDate.getFullYear();
    const getMonth = currentDate.getMonth();
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
    milisecondsOfDays,
    createDateForBirthday,
}