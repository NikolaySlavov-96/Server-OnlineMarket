const express = require('express');
require('dotenv').config();

const PORT = process.env.DEV_PORT; // PORT --> product PORT

const database = require('./config/database');
const expres = require('./config/expres');
const router = require('./config/router');


start();

async function start() {
    const app = express();

    await database(app);
    expres(app, express);
    router(app);

    app.listen(PORT, () => console.log('Server work on port ' + PORT));
}