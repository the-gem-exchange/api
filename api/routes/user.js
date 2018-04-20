const router = require('express').Router();
const userController = require('./../controllers/user');

router.route('/')
  /**
   *  @api {post} /users Create User
   *  @apiName        Create User
   *  @apiDescription Creates a new user in the users collection.
   *  @apiGroup       Users
   */
  .post(userController.create)
  /**
   *  @api {get} /users Get Users
   *  @apiName        Get Users
   *  @apiDescription Retrieves a list of users in the users collection.
   *  @apiGroup       Users
   */
  .get(userController.list)

router.route("/test")
  /**
   *  @api {get} /user/test Create Test User
   *  @apiName        Create Test User
   *  @apiDescription Creates a test user in the users collection.
   *  @apiGroup       Users
   */
  .get(userController.createTestUser)

router.route("/deletetest")
  /**
   *  @api {get} /user/deletetest Delete Test User
   *  @apiName        Delete Test User
   *  @apiDescription Deletes the test user in the users collection.
   *  @apiGroup       Users
   */
  .get(userController.deleteTestUser)

router.route('/:user_id')
  /**
   *  @api {get} /user/:user_id Get User
   *  @apiName        Get User
   *  @apiDescription Retrieves a user from the users collection.
   *  @apiGroup       Users
   */
  .get(userController.get)
  /**
   *  @api {get} /user/:user_id Update User
   *  @apiName        Update User
   *  @apiDescription Save changes to a user's profile.
   *  @apiGroup       Users
   */
  .put(userController.update)
  /**
   *  @api {get} /user/:user_id Delete User
   *  @apiName        Delete User
   *  @apiDescription Deletes a user from the users collection.
   *  @apiGroup       Users
   */
  .delete(userController.delete)

module.exports = router;
