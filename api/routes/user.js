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
  .get(userController.list);

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
  .delete(userController.delete);

module.exports = router;
