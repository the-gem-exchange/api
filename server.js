/**
 *  @description This file starts the Gem Echange API
 */

// Import config
const discord = require('./api/config/discord');
const config  = require('./api/config/config');

// Import Packages
const bodyParser = require('body-parser');
const express    = require('express');
const colors     = require('colors');
const mongoose = require('mongoose');

// Set Static Values
const { mongoUrl } = config;
const port = process.env.PORT || 3000;
const app = express();

// Use Mongoose to connect API to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useMongoClient: true });

// Require local mongoose models to avoid errors
require('./api/models/stardragon');
require('./api/models/trait');
require('./api/models/user');

// Use bodyparser to let us read POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require all routes
const routes = require('./api/routes');

app.use('/', routes);

// Import Middleware
const errorHandler = require('./api/middleware/errorHandler');

app.use(errorHandler.onError);
discord.initBot();

// START SERVER
app.listen(port);

console.log(colors.green(`Gem Exchange API server started on port ${port}`));
