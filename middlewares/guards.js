const { getCommentById } = require("../services/commentService");

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already logged in' });
        } else {
            next();
        }
    }
}

function hasRole(condition) {
    return async (req, res, next) => {

        const ownerDate = req?.params?.idComment && await getCommentById(req.params.idComment);

        if ((req.user && condition.map(e => req.user.role.includes(e)))[0] || ownerDate?.owner.toString() == req?.user?._id) {
            next()
        } else {
            res.status(401).json({ message: 'You canno\'t modify this sources' });
        }
    }
}

module.exports = {
    hasUser,
    isGuest,
    hasRole,
}