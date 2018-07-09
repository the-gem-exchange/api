const _          = require('lodash');
const mongoose   = require('mongoose');
const authController = require('./../controllers/auth');

const { ObjectId } = mongoose.Types;
const User         = mongoose.model('User');

/**
 *  @description Create a new user
 */
exports.create = (req, res, next) => {
  // Look up if this user already exists
  User.findOne({ email: req.body.email }, (err, user) => {
    // If user exists, return error.
    if (user) {
      return next({ message: 'User already exists.', status: 400 });
    }
    // If user does not exist, create a new one.
    const new_user  = new User();
    new_user.name     = req.body.name;
    new_user.email    = req.body.email;
    new_user.password = authController.encrypt(req.body.password);

    new_user.save((createdUser) => {
      res.json({ message: 'User created!', data: createdUser });
    });
  });
};

/**
 *  @description Get a list of all users
 */
exports.list = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
};

/**
 *  @description Get a specific user
 */
exports.get = (req, res, next) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      return next(new Error(`Error retrieving user ${req.params.user_id}`));
    }
    res.json(user);
  });
};

/**
 * @description Save updates to a specific user
 */
exports.update = (req, res, next) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      return next(new Error(`Error saving changes to user ${req.params.user_id}`));
    }
    // Update fields
    user.name = req.body.name;
    // Save User
    user.save((saveErr) => {
      if (saveErr)
      { return next(saveErr); }
      res.json({ message: 'User updated!' });
    });
  });
};

/**
 * @description Delete a specific user
 */
exports.delete = (req, res, next) => {
  User.remove({ _id: req.params.user_id }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'User deleted!' });
  });
};
