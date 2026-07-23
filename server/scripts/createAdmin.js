const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            console.error('FATAL: MONGODB_URI is not defined');
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const adminExists = await Admin.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin account already exists');
            process.exit(0);
        }

        const admin = await Admin.create({
            username: 'admin',
            password: 'Admin@123',
        });

        console.log('Admin account created successfully:');
        console.log('Username:', admin.username);
        console.log('Password: Admin@123');
        console.log('\nPlease change this password after first login!');

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        process.exit(0);
    }
};

createAdmin();
