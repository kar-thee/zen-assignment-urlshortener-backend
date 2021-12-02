const router = require("express").Router();

const emailActivationHandler = require("../controllers/emailActivation_controller");
const forgotPasswordHandler = require("../controllers/forgotPassword_controller");
const resetPasswordHandler = require("../controllers/resetPassword_controller");
const signinHandler = require("../controllers/signIn_controller");
const signupHandler = require("../controllers/signUp_controller");

router.get("/", (req, res) => {
  res.json("Auth Working");
});

router.post("/signup", signupHandler); //name,password,email
router.post("/signin", signinHandler); //password,email
// router.post("/forgot-password"); //email
// router.post("/reset-password"); //newPassword
// router.post("/emailActivation"); //activationId

module.exports = router;
