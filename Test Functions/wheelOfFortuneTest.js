const rewardsArray = [ 'HEADPHONES', 'T-SHIRT', 'KEYCHAIN', 'MUG', 'WRIST BAND', 'NECKLESS' ] //collection with available gifts ( productId, giftImg, isGifted, winnerId );
const generatedCodes = [];
const allowedSingns = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
    if(Math.random() < 0.1){ // TO DO change the percentage now is 10% chance to win
        if( rewardsArray.length > 0 ){
            console.log( 'REWARD => ' + rewardsArray[Math.floor(Math.random() * rewardsArray.length)]);
            //remove the item from the collection with the gifts or change the item to unavailable
        } else {
            const promocode = getCode('Wheel');
            console.log( 'PROMOCODE => ' + promocode);
        }
    } else{
        const promocode = getCode('Wheel');
        console.log( 'PROMOCODE => ' + promocode);
    }
}


function getCode( typeOfPromocode, userId){ // UserSaveData => Email(in case of wheel), UserId(everywhere else)
    if( typeOfPromocode == 'Wheel'){
        const promocode = generateCode(10);
        // generate promocode for 10% off
        // save the promocode
        return promocode;
    } else if( typeOfPromocode == 'general'){
        const promocode = generateCode(20);
        // generate promocode for use of everyone multiple times
        // save the promocode
        return promocode;
    } else if( typeOfPromocode == 'personal'){
        const promocode = generateCode(5);
        // generate promocode for one person 
        // save the promocode and bind it with the given user;
        return promocode;
    } else{
        return 'No Promo Code'; //ERROR
    }
}

function generateCode(length){
    let code = '';

    for ( let i = 0; i < length; i++ ) {
        code += allowedSingns.charAt(Math.floor(Math.random() * allowedSingns.length));
    };
    return code;
}