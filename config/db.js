const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.set('strictQuery', false)
  const connect = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected to: ${connect.connection.host}`);
};

module.exports = connectDb;
