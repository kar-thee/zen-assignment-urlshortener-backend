const nodemailer = require("nodemailer");

const mailerFunc = async (requiredOption) => {
  const { toAddress, mailSubject, mailContent } = requiredOption;
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL_ID,
        pass: process.env.SENDER_MAIL_PWD,
      },
    });

    const mailOption = {
      from: process.env.SENDER_MAIL_ID,
      to: toAddress,
      subject: mailSubject,
      text: mailContent,
    };
    const mailResult = await transporter.sendMail(mailOption);
    return mailResult;
  } catch (e) {
    console.log(e.message, " err-in nodemailer");
  }
};
module.exports = mailerFunc;
