const router = require('express').Router();
const userController = require('./../controllers/user');

// Routes for /users
router.route('/')
  .post(userController.create)
  .get(userController.list)

// Routes for /users/"test_case"
router.route("/test")
  .get(userController.createTestUser)
router.route("/deletetest")
  .get(userController.deleteTestUser)

// Routes for /users/:user_id
router.route('/:user_id')
  .get(userController.get)
  .put(userController.update)
  .delete(userController.delete)

module.exports = router;
