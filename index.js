const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const auth_route = require("./routes/auth_route");
const connectDB = require("./db/db_connection");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello guys.....Welcome" });
});

app.use("/auth", auth_route);

connectDB()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server-ON");
    })
  )
  .catch((e) => console.log(e, " err-index.js"));
