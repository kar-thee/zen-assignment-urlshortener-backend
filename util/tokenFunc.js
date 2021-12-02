const jwt = require("jsonwebtoken");

const signTokenFunc = (payload) => {
  return jwt.sign(payload, process.env.token_Secret, { expiresIn: "1h" });
};
const verifyTokenFunc = (token) => {
  return jwt.verify(token, process.env.token_Secret);
};

module.exports = { signTokenFunc, verifyTokenFunc };
