const { verificationToken } = require('../services/authService');
const { errorParser } = require('../util/parser');


module.exports = () => async (req, res, next) => {
    const token = req.headers['author-d'];

    if (token) {
        try {
            const payload = await verificationToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            const message = errorParser(err);
            return res.status(401).json({ message, });
        }
    }

    next();
};