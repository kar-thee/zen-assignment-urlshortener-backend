const { verifyTokenFunc } = require("../util/tokenFunc");

const authorizationMiddleWareFunc = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  try {
    if (!tokenHeader) {
      return res
        .status(403)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    const token = tokenHeader.split(" ")[1];
    const payLoad = verifyTokenFunc(token);
    if (!payLoad) {
      return res
        .status(401)
        .send({ msg: "You must be signed-in to access", type: "error" });
    }
    req.userObj = { email: payLoad.email, id: payLoad.id }; //custom way to append values to req obj
    next();
  } catch (e) {
    console.log(e.message, " err-in middleware");
    res
      .status(500)
      .send({ msg: "internal server error,try again", type: "error" });
  }
};

module.exports = authorizationMiddleWareFunc;
