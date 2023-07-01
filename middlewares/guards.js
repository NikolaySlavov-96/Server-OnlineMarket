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
    return (req, res, next) => {
        if(req.user && condition.includes(req.user.role)) {
            next()
        } else {
            res.status(401).json({message: 'error'})
        }
    }
}

module.exports = {
    hasUser,
    isGuest,
    hasRole,
}