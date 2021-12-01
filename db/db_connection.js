const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db-connected");
  } catch (e) {
    console.log(e, " error in connecting DB");
  }
};

module.exports = connectDB;
