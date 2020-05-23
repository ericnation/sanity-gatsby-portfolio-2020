/* eslint-disable func-names */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);
  const msg = {
    to: 'eric.nation@gmail.com',
    from: body.emailInput,
    subject: 'Message from ericnation.io Contact Form',
    text: 'Hello plain world!',
    html: `<div className="email" style="
            border: 1px solid #000;
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
  console.log('msg', msg);
  sgMail
    .send(msg)
    .then(
      (response) => {
        callback(null, {
          statusCode: response.statusCode,
          body: 'Email sent successfully!',
        });
      },
      (error) => {
        callback(error, {
          body: 'Email not sent successfully',
        });
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    )
    .catch((err) => callback(err, null));
};
