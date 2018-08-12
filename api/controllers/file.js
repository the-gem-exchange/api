/**
 *  FILE CONTROLLER
 *  Any functions related to file management will go here
 */
const fs       = require('fs');
const mkdirp   = require('mkdirp');

const AWS       = require('aws-sdk');
const config    = require('./../config/config');

const awsConfig = config.aws;
AWS.config.update(awsConfig);

const s3  = new AWS.S3();

/**
 *  @function createFile
 *  @description Create a file in tmp, then upload it to S3
 *  @param file - The raw file data
 *  @param location - ie 'users/123'
 */
exports.createFile = (file, location) => new Promise((resolve, reject) => {
  const fileLocation = `tmp/${location}/${file.name}`;

  // Create a local directory under tmp to store this
  exports.createDirectory(`${location}`)
    .then(() => {
      // then place the file there IE: tmp/users/:user_id || tmp/stardragons/:stardragon_id
      fs.writeFile(fileLocation, file.value, { encoding: 'base64' }, (err) => {
        if (err) return reject(Error(err));
        //   then, upload the file to S3 using the same schema
        s3.putObject(
          {
            Bucket: 'static.thegemexchange.net',
            ACL: 'public-read',
            Key: `${location}/${file.name}`,
            ServerSideEncryption: 'AES256',
            ContentType: file.type,
            Body: fs.createReadStream(fileLocation)
          },
          (s3err, data) => {
            if (s3err) return reject(Error(s3err));
            console.log('Uploaded to S3 successfully.', data);
            // if successful, resolve with the URL of the image
            resolve(`http://static.thegemexchange.net/${location}/${file.name}`);
          }
        );
      });
    })
    .catch(err => reject(Error(err)));
});

/**
 *  @function deleteFile
 *  @description Delete a file from S3, and double check it is gone from tmp
 */
exports.deleteFile = file => new Promise((resolve, reject) => {

});

/**
 *  @function createDirectory
 *  @description Create a local directory under tmp.
 *  @param directory A directory string
 */
exports.createDirectory = directory => new Promise((resolve, reject) => {
  mkdirp(`tmp/${directory}`, (err) => {
    if (err) return reject(Error(err));
    return resolve(true);
  });
});
