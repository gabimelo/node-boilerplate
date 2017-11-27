module.exports = function (moduleUsers){
  
  var controllers = moduleUsers.controllers;

  return function(router){
    router.route('/users')
      .post(function(req, res) {
        controllers.users.createUser(req, res);
      });
  }
}