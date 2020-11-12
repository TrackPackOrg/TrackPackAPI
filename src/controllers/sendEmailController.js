const sgMail = require('@sendgrid/mail')
const connection = require('../config/db');

const sendVerificationCode = (email, id) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const code = codeGenerator();
    console.log(email)
    const msg = {
        to: email, // Change to your recipient
        from: 'support@omgweb.xyz', // Change to your verified sender
        subject: 'Verification Code',
        html: `<strong>${code}</strong>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            connection.query(`UPDATE clientes SET verificado='${code}' WHERE idCliente='${id}'`, () => {
                console.log(code);
                console.log('Dato Actualizado');
            })
        })
        .catch((error) => {
            console.error(error)
        })
};

const codeGenerator = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 9).toString();
    }
    return code;
}

module.exports = { sendVerificationCode };