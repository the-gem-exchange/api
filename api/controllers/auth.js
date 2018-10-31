// Imports
const jwt = require('jsonwebtoken');

// Config
const secret_key = require('../config/getkey')('secret');

// Models
const User  = require('../models/user');
const Event = require('../models/event');

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
    if (err) { return next(err); }

    // Invalid Login
    else if (!user) { return next(new Error('User not found.')); }
    else if (password !== user.password) {
      return next(new Error('Invalid credentials. Please try again.'));
    }

    // Create a JWT auth token - exclude the password from the user's data
    const payload    = { id: user._id };
    const auth_token = jwt.sign(payload, secret_key, { expiresIn:'24h' });

    // Send auth token with success message
    res.status(200).json({
      message: 'Login success!',
      auth_token
    });
  });
};

/**
 *  @function logEvent
 *  @description Save an event to the event log
 */
exports.logEvent = event => new Promise((resolve, reject) => {
  const newEvent = new Event(event);
  newEvent.save((err, loggedError) => {
    if (err) return reject(Error(err));
    return resolve(loggedError);
  });
});

/**
 *  @function getEvents
 *  @description Get a list of events from the event log
 */
exports.getEvents = () => new Promise((resolve, reject) => Event.find({}, (err, events) => {
  if (err) {
    reject(Error(err));
  }
  resolve(events);
}));
