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

router.route('/:user_id/modifyToken').patch((req, res) => {
  userController.modifyToken(req.body.type, req.body.amount, req.body.user_id)
    .then((result) => {
      res.status(200).json({ message: 'Token inventory changed successfully.' });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error modifying token inventory. ${err}`, error: err });
    });
});

module.exports = router;
