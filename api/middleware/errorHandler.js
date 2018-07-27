const discord = require('../config/discord');
const colors  = require('colors');

exports.onError = (err, req, res, next) => {
  // If status or message are missing, send these by default.
  const message = err.message || 'Something went wrong!';
  const status  = err.status  || 500;

  // Log to console
  console.error(colors.red('API ERROR:', `${req.method} ${req.url}\n    ${err.status}: ${err.message}`));

  const logToDiscord = false;
  if (logToDiscord) {
    // Log to Discord
    discord.sendError(`${'```md\nAPI ERROR:\n------------------------\n' +
    '\n<CALL> * '}${req.method} ${req.url} * ` +
    `\n<API_ENV> * ${req.headers.host} * ` +
    `\n<UI_ENV> * ${req.headers.referer} * ` +
    `\n\n${status}: ${message}` +
    '```');
  }

  // Send error to requester
  res.status(status).json({ status, message });

  next();
};
