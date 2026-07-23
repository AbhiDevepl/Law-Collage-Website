const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('FATAL: MONGODB_URI is not defined. Set MONGODB_URI in environment variables.');
    console.error('Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name');
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    if (process.env.NODE_ENV !== 'production') console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
