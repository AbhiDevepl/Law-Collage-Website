const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Set environment variables for test
process.env.NODE_ENV = 'production'; // Make sure NODE_ENV is production so verifyToken is active!
process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.PORT = '5123';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'; // Provide mock URI to bypass definition check

// Mock mongoose
const mockAnnouncements = [{ _id: '1', text: 'Existing announcement' }];
const mockAdmins = [
  {
    _id: 'admin_id_123',
    username: 'admin',
    password: 'hashed_password_placeholder',
    matchPassword: async (p) => p === 'Admin@123'
  }
];

class MockAnnouncement {
  constructor(data) {
    this.text = data.text;
    this._id = 'mock_announcement_id_123';
  }
  async save() {
    return this;
  }
}
MockAnnouncement.find = () => ({
  sort: () => Promise.resolve(mockAnnouncements)
});
MockAnnouncement.findByIdAndUpdate = (id, update) => {
  return Promise.resolve({ _id: id, text: update.text });
};
MockAnnouncement.findByIdAndDelete = (id) => {
  return Promise.resolve({ _id: id });
};

const mockMongoose = {
  connect: async () => {
    console.log('[Mock Mongoose] Connected');
    return { connection: { host: 'localhost' } };
  },
  Schema: function() {
    return { pre: () => {}, methods: {} };
  },
  model: function(name) {
    if (name === 'Announcement') {
      return MockAnnouncement;
    }
    if (name === 'Admin') {
      return {
        findOne: ({ username }) => {
          const admin = mockAdmins.find(a => a.username === username);
          return Promise.resolve(admin);
        }
      };
    }
    return {};
  }
};

// Require cache injection for mongoose
require.cache[require.resolve('mongoose')] = {
  id: require.resolve('mongoose'),
  filename: require.resolve('mongoose'),
  loaded: true,
  exports: mockMongoose
};

// Now start the actual server
console.log('Starting server under test...');
require('../server');

// Give the server a moment to start, then run tests
setTimeout(async () => {
  let failed = false;
  const assert = (condition, message) => {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed = true;
    }
  };

  try {
    const baseUrl = 'http://localhost:5123/api';

    // Test 1: GET announcements (should be public)
    const getRes = await fetch(`${baseUrl}/announcements`);
    assert(getRes.status === 200, 'GET /api/announcements should be public (status 200)');
    const getData = await getRes.json();
    assert(getData.success === true, 'GET response should have success: true');
    assert(getData.announcements.length === 1, 'GET response should return mock announcements');

    // Test 2: POST announcement without token (should be 401)
    const postNoTokenRes = await fetch(`${baseUrl}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test announcement' })
    });
    assert(postNoTokenRes.status === 401, 'POST /api/announcements without token should be unauthorized (status 401)');

    // Test 3: POST announcement with invalid token (should be 401)
    const postBadTokenRes = await fetch(`${baseUrl}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_token_value'
      },
      body: JSON.stringify({ text: 'Test announcement' })
    });
    assert(postBadTokenRes.status === 401, 'POST /api/announcements with invalid token should be unauthorized (status 401)');

    // Test 4: Admin Login with valid credentials
    const loginRes = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'Admin@123' })
    });
    assert(loginRes.status === 200, 'POST /api/admin/login with correct credentials should return status 200');
    const loginData = await loginRes.json();
    assert(!!loginData.token, 'Login should return a JWT token');
    const token = loginData.token;

    // Test 5: POST announcement with VALID token (should be 200)
    const postWithTokenRes = await fetch(`${baseUrl}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: 'New test announcement' })
    });
    assert(postWithTokenRes.status === 200, 'POST /api/announcements with valid JWT token should succeed (status 200)');
    const postData = await postWithTokenRes.json();
    assert(postData.success === true && postData.announcement.text === 'New test announcement', 'POST response should contain created announcement');

    // Test 6: PUT announcement with VALID token (should be 200)
    const putWithTokenRes = await fetch(`${baseUrl}/announcements/some_id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: 'Updated announcement' })
    });
    assert(putWithTokenRes.status === 200, 'PUT /api/announcements/:id with valid JWT token should succeed (status 200)');
    const putData = await putWithTokenRes.json();
    assert(putData.success === true && putData.announcement.text === 'Updated announcement', 'PUT response should contain updated announcement');

    // Test 7: DELETE announcement with VALID token (should be 200)
    const deleteWithTokenRes = await fetch(`${baseUrl}/announcements/some_id`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    assert(deleteWithTokenRes.status === 200, 'DELETE /api/announcements/:id with valid JWT token should succeed (status 200)');
    const deleteData = await deleteWithTokenRes.json();
    assert(deleteData.success === true, 'DELETE response should indicate success');

  } catch (err) {
    console.error('Test execution error:', err);
    failed = true;
  } finally {
    console.log('Testing complete.');
    process.exit(failed ? 1 : 0);
  }
}, 1000);
