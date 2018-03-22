const router         = require('express').Router();
const User           = require('./../models/user');
const authController = require('./../controllers/auth');

router.route('/login')
  .post(authController.authenticate)

router.post('/register', (req, res, next) => {

});

router.get('/getsalt', (req, res, next) => {
  authController.getSalt()
    .then((salt) => {
      res.status(200).json({ message: 'Got salt value.', data: salt });
    })
    .catch((err) => {
      res.status(500).json({ message:"Failed to generate salt."});
    })
});

module.exports = router;
