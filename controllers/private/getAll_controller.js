const SuperUrlz = require("../../models/urlModel");

const getAllUrlHandler = async (req, res) => {
  const { id } = req.userObj;
  try {
    if (!req.userObj) {
      res
        .status(401)
        .send({ msg: "Only authorized users allowed", type: "error" });
    }
    const allUrls = await SuperUrlz.find({ id }).populate(
      "user",
      "name email -_id"
    );
    res.send({ msg: "Populated Data", type: "success", allUrls });
  } catch (e) {
    console.log(e.message, " err-in getAllUrl controller");
    res
      .status(500)
      .send({ msg: "internal server error,try again", type: "error" });
  }
};
module.exports = getAllUrlHandler;
