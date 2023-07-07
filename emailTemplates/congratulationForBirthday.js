
// To Do adding complete design 
const congratulationForBirthday = ({ firstName, lastName, code }) => {
    return `<h1 style='color:blue;font-size:45px'>Happy Birthday</h1> 
    <p>${firstName} ${lastName} your Birthday discount code ${code}</p>
    <p>At problem visit https://www.shop-hop.store/activate and insert code: ${code}</p>`
}

module.exports = congratulationForBirthday;