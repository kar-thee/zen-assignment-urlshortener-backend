const User = require("../../models/userModel");
const mailerFunc = require("../../util/mailerFunc");
const { verifyTokenFunc } = require("../../util/tokenFunc");

const emailActivationHandler = async (req, res) => {
  const { activationId } = req.body;
  try {
    const payload = verifyTokenFunc(activationId);
    if (!payload) {
      return res
        .status(400)
        .send({ msg: "code tampered...try again the process", type: "error" });
    }
    const { email } = payload;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).send({ msg: "No user Available", type: "error" });
    }
    if (userFound.idActivated) {
      return res
        .status(400)
        .send({ msg: "Account already Activated", type: "error" });
    }
    const activatedUser = await User.findByIdAndUpdate(
      userFound._id,
      { $set: { idActivated: true } },
      { new: true }
    );
    if (!activatedUser) {
      return res
        .status(500)
        .send({ msg: "Server/DB problem,try again", type: "error" });
    }
    const msg = `Welcome ${activatedUser.name}!, Your account has been verified Successfully, You can now create shortUrls`;
    const mailDetails = {
      toAddress: activatedUser.email,
      mailSubject: "Account Verified Successfully",
      mailContent: msg,
    };
    await mailerFunc(mailDetails);
    res.send({
      msg,
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-in emailActivationHandler");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};
module.exports = emailActivationHandler;
