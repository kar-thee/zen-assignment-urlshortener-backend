const router = require("express").Router();

router.post("/createShortUrl"); //send original url->generate short and save it to db
router.get("/all"); //get user,find in db, get all urls with click details
router.get("/analysis"); //url created each day  per month - send data for chart visualization
module.exports = router;
