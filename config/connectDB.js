const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log(
    `MongoDB Connected -> host:${conn.connection.host} DB:${conn.connection.name}`
  );
};

module.exports = connectDB;
