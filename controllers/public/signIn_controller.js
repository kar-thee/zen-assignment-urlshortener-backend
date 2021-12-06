const User = require("../../models/userModel");
const mailerFunc = require("../../util/mailerFunc");
const { decryptPwdFunc } = require("../../util/passwordHelperFunc");
const { signTokenFunc } = require("../../util/tokenFunc");

const signinHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "No empty values allowed", type: "error" });
    }
    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
      return res
        .status(404)
        .send({ msg: "No user Available,check Credentials", type: "error" });
    }

    const isPwdMatch = await decryptPwdFunc(password, userAvailable.password);
    if (!isPwdMatch) {
      return res.status(404).send({
        msg: "No email/password match,check Credentials",
        type: "error",
      });
    }

    const payLoad = {
      email: userAvailable.email,
      id: userAvailable._id,
      name: userAvailable.name,
    };
    const token = signTokenFunc(payLoad);
    //send acc-activation-link if not activated
    if (!userAvailable.idActivated) {
      const mailDetails = {
        toAddress: userAvailable.email,
        mailSubject:
          "Account Activation Link-(required for creating shortUrls)",
        mailContent: `Welcome ${userAvailable.name}!, just click the following link to activate your Account and start creating ShortUrls  -   
      ${process.env.CLIENT_URL_ACCOUNTACTIVATION}/${token}`,
      };
      await mailerFunc(mailDetails);
    }
    res.send({
      token,
      payLoad,
      type: "success",
      idActivated: userAvailable.idActivated,
    });
  } catch (e) {
    console.log(e.message, " err -in signin");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};

module.exports = signinHandler;
