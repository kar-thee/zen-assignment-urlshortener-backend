const User = require("../models/userModel");
const { encryptPwdFunc } = require("../util/passwordHelperFunc");
const { signTokenFunc } = require("../util/tokenFunc");

const signupHandler = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res
        .status(400)
        .send({ msg: "No Empty values allowed", type: "error" });
    }
    const userAlreadyAvailable = await User.find({ email });
    if (userAlreadyAvailable) {
      return res
        .status(403)
        .send({ msg: "Account already exists", type: "error" });
    }
    const hashedPwd = await encryptPwdFunc(password);
    const createdUser = await User.create({ email, name, password: hashedPwd });
    if (!createdUser) {
      return res.status(500).send({
        msg: "couldnot create user - server problem maybe",
        type: "error",
      });
    }
    const payLoad = { email, id: createdUser._id, name };
    const token = signTokenFunc(payLoad);
    res.send({ token, user: payLoad, type: "success" });
  } catch (e) {
    console.log(e.message, " err in signupHandler");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};

module.exports = signupHandler;
