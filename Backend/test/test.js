import mongoose from 'mongoose';
import User from '../User.js';
import app from '../index.js';
import request from 'supertest';

// Create test account
const testUser = new User({
  googleId: '107812030939429907679',
  username: 'Test',
  lastname: 'User',
  email: 'testuser@ucsc.edu',
  setupFlag: false,
});

let testObj;

beforeAll(async () => {
  await testUser.save().then((savedDoc) => {
    testObj = savedDoc;
    console.log('created test account successfully');
    console.log(testObj);
  });
});

test('dummy', () => {
  expect(1).toBe(1);
});

test('getuser', async () => {
  const res = await request(app).get('/getuser');
  expect(res).toBe(testObj);
});

afterAll(async () => {
  // Delete account
  await User.findByIdAndDelete(testObj._id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      //   console.log('Deleted test account: ', docs);
    }
  });
});
