const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = {
  connectMongo,
};
