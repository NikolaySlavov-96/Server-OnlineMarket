const expiredCode = require("./expireCodeScript");

const { milisecondsOfDays } = require("../util/dates");
const { createInterval } = require("../util/setInterval");


function call() {
    createInterval(milisecondsOfDays(), expiredCode);
    // createInterval(1000, expiredCode);
}


module.exports = call;