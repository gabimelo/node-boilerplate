module.exports = function (schema, bcrypt, jwt, config, utilsController, async, crypto){

  var Users = schema.users;
  var utils = utilsController.utils;

  return {
    createUser: function (req, res) {
      if(req.body.password && req.body.password != ""){
        bcrypt.hash(req.body.password, config.saltRounds(), function(err, hash){
          if(err) throw err;
          var newUser = new Users();
          newUser.username = req.body.username;
          newUser.email = req.body.email;
          newUser.password = hash;

          newUser.save(function(err, dbUser){
            if(err) {
              var message = utilsController.formatErrMessage;
              return res.json({success: false, message: message});
            }

            var token = jwt.sign(newUser.toObject(), config.apiSecret());
            return res.json({success: true, message: 'User registered', token: token, response: {user: dbUser}}); 
          });
        });
      }
      else{
        return res.json({success: false, message: 'Unable to add user due to: password required'});
      }
    },
    getUsers: function (req, res) {
      Users.find('_id username email', function(err, dbUser){
        if(err) throw err;
        return res.json({success: true, message: 'Found users', response: {users: dbUser}});
      });
    },
    getUser: function (req, res){
      var user_id = req.params.user_id;
      Users.findById(user_id, '_id username email', function(err, dbUser) {
        if(err) throw err;
        if(dbUser){
          return res.json({success: true, message: 'Found user', response: {user: dbUser}});
        }
        else{
          return res.json({success: false, message: 'Unable to find user'});
        }
      });
    },
    updatePassword: function (req, res){
      var user_id = req.params.user_id;
      Users.findById(user_id, function(err, user) {
        if(err || !user) return res.json({success: false, message: 'Default_error', error: 'Error finding user'});
        bcrypt.compare(req.body.oldPassword, user.password, function(err, match){
          if(err || !match) return res.json({success: false, message: 'Wrong_password', error: "Incorrect password"});
          if(req.body.password && req.body.password !== ""){
            bcrypt.hash(req.body.password, config.saltRounds(), function(err, hash){
              if(err) return res.json({success: false});
              user.password = hash;
                user.save(function(err, dbUser) {
                if (err) return res.json({success: false, error: 'Default_error', message: 'Unable to update user due to validation error: ' + utils.formatErrMessage(err)});
                else return res.json({success: true, message: 'Password_updated'});
              });
            });
          }
          else return res.json({success: false, message: 'Password_required', error: "No password"});
        });
      });
    }
  };
};
