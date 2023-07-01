function errorParser(err) {
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(v => v.message).join('\n');
    } else if (Array.isArray(err)) {
        return err.map(e => e.msg).join('\n');
    } else {
        return err.message;
    }
}

module.exports = {
    errorParser,
}