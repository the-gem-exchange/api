const discord = require('../config/discord');
const colors  = require('colors');

function onError(err, req, res, next) {
  // If status or message are missing, send these by default.
  if(!err.status)
    err.status = 500;
  if(!err.message)
    err.message = "Something went wrong!";

  // Log to console
  console.error(colors.red('API ERROR:', req.method + ' ' + req.url + '\n    ' + err.status + ": " + err.message));

  // Log to Discord
  discord.sendError(
    '```md\nAPI ERROR:\n------------------------\n' +
    '\n<CALL> * ' + req.method + ' ' + req.url + ' * ' +
    '\n<API_ENV> * ' + req.headers.host + ' * ' +
    '\n<UI_ENV> * ' + req.headers.referer + ' * ' +
    '\n\n' + err.status + ": " + err.message + '' +
    '```'
  );

  // Send error to requester
  res.status(err.status).json({status:err.status, message:err.message});

  next();
}

module.exports = { onError };
