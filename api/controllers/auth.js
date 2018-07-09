// Imports
const btoa           = require('btoa');
const sha256         = require('fast-sha256');
const crypto         = require('crypto');
const jwt            = require('jsonwebtoken');

// Config
const encryption_key = require('../config/getkey')('encryption');
const secret_key     = require('../config/getkey')('secret');

// Encryption Settings
const algorithm      = 'aes-256-ctr';

// Models
const User = require('../models/user');

/**
 *  @function verifyAuthToken
 *  @description Check if a user's auth token is valid
 */
exports.verifyAuthToken = (req, res, next) => {
  // Get auth token
  const auth_token = req.headers['auth-token'];

  // Verify auth token
  if (auth_token) {
    jwt.verify(auth_token, secret_key, (err) => {
      if (err) return next({ status: 401, message: 'Auth token is invalid.' });
      res.authenticated = true;
    });
  }
};

/**
 *  @function encrypt
 *  @description Encrypt a string. Called before Insert
 *  @param  {string} text The string being encrypted.
 *  @return {string}      The encrypted value.
 */
exports.encrypt = (text) => {
  const cipher = crypto.createCipher(algorithm, encryption_key);
  let crypted  = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

/**
 *  @function decrypt
 *  @description Decrypt a string. Called before matching password.
 *  @param  {string} text The string being decrypted.
 *  @return {string}      The decrypted value.
 */
function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, encryption_key);
  let dec  = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

/**
 *  @function hash
 *  @description Hash a string (SHA256). For creating user passwords server-side.
 *  @param  {string} text The string being hashed.
 *  @return {string}      The hash.
 */
exports.hash = (text) => {
  const pw_hash = sha256(text);
  return btoa(String.fromCharCode.apply(null, pw_hash));
};

/**
 *  @function authenticate
 *  @description Log in a user with a username and password and return an auth token
 */
exports.authenticate = (req, res, next) => {
  const email    = (typeof req.body.email    === 'string') ? req.body.email    : false;
  const password = (typeof req.body.password === 'string') ? req.body.password : false;

  if (!email || email.length < 3) {
    return next(new Error('Email is required.'));
  }
  if (!password || password.length < 12) {
    return next(new Error('Password is required.'));
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    // Invalid Login
    else if (!user) {
      return next(new Error('User not found.'));
    }
    else if (password !== decrypt(user.password)) {
      return next(new Error('Invalid credentials. Please try again.'));
    }
    // Login success!
    console.log(password, decrypt(user.password));

    // Create an auth token
    const payload    = { id: user._id };
    const auth_token = jwt.sign(payload, secret_key, { expiresIn: 1440 }); // Expires in 24 Hours
    res.status(200).json({
      message: 'Login success!',
      auth_token,
      user_id: user._id,
    });
  });
};
