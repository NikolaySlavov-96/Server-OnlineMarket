const createInterval = (interval, fn) => {
    setInterval(() => {
        fn()
    }, interval);
}

module.exports = {
    createInterval,
}