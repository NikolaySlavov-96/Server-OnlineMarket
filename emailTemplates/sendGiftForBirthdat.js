
// To Do adding complete design and edit link after complete FrontEnd
const sendGiftForBirthdat = ({ firstName, lastName, code }) => {
    return `<div style="background-color:rgba(209, 209, 209, 0.2);display: inline-block;border-radius: 30px;padding: 20px;">
    <h1 style="color:rgba(0, 0, 255, 0.578);font-size:28px;">Happy Birthday</h1>
    <p>${firstName} ${lastName} your Birthday discount code ${code}</p>
    <p style="display: inline-block; margin-right: 20px;">Adding your activation code from</p>
    <a style="padding:12px 18px; background-color: rgb(184, 237, 237);border-radius: 20px;"
        href="https://www.shop-hop.store/shoping?rewardcode=${code}">Adding Code</a>
    <p>At problem visit <span style="color:blue;font-size: 18px;">https://www.shop-hop.store/shoping</span> and
        insert code:
        <span style="font-size: 22px;">${activateCodel}</span>
    </p>
    <p>послучай наближаващия ви рожден ден печелите 30 % отстъпка кода може да се използва в рамките на 7 дни</p>
</div>`
}

module.exports = sendGiftForBirthdat;