const router         = require('express').Router();
const fileController = require('./../controllers/file');

router.route('/')
  /**
   *  @api         POST /file Upload file
   *  @description Uploads a file to S3.
   */
  .post((req, res) => {
    const { file } = req.body;
    const { stardragonId } = req.body;
    const { userId } = req.body;

    // Validate here!
    //   Make sure user has access to this directory
    //     if directory == user_id, check if it is THIS user's ID (and their token is valid!)
    //     if directory == stardragon_id, check if this user is allowed to edit this stardragon!
    let location = '';
    if (stardragonId) {
      location = `stardragons/${stardragonId}`;
    }
    if (userId) {
      location = `users/${userId}`;
    }

    fileController.createFile(file, location)
      .then((result) => {
        res.status(200).json({ message: 'File Uploaded.', data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: `Error uploading file. ${err}`, error: err });
      });
  });

module.exports = router;
