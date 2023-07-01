const cors = require("../middlewares/cors");
const session = require("../middlewares/session");
const trimBody = require("../middlewares/trimBody");

const whitelist = ['http://localhost:3000', 'http://192.168.88/50'];

module.exports = (app, express) => {
    app.use(express.static('public'));
    app.use(cors(whitelist));
    app.use(express.json());
    
    app.use(trimBody());
    app.use(session());

}