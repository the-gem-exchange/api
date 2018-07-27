const router         = require('express').Router();
const fileController = require('./../controllers/file');

router.route('/')
  /**
   *  @api POST /file Upload file
   *  @description Uploads a file to S3.
   */
  .post((req, res, next) => {
    fileController.createFile();
  });

module.exports = router;
