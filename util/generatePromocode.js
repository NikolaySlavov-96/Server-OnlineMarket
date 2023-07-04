function generateCode(){
    const allowedSingns = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const promocodeLength = 10;

    let code = '';

    for ( let i = 0; i < promocodeLength; i++ ) {
        code += allowedSingns.charAt(Math.floor(Math.random() * allowedSingns.length));
    };
    return code;
};

module.exports = {
    generateCode,
}