# node-boilerplate
Node boilerplate, using MongoDB and Mongoose, providing basic server and app setup, and modules for user registration, login, and end point authentication, using JWT.


Server instatiation provided in  `app.js` file.

`server.js` provides instantiation for imported npm packages, DB connection, imports models and controllers, router and routes definitions.

`config.js` contains basic app configurations and constants.

`package.json` declares application metadata and its dependencies.

Folder models should contain one js file for each model being defined.

Folder modules should contain one folder for each module. Each module folder should contain one file for each controller.

Routes folder contains a `router.js` file, with router setup, and three folders - one for each type of authentication (none, regular user level, admin user level).

Boilerplate already contains functions for creating users, logging users in, getting all users, getting a specific user based on user id, getting a list of users based on array of user ids, and updating a password.

Routes for accessing such functions are as follow:

No authorization needed:
* Creating a new user:
  * POST `<host>`:`<PORT>`/api/users
  * Parameters in body:
  	* password
  	* username
  	* email
* Logging in:
  * POST `<host>`:`<PORT>`/api/login
  * Parameters in body:
  	* usernameOrEmail
  	* password
  
Regular user authorization needed:
* Getting a specific user:
  * GET `<host>`:`<PORT>`/api/users/:user_id
* Updating user password:
  * PUT `<host>`:`<PORT>`/api/users/:user_id
  * Parameters in body:
  	* oldPassword
  	* password
  
Admin user authorization needed:
* Getting all users:
  * GET `<host>`:`<PORT>`/api/users
