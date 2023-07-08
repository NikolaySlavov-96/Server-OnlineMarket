const auth = require("../routes/auth");
const user = require("../routes/profile");
const shortProd = require("../routes/shortProd");
const search = require("../routes/search");
const lastCall = require("../routes/lastCall");

const reward = require("../routes/reward");
const blacklist = require("../routes/blacklist");

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/user', user);
    app.use('/product', shortProd);
    app.use('/search', search);
    app.use('/call', lastCall);
    
    app.use('/reward', reward);
    app.use('/blacklist', blacklist);
}