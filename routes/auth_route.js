const router = require("express").Router();

const emailActivation = require("../controllers/emailActivation_controller");
const forgotPassword = require("../controllers/forgotPassword_controller");
const resetPassword = require("../controllers/resetPassword_controller");
const signin = require("../controllers/signIn_controller");
const signup = require("../controllers/signUp_controller");

router.get("/", (req, res) => {
  res.json("Auth Working");
});

router.post("/signup"); //name,password,email
router.post("/signin"); //password,email
router.post("/forgot-password"); //email
router.post("/reset-password"); //newPassword
router.post("/emailActivation"); //activationId

module.exports = router;
