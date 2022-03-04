const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "genericsgteam@gmail.com",
    pass: "NGTZ0017",
  },
});

const sendMail = (email, subject, text) => {
  const mailOptions = {
    from: "genericsgteam@gmail.com",
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Success:" + info.response);
    }
  });
};

module.exports = sendMail;
