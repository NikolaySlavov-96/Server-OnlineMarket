
// To Do adding complete design 
const registerTemplate = ({ userId, activateCodel }) => {
    return `<h1 style='color:blue;font-size:45px'>Register</h1> 
    <p>https://www.shop-hop.store/activate?${userId}&${activateCodel}</p>
    <p>At problem visit https://www.shop-hop.store/activate and insert code: ${activateCodel}</p>`
}

module.exports = registerTemplate;