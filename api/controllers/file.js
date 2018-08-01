/**
 *  FILE CONTROLLER
 *  Any functions related to file management will go here
 */
const fs       = require('fs');

const AWS       = require('aws-sdk');
const config    = require('./../config/config');

const awsConfig = config.aws;
AWS.config.update(awsConfig);

const s3  = new AWS.S3();

/**
 *  @function createFile
 *  @description Create a file in tmp, then upload it to S3
 */
exports.createFile = (file, location) => new Promise((resolve, reject) => {
  const fileLocation = `tmp/users/username/${file.name}`;

  // Validate
  //   Make sure user has access to this directory
  //     if directory == user_id, check if it is THIS user's ID (and their token is valid!)
  //     if directory == stardragon_id, check if this user is allowed to edit this stardragon!

  // If valid...
  // Create a local /tmp directory for this user if one does not exist
  exports.createDirectory('tmp')
    .then(exports.createDirectory('tmp/users'))
    .then(exports.createDirectory('tmp/users/username'))
    .catch(err => reject(Error(err)));
  //   then place the file there: /users/:user_id || /stardragons/:stardragon_id
  fs.writeFile(fileLocation, file.value, { encoding: 'base64' }, (err) => {
    if (err) return reject(Error(err));
    resolve(`http://static.thegemexchange.net/${fileLocation}`);
  });
  //   then, upload the file to S3 using the same schema
});

/**
 *  @function deleteFile
 *  @description Delete a file from S3, and double check it is gone from tmp
 */
exports.deleteFile = file => new Promise((resolve, reject) => {

});

/**
 *  @function createDirectory
 *  @description Create a local directory.
 *  @param directory A directory string
 */
exports.createDirectory = directory => new Promise((resolve, reject) => {
  if (!fs.existsSync(directory)) {
    try {
      fs.mkdirSync(directory);
    } catch (err) {
      return reject(Error(err));
    }
  }
  return resolve(true);
});
