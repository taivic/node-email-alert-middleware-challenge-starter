'use strict';

const nodemailer = require('nodemailer');
const {logger} = require('./utilities/logger');

// stored in `.env` -- never store passwords, api keys
// etc. inside source code
const {SMTP_URL} = process.env;


//`emailData` is an object that looks like this:
/*const emailData = {
	from: "vicky.yen.tai@gmail.com",
	to: "vicky.yen.tai@gmail.com",
	subject: "ALERT: a BarError occurred",
	text: "Plain text content",
	html: "<p>HTML version</p>"
}*/

const sendEmail = (emailData, smtpUrl=SMTP_URL) => {
  const transporter = nodemailer.createTransport(SMTP_URL);
  logger.info(`Attempting to send email from ${emailData.from}`);
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
}


module.exports = {sendEmail};
