const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const createEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Tere!</h2>
    <p>${text}</p>

    <p><a href="https://tekstiks.ee">Tekstiks.ee</a>,</p>
    <p>Aivo Olev</p>
    <p><a href = "mailto:tugi@tekstiks.ee?subject= Kontoga seotud küsimus">tugi@tekstiks.ee</a></p>
  </div>
`;

const mailjet = require("node-mailjet").connect(
  process.env.MAIL_USER,
  process.env.MAIL_PASS
);
const sendMail = info =>
  mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "info@tekstiks.ee",
          Name: "teksiks.ee"
        },
        To: [
          {
            Email: info.to,
            Name: "teksiks.ee"
          }
        ],
        Subject: info.subject,
        //TextPart: "My first Mailjet email",
        HTMLPart: info.html,
        CustomID: "AppGettingStartedTest"
      }
    ]
  });

exports.sendMail = sendMail;
exports.transport = transport;
exports.createEmail = createEmail;
