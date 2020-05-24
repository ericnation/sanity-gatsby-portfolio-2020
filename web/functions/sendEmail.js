require('dotenv').config();
const gmailUserName = process.env.GMAIL_USERNAME;
const gmailPassword = process.env.GMAIL_PASS;
const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  /* eslint-disable func-names */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUserName,
      pass: gmailPassword,
    },
  });
  const body = JSON.parse(event.body);
  const msg = {
    to: 'eric.nation@gmail.com',
    from: body.emailInput,
    subject: 'Message from ericnation.io Contact Form',
    text: body.messageInput,
    html: `<div className="email" style="
            border: 3px solid #000;
            padding: 20px;
            font-family: san-serif;
            line-height: 2;
            font-size: 20px;
          ">
            <p>Senders Name: ${body.nameInput}</p>
            <p>Senders Email: ${body.emailInput}</p>
            <p>Senders Phone: ${body.phoneInput}</p>
            <p>Senders Message: ${body.messageInput}</p>
          </div>
        `,
  };

  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.log(error);
      callback(error, {
        body: 'Email not sent successfully',
      });
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, {
        statusCode: 200,
        body: `Email sent successfully! ${info.response}`,
      });
    }
  });
};
