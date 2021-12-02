const User = require("../models/userModel");

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
      return res
        .status(404)
        .send({
          msg: "no user found/user activated...activate account by clicking the link in email",
          type: "error",
        });
    }
  } catch (e) {
    console.log(e.message, " err in forgotPwd");
    res.status(500).send({ msg: "server issue", type: "error" });
  }
};

module.exports = forgotPasswordHandler;
