module.exports = function (moduleUsers){

  var controllers = moduleUsers.controllers;

  return function(router){
    router.route('/users/:user_id')
      .get(function(req, res) {
        controllers.users.getUser(req, res);
      })
      .put(function(req, res) {
        controllers.users.updatePassword(req, res);
      });
  };
};
