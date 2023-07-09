
// To Do adding complete design and edit link after complete FrontEnd
const congratulationForBirthday = ({ firstName, lastName }) => {
    return `<div style="background-color:rgba(209, 209, 209, 0.2);display: inline-block;border-radius: 30px;padding: 20px;">
    <h1 style="color:rgba(0, 0, 255, 0.578);font-size:28px;">Today your Birthdayy</h1>
    <p>${firstName} ${lastName} Happy Birthday. And do not forget using your Birthday discount</p>
</div>`
}

module.exports = congratulationForBirthday;