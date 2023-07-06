const changeFilds = (obectOfKeys, oldDate, dataSource, collection) => {
    for (const key in dataSource) {
        if (obectOfKeys[collection].includes(key)) {
            oldDate[key] = dataSource[key];
        }
    }
    return oldDate
}

module.exports = {
    changeFilds,
}