const auth = require("../routes/auth");
const user = require("../routes/profile");
const source = require("../routes/source");
const search = require("../routes/search");
const lastCall = require("../routes/lastCall");

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/user', user);
    app.use('/source', source);
    app.use('/search', search);
    app.use('/call', lastCall);
}