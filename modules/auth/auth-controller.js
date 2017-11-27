module.exports = function (schema, bcrypt, jwt, config, utilsController){

  var Users = schema.users;
  var utils = utilsController.utils;

  return {
    login: function (req, res) {
      var query = {};
      var re = /@/;
      if(re.test(req.body.usernameOrEmail)){
        query.email = req.body.usernameOrEmail;
      }
      else{
        query.username = req.body.usernameOrEmail;
      }
      Users.find(query, function(err, user) {
        if(err){
          return res.status(401).json({success: false, message: 'Login failed'});
        }
        if (user.length == 0){
          return res.status(401).json({success: false, message: 'No user found'});
        }
        bcrypt.compare(req.body.password, user[0].password, function(err, match){
          if(match){
            var token;
            if(user[0].admin){
             token = jwt.sign(user, config.apiSecretAdmin(), { expiresIn: '30 days' });
            }
            else{
              token = jwt.sign(user, config.apiSecret(), { expiresIn: '30 days' });
            }
            return res.json({success: true, message: 'User logged in', token: token});
          }else {
            return res.status(401).json({success: false, message: 'Wrong password'});
          }
        });
      });
    }
  }
}
