const day = 86400000;

const createInterval = (interval, fn) => {
    setTimeout(() => {
        fn();
        setInterval(() => {
            fn();
        }, day);
    }, interval);
}

module.exports = {
    createInterval,
}