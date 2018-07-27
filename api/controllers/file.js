/**
 *  FILE CONTROLLER
 *  Any functions related to file management will go here
 */
const AWS       = require('aws-sdk');
const config    = require('./../config/config');

const awsConfig = config.aws;
AWS.config.update(awsConfig);

const s3  = new AWS.S3();

/**
 *  @function createFile
 *  @description Create a file in tmp, then upload it to S3
 */
exports.createFile = file => new Promise((resolve, reject) => {

});

/**
 *  @function deleteFile
 *  @description Delete a file from S3, and double check it is gone from tmp
 */
exports.deleteFile = file => new Promise((resolve, reject) => {

});
