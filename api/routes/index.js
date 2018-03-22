const router  = require('express').Router();
const authController = require('./../controllers/auth');

// Middleware for all requests
router.use(function(req, res, next){
  // Log all calls
  console.log(req.method + ": " + req.originalUrl);

  authController.verifyAuthToken(req, res, next);

  // Set response headers
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  next();
});

// Test route
router.get('/', function(req, res){
  res.status(200).json({message:"Gem Exchange API works!"})
});

// Include other routers
const auth        = require('./auth');
const stardragons = require('./stardragon');
const users       = require('./user');
const traits      = require('./trait');

// Use routers
router.use('/auth',        auth);
router.use('/stardragons', stardragons);
router.use('/users',       users);
router.use('/traits',      traits);

module.exports = router;
