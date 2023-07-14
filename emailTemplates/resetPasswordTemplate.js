
// To Do adding complete design and edit link after complete FrontEnd
const resetPasswordTemplate = (code) => {
    return `
<div style="background-color:rgba(209, 209, 209, 0.2);display: inline-block;border-radius: 30px;padding: 20px;">
    <h1 style="color:blue;font-size:28px;">Successful Reset Password</h1>
    <a style="padding:12px 18px; background-color: rgb(184, 237, 237);border-radius: 20px;" href="https://www.shop-hop.store/reset?resetCode=${code}">Change Password</a>
    <p>At problem visit <span style="color:blue;font-size: 18px;">https://www.shop-hop.store/reset</span> and insert code:
        <span style="font-size: 22px;">${code}</span>
    </p>
</div>`
}

module.exports = resetPasswordTemplate;