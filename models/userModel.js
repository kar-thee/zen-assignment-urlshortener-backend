const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  idActivated: {
    type: Boolean,
    default: false,
  },
  pwdResetCode: {
    type: String,
    default: undefined,
  },
  urlsCreated: [
    {
      type: mongoose.Types.ObjectId,
      ref: "SuperUrlz",
    },
  ],
});

const User = mongoose.model("User", userSchema, "userCollection");
module.exports = User;
