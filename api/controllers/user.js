const _          = require('lodash'),
      mongoose   = require('mongoose'),
      ObjectId   = mongoose.Types.ObjectId,
      User       = mongoose.model('User'),
      authController = require('./../controllers/auth');

/**
 *  @description Create a new user
 */
exports.create = function(req, res, next){
  // Look up if this user already exists
  User.findOne({email:req.body.email}, function(err, user){
    // If user exists, return error.
    if(user){
      return next({message:"User already exists.", status:400});
    }
    // If user does not exist, create a new one.
    else{
      var new_user  = new User();
          new_user.name     = req.body.name;
          new_user.email    = req.body.email;
          new_user.password = authController.encrypt(req.body.password);

      new_user.save(function(err){
        if(err){
          return next(err);
        }
        res.json({message:"User created!"})
      });
    }
  })
}

/**
 *  @description create a sample user
 */
exports.createTestUser = function(req, res, next){
  // Look up if a test user already exists
  User.findOne({email:"gemexchangetest@test.com"}, function(err, user){
    // If test user exists, delete so we can create a new one.
    if(user){
      deleteTestUser();
    }

    var test_pw = authController.hash("password")
        test_pw = authController.encrypt(test_pw)

    var test_user  = new User({
      name:     "Test User",
      email:    "gemexchangetest@test.com",
      password: test_pw
    });

    test_user.save(function(err){
      if(err){
        return next(err);
      }
      res.json({message:"Test user created!"})
    });
  })
}

/**
 *  @description Delete the sample user
 */
exports.deleteTestUser = function(req, res, next){
  User.remove({ email: "gemexchangetest@test.com" }, function(err, user) {
    if (err){
      return next(err);
    }
    res.json({ message: 'Test user deleted!' });
  });
}

/**
 *  @description Get a list of all users
 */
exports.list = function(req, res, next){
  User.find(function(err, users){
    if(err){
      return next(err);
    }
    res.json(users)
  })
}

/**
 *  @description Get a specific user
 */
exports.get = function(req, res, next){
  User.findById(req.params.user_id, function(err, user){
    if(err){
      return next(new Error('Error retrieving user '+req.params.user_id));
    }
    res.json(user)
  })
}

/**
 * @description Save updates to a specific user
 */
exports.update = function(req, res, next){
  User.findById(req.params.user_id, function(err, user){
    if(err){
      return next(new Error('Error saving changes to user '+req.params.user_id));
    }

    // Update fields
    user.name = req.body.name;

    // Save User
    user.save(function(err){
      if(err)
        return next(err);
      res.json({message:"User updated!"})
    })
  })
}

/**
 * @description Delete a specific user
 */
exports.delete = function(req, res, next){
  User.remove({ _id: req.params.user_id }, function(err, user) {
    if (err){
      return next(err);
    }
    res.json({ message: 'User deleted!' });
  });
}
