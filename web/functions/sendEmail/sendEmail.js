/* eslint-disable func-names */
gmailUserName = process.env.GMAIL_USERNAME;
gmailPassword = process.env.GMAIL_PASS;

const send = require('gmail-send');

exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);
  const msg = {
    user: gmailUserName,
    pass: gmailPassword,
    to: 'eric.nation@gmail.com',
    from: body.emailInput,
    subject: 'Message from ericnation.io Contact Form',
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
  const asyncAwaitSend = async () => {
    try {
      const { result, full } = await send(msg);
      console.log('response', result);
      console.log('res.full:', full);
      callback(null, {
        statusCode: result,
        body: 'Email sent successfully!',
      });
    } catch (error) {
      console.error('error', error);
      callback(error, {
        body: 'Email not sent successfully',
      });
    }
  };
  asyncAwaitSend();
};
