const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        console.error('FATAL: MONGODB_URI is not defined. Set MONGODB_URI in environment variables.');
        process.exit(1);
    }
    try {
        const connection = await mongoose.connect(uri);
        console.log(`Database connected at ${connection.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
