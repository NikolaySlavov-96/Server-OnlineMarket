const { createNewDate } = require("./dates");

const changeFilds = (obectOfKeys, oldDate, dataSource) => {
    for (const key in dataSource) {
        if (obectOfKeys.includes(key)) {
            oldDate[key] = dataSource[key];
        }
    }
    oldDate.lastUpdate = createNewDate();
    
    return oldDate
}

module.exports = {
    changeFilds,
}