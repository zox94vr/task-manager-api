const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name, randomNumber) => {
  sgMail.send({
    to: email,
    from: "welcome@theblockbox.io",
    subject: "Tnx for joining",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app
    Visit this link to verify your accoun:
    www.${url}/users/accountVerification?id=${id}+number=${randomNumber}
    `
  });
};
const sendRemoveMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "why@theblockbox.io",
    subject: "Why are you leaving us",
    text: `Dear ${name}, Why are you leaving us in this hard times. `
  });
};
module.exports = {
  sendWelcomeEmail,
  sendRemoveMail
};
// sgMail.send({
//   to: "filip.obradovic@theblockbox.io",
//   from: "kurcic.palcic@tbb.com",
//   subject: "Saljem ti mail iz noda",
//   text: "Gagi srce samo za tebe"
// });
