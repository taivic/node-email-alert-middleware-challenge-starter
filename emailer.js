'use strict';

const nodemailer = require('nodemailer');
const {logger} = require('./utilities/logger');

// stored in `.env` -- never store passwords, api keys
// etc. inside source code
const {SMTP_URL} = process.env;

// we log some errors if these env vars aren't set
if (!SMTP_URL) {
  logger.error('Missing `SMTP_URL` config var');
}


// `emailData` is an object that looks like this:
// {
//  from: "foo@bar.com",
//  to: "bizz@bang.com",
//  subject: "Hello world",
//  text: "Plain text content",
//  html: "<p>HTML version</p>"
// }
const sendEmail = (emailData) => {
  const transporter = nodemailer.createTransport(SMTP_URL);
  logger.info(`Attempting to send email: ${emailData}`);
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
}


module.exports = {sendEmail};
