const router         = require('express').Router();
const expressJwt     = require('express-jwt');
const pathToRegexp   = require('path-to-regexp');
const requestHandler = require('./../middleware/requestHandler');

// Secret key for JWT
const secret = require('./../config/getkey')('secret');

// Middleware for all requests
router.use(requestHandler.handleRequest);

// Test route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Gem Exchange API works!' });
});

// Include other routers
const auth        = require('./auth');
const stardragons = require('./stardragon');
const users       = require('./user');
const traits      = require('./trait');
const file        = require('./file');

// Use routers
router.use('/auth',        auth);
router.use('/stardragons', stardragons);
router.use('/users',       users);
router.use('/traits',      traits);
router.use('/file',        file);

// Whitelist of calls that do not need authentication
const jwtWhitelist = [
  pathToRegexp('/auth/login'),
  pathToRegexp('/traits*')
];

// Use expressJwt to authenticate calls
router.use(expressJwt({ secret }).unless({ path: jwtWhitelist }));

module.exports = router;
