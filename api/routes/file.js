const router         = require('express').Router();
const fileController = require('./../controllers/file');

router.route('/')
  /**
   *  @api         POST /file Upload file
   *  @description Uploads a file to S3.
   */
  .post((req, res, next) => {
    const file = req.body.file;
    const location = req.body.location;

    fileController.createFile(file, location)
      .then((result) => {
        res.status(200).json({ message: 'File Uploaded.', data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: `Error uploading file. ${err}`, error: err });
      });
  });

module.exports = router;
