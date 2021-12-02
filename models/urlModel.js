const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SuperUrlzSchema = schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrlId: {
      type: String,
      required: true,
      unique: true,
    },
    hitCount: {
      type: Number,
      default: 0,
    },
  },
  { timeStamps: true }
);

const SuperUrlz = mongoose.model(
  "SuperUrlz",
  SuperUrlzSchema,
  "SuperUrlzCollection"
);
module.exports = SuperUrlz;
