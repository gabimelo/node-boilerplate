module.exports = function (nodeMailer){
	var env = process.env.NODE_ENV || 'development';

	return{
		mongoURI : function(){
			if (env === 'development') {
			  return 'localhost:27017/node_boilerplate';
			}

			// production only
			// else if (env === 'production') {
			//   return '';
			// }

			// else if (env === 'staging') {
			//   return '';
			// }

			else if (env === 'test') {
			  return 'localhost:27017/node_boilerplate_test';
			}
		},
		apiSecret : function(){
		// TODO chave para validacao do token para usuarios comuns
			return '12345';
		},
		apiSecretAdmin : function(){
		// TODO chave para validacao do token para usuarios admin:
			return '54321';
		},
		saltRounds : function(){
			return 4;
		}
	};
}
