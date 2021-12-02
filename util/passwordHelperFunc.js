const bcrypt = require("bcrypt");

const encryptPwdFunc = async (originalPwd) => {
  const hashedPwd = await bcrypt.hash(originalPwd, 12);
  return hashedPwd;
};
const decryptPwdFunc = async (plainPwd, hashedPwd) => {
  const isMatch = await bcrypt.compare(plainPwd, hashedPwd);
  return isMatch;
};

module.exports = { encryptPwdFunc, decryptPwdFunc };
