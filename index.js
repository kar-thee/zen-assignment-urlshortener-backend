const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const connectDB = require("./db/db_connection");
const auth_route = require("./routes/auth_route");
const urlPrivate_route = require("./routes/urlPrivate_route");
const redirectUrl = require("./routes/urlRedirect_route");

app.use("/", redirectUrl);
app.use("/api/auth", auth_route);
app.use("/api/urlPrivate", urlPrivate_route);

connectDB()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server-ON");
    })
  )
  .catch((e) => console.log(e, " err-index.js"));
