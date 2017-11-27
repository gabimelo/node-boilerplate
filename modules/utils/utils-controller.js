module.exports = function (moment){
  return {
    formatErrMessage : function(err){
      var message = "";
      if(err.errors){
        for(key in err.errors){
          message += err.errors[key].message + " ";
        }
      }
      else{
        message += err.message;
      }
      return message;
    }
  };
};