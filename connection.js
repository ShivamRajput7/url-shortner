const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
  return await mongoose.connect(url);
};
module.exports = { connectMongoDb };
