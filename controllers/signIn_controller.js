const User = require("../models/userModel");
const { decryptPwdFunc } = require("../util/passwordHelperFunc");
const { signTokenFunc } = require("../util/tokenFunc");

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
    console.log(userAvailable);
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
    res.send({ token, payLoad, type: "success" });
  } catch (e) {
    console.log(e.message, " err -in signin");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};

module.exports = signinHandler;
