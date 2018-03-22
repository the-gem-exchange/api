/*
  Discord Chan Bot

  General purpose bot for general purpose things
*/

// Import external modules
const fs      = require("fs");         // To read the credentials file
const Discord = require("discord.js"); // The bot
const client  = new Discord.Client();
const colors  = require('colors');

var ErrorChannel; // The channel we will log errors to.

// Read bot credentials from a file and log in
let credentials = JSON.parse(fs.readFileSync('./api/config/discord_credentials.json',"utf8"));
client.login(credentials.token);

/**
*   @function initBot
*   Creates an instance of the Discord bot. Should only be called on app startup.
*/
exports.initBot = () => {
  client.on("ready", () => {
    console.log("Discord Chan ready to log errors!".magenta);
    ErrorChannel = client.channels.find("id", credentials.error_channel);
  });
};

exports.sendError = (error_message) => {
  ErrorChannel.send(error_message);
}
