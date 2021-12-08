const SuperUrlz = require("../../models/urlModel");

const analysisUrlHandler = async (req, res) => {
  //url created each day per month - return {name:urlname,day:03,month:12,year:2021,week:01} -week need to calucluate based on the day (week1-  0>n<7,week2-7>n<14,week3-14<n>21,week4-n>21)
  const { id } = req.userObj;
  try {
    if (!req.userObj) {
      res
        .status(401)
        .send({ msg: "Only authorized users allowed", type: "error" });
    }
    const allUrls = await SuperUrlz.find({ user: id });
    // const arr = await allUrls.map((d) => {
    //   return d.createdAt.toISOString();
    // });
    // console.log(arr, " arr");

    const dataArray = await allUrls.map((doc) => {
      const createdDateFn = doc.createdAt.toISOString().split("T")[0];
      const dateArray = createdDateFn.split("-");
      return {
        urlName: doc.originalUrl,
        shortUrl: doc.shortUrlId,
        day: dateArray[2],
        month: dateArray[1],
        year: dateArray[0],
      };
    });
    res.send({
      msg: "Data successfully modified for analysis",
      type: "success",
      dataArray,
    });
  } catch (e) {
    console.log(e.message, " err-in analysisController");
    res
      .status(500)
      .send({ msg: "internal server error,try again", type: "error" });
  }
};
module.exports = analysisUrlHandler;
