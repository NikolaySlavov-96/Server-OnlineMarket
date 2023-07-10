const { createNewDate } = require("./dates");

const changeFilds = (obectOfKeys, oldDate, dataSource, collection) => {
    for (const key in dataSource) {
        if (obectOfKeys[collection].includes(key)) {
            oldDate[key] = dataSource[key];
        }
    }
    oldDate.lastUpdate = createNewDate();
    
    return oldDate
}

module.exports = {
    changeFilds,
}