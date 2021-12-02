//public route
const router = require("express").Router();

router.get("/:shortId", (req, res) => {
  const token = req.headers.authorization;
  const shortId = req.params.shortId;
  console.log(shortId);
  //   res.send({ msg: "hello guys.....Welcome to redirect area", token, shortId });
  res.redirect("https://www.freecodecamp.org/learn");
});

module.exports = router;
