
// To Do adding complete design 
const registerTemplate = (id, code) => {
    return `<h1 style='color:blue;font-size:45px'>Register</h1> 
    <p>https://www.shop-hop.store/activate?${id}&${code}</p>
    <p>At problem visit https://www.shop-hop.store/activate and insert code: ${code}</p>`
}

module.exports = {
    registerTemplate,
}