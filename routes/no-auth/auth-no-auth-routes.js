module.exports = function (moduleAuth){
  
  var controllers = moduleAuth.controllers;

  return function(router){
    router.route('/login')
      .post(function(req, res) {
        controllers.auth.login(req, res);
      });
  }
}