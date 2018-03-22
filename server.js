/**
 *  @description This file starts the Gem Echange API
 */
var mongo_url = 'mongodb://localhost:27017/devDB',
    ui_url    = 'http://localhost:4200',
    port      = process.env.PORT || 3000,

    // Express
    express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),

    colors     = require('colors')


// Use Mongoose to connect API to MongoDB
const mongoose = require('mongoose');
      mongoose.Promise = global.Promise;
      mongoose.connect(mongo_url, {useMongoClient:true});

// Require local mongoose models to avoid errors
require('./api/models/stardragon');
require('./api/models/trait');
require('./api/models/user');

// Use bodyparser to let us read POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
const routes = require('./api/routes')
app.use('/', routes);

// Handle Errors
const errorHandler = require('./api/middleware/errorHandler');
app.use(errorHandler.onError);

// Discord Bot for error logging
discord = require('./api/config/discord')
discord.initBot();

// START SERVER
app.listen(port);

console.log(colors.green('Gem Exchange API server started on port ' + port));
