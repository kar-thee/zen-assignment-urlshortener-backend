const router = require("express").Router();

const analysisUrlHandler = require("../controllers/private/analysis_Controller");
const createShortUrlHandler = require("../controllers/private/createShortUrl_controller");
const getAllUrlHandler = require("../controllers/private/getAll_controller");

const authorizationMiddleWareFunc = require("../middleware/authorizationMiddleWare");

router.get("/getAll", authorizationMiddleWareFunc, getAllUrlHandler);
//get user,find in db, get all urls with click details

router.get("/analysis", authorizationMiddleWareFunc, analysisUrlHandler);
//url created each day  per month - send data for chart visualization

router.post(
  "/createShortUrl",
  authorizationMiddleWareFunc,
  createShortUrlHandler
); //send original url->generate short and save it to db

module.exports = router;
