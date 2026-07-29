require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

const updatePassword = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      console.error('FATAL: MONGODB_URI is not defined');
      process.exit(1);
    }

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password) {
      console.error('FATAL: ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin account not found for', username);
      console.log('Run createAdmin.js instead');
      process.exit(1);
    }

    admin.password = password;
    await admin.save();
    console.log('Admin password updated for:', admin.username);
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

updatePassword();
