
// To Do adding complete design and edit link after complete FrontEnd
const sendGiftForBirthdat = ({ firstName, lastName, code }) => {
    return `<h1 style='color:blue;font-size:45px'>Happy Birthday</h1> 
    <p>${firstName} ${lastName} your Birthday discount code ${code}</p>
    <p>At problem visit https://www.shop-hop.store/activate and insert code: ${code}</p>
    <p>послучай наближаващия ви рожден ден печелите 30% отстъпка кода може да се използва в рамките на 7 дни</p>`
}

module.exports = sendGiftForBirthdat;