const DB = require('mongoose');
require('dotenv').config();
const DB_ADDRESS = process.env.DEV_DB_ADDRESS; //DB_ADDRESS --> Product addres

module.exports = async (app) => {
    try {
        await DB.connect(DB_ADDRESS, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log('Successful connect with DB ' + DB_ADDRESS);
    } catch (err) {
        console.error('Unsuccessful connet with DB ' + DB_ADDRESS, err.message);
        // process.exit(1);
    }
}