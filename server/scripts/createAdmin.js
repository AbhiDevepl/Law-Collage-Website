require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

const createAdmin = async () => {
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

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin account already exists for that username');
      process.exit(0);
    }

    const admin = await Admin.create({ username, password }); // hashed by pre-save hook
    console.log('Admin account created:', admin.username);
    console.log('Password was not logged — it was supplied via ADMIN_PASSWORD.');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    process.exit(0);
  }
};

createAdmin();

