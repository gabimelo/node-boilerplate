module.exports = function(mongoose, uniqueValidator){

	var Schema = mongoose.Schema;

	var usersSchema = new Schema({
		username : { type : String , required : true, unique: true, uniqueCaseInsensitive: true },
		email : { type : String , required : true, unique: true },
		password : { type : String , required : true }
	});

	usersSchema.pre('save', function(next) {
	  this.email = this.email.toLowerCase();
	  next();
	});

	usersSchema.plugin(uniqueValidator);

	usersSchema.path('email').validate(function (email) {
	   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	   return re.test(email);
	}, 'Invalid email.');

	// checks for empty spaces or '@'s in username
	usersSchema.path('username').validate(function (username) {
	   	var re = /\s|@/;
        return !re.test(username);
	}, 'Username can\'t have blank spaces or "@".');

	return mongoose.model('Users', usersSchema);
}
