module.exports = function (moduleTickets){

  var controllers = moduleTickets.controllers;

  return function(router){
    router.route('/users')
      .get(function(req, res) {
        controllers.users.getUsers(req, res);
      });
  };
};
