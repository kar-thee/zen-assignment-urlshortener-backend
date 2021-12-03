const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { signTokenFunc } = require("../util/tokenFunc");
const mailerFunc = require("../util/mailerFunc");
const forgotPasswordHandler = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    const userAvailable = await User.findOne({ email });
    let isAccountActivated = null;
    if (userAvailable) {
      isAccountActivated = userAvailable.idActivated;
    }
    if (!userAvailable || !isAccountActivated) {
      return res.status(404).send({
        msg: "no user found/user activated...activate account by clicking the link in email",
        type: "error",
      });
    }
    //resetcodeand jwt create and send in mail
    const resetCode = uuidv4();
    const savedUser = await User.findOneAndUpdate(
      { email },
      { $set: { pwdResetCode: resetCode } },
      { new: true }
    );
    const token = signTokenFunc({ email, id: savedUser._id });
    const emailPayLoad = `${resetCode}iHaveAmnesia${token}`;
    //send mail this payload
    const mailDetails = {
      toAddress: savedUser.email,
      mailSubject: "Password Reset Link",
      mailContent: `Dont worry, just click the following link to reset your password  -   
        ${process.env.CLIENT_URL_RESETPWD}/${emailPayLoad}`,
    };
    const mailResponse = await mailerFunc(mailDetails);

    if (mailResponse.response.split(" ")[2] !== "OK") {
      return res.status(500).send({
        msg: "cant send reset code to your mail , please try again after some time",
        type: "error",
      });
    }
    res.send({
      msg: "Please check your email for further intructions",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err in forgotPwd");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};

module.exports = forgotPasswordHandler;
