const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Date },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the 'User' model
      // required: true,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);
module.exports = Url;
