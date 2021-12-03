const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const SuperUrlz = require("../../models/urlModel");
const User = require("../../models/userModel");

const createShortUrlHandler = async (req, res) => {
  const { longUrl } = req.body;
  const { id } = req.userObj;
  try {
    if (!longUrl || !req.userObj) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    const shortId = nanoid();

    const isUrlValid = validUrl.isUri(longUrl);
    if (!isUrlValid) {
      return res.status(400).send({ msg: "url not valid", type: "error" });
    }
    const shortUrlLink = `${process.env.CLIENT_URL_SHORTURL_LINK}/${shortId}`;
    const urlCreated = await SuperUrlz.create({
      originalUrl: longUrl,
      shortUrlId: shortUrlLink,
      user: id,
    });

    res.send({
      msg: "Url shortened successfully",
      type: "success",
      urlCreated,
    });
  } catch (e) {
    console.log(e.message, " err-in createShortUrl");
    res
      .status(500)
      .send({ msg: "internal server error,try again", type: "error" });
  }
};
module.exports = createShortUrlHandler;
