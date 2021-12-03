const User = require("../models/userModel");
const mailerFunc = require("../util/mailerFunc");
const { encryptPwdFunc } = require("../util/passwordHelperFunc");
const { verifyTokenFunc } = require("../util/tokenFunc");

const resetPasswordHandler = async (req, res) => {
  const { resetCode, newPassword } = req.body;
  const tokenHeader = req.headers.authorization;
  try {
    if (!resetCode || !tokenHeader || !newPassword) {
      return res
        .status(400)
        .send({ msg: "No empty values allowed", type: "error" });
    }
    const token = tokenHeader.split(" ")[1];
    const isTokenFresh = verifyTokenFunc(token);
    if (!isTokenFresh) {
      return res
        .status(400)
        .send({ msg: "Token expired...try the process again", type: "error" });
    }

    const payLoad = verifyTokenFunc(token);

    if (!payLoad) {
      return res
        .status(400)
        .send({ msg: "token tampered...try again the process", type: "error" });
    }
    const userFound = await User.findOne({ pwdResetCode: resetCode });

    if (!userFound) {
      return res.status(404).send({ msg: "user not Found", type: "error" });
    }
    const newHashedPass = await encryptPwdFunc(newPassword);
    const pwdUpdatedUser = await User.findByIdAndUpdate(
      userFound._id,
      { $set: { password: newHashedPass } },
      { new: true }
    );
    pwdUpdatedUser.pwdResetCode = undefined;
    await pwdUpdatedUser.save();
    if (!pwdUpdatedUser) {
      return res
        .status(400)
        .send({ msg: "password cannot be updated...try again", type: "error" });
    }
    const mailDetails = {
      toAddress: pwdUpdatedUser.email,
      mailSubject: "Password Updated Successfully",
      mailContent: `hi ${pwdUpdatedUser.name}, Well Your account password has been updated recently, if this is not updated by you, then your account is hacked, sorry:)
      (hint:dont worry, just change your email-account's pwd and perform a resetPwd request again...Next time try to remember password,${pwdUpdatedUser.name}***🙃just kidding:)- its our pleasure to help you`,
    };
    await mailerFunc(mailDetails);
    res.send({ msg: "Password successfully updated...", type: "success" });
  } catch (e) {
    console.log(e, " err-in resetPasswordHandler");
    res.status(500).send({ msg: "server issue....", type: "error" });
  }
};
module.exports = resetPasswordHandler;
