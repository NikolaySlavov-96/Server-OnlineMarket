const rewardsArray = [ 'HEADPHONES', 'T-SHIRT', 'KEYCHAIN', 'MUG', 'WRIST BAND', 'NECKLESS' ] //collection with available gifts ( productId, giftImg, isGifted, winnerId );
const allowedSingns = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const promocodeLength = 10;

spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();
spinTheWheel();


function spinTheWheel(){ 
    const randomNumber = Math.random();
    let reward = '';

    if(rewardsArray.length == 0 || randomNumber > 0.05){ // 95% for promocode 
        reward = generateCode();
    } else{
        reward = rewardsArray[Math.floor(Math.random() * rewardsArray.length)];
    };

    console.log(reward);
}

function generateCode(){
    let code = '';

    for ( let i = 0; i < promocodeLength; i++ ) {
        code += allowedSingns.charAt(Math.floor(Math.random() * allowedSingns.length));
    };
    return code;
};