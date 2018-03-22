const _              = require('lodash');
const btoa           = require('btoa');
const sha256         = require('fast-sha256');
const crypto         = require('crypto');
const encryption_key = require('../config/getkey')('encryption');
const secret_key     = require('../config/getkey')('secret');
const algorithm      = 'aes-256-ctr';
const jwt            = require('jsonwebtoken');
const moment         = require('moment');

const mongoose = require('mongoose');
const User     = require("../models/user");

/**
 *  @function authenticate
 *  @description Log in a user and return an auth token
 */
exports.authenticate = function(req, res, next){
  const email    = (typeof req.body.email    === 'string') ? req.body.email    : false;
  const password = (typeof req.body.password === 'string') ? req.body.password : false;

  if (!email || email.length < 3) {
    return next(new Error("Email is required."))
  }
  if (!password || password.length < 12) {
    return next(new Error("Password is required."))
  }

  User.findOne({email:email}, function(err, user){
    if(err){
      return next(err);
    }
    // No user with that email exists
    else if(!user){
      return next(new Error('Invalid email.'))
    }
    else{
      // User found, check password
      if(password != decrypt(user.password)){
        return next(new Error('Invalid password.'))
      }
      // Login success!
      else{
        // Create an auth token
        let payload    = { id:user._id }
        let auth_token = jwt.sign(payload, secret_key, { expiresIn:1440 }); // Expires in 24 Hours
        res.status(200).json({
          message:    'Login success!',
          auth_token: auth_token,
          user_id:    user._id,
        })
      }
    }
  })
}

/**
 *  @function verifyAuthToken
 *  @description Check if a user's auth token is valid
 */
exports.verifyAuthToken = function(req, res, next){
  // Get auth token
  let auth_token = req.headers['auth-token'];

  // Verify auth token
  if(auth_token){
    jwt.verify(auth_token, secret_key, function(err, decoded){
      if(err){
        return next({status:401, message:"Auth token is invalid."})
      }
      else{
        res.authenticated = true;
      }
    })
  }
}

/**
 *  @function encrypt
 *  @description Encrypt a string. Called before Insert
 *  @param  {string} text The string being encrypted.
 *  @return {string}      The encrypted value.
 */
exports.encrypt = function(text){
  const cipher = crypto.createCipher(algorithm, encryption_key)
  let crypted  = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex');
  return crypted;
}

/**
 *  @function decrypt
 *  @description Decrypt a string. Called before matching password.
 *  @param  {string} text The string being decrypted.
 *  @return {string}      The decrypted value.
 */
function decrypt(text){
  const decipher = crypto.createDecipher(algorithm, encryption_key)
  let dec  = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8');
  return dec;
}

/**
 *  @function hash
 *  @description Hash a string (SHA256). For creating user passwords server-side.
 *  @param  {string} text The string being hashed.
 *  @return {string}      The hash.
 */
exports.hash = function(text){
  var pw_hash = sha256(text);
  return btoa(String.fromCharCode.apply(null, pw_hash));
}
