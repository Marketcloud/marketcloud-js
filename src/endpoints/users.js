import Resource from '../resource';
import Storage from '../storage';

function Users(client){

	Resource.call(this,client);

	this.name = 'users';
	this.endpoint = '/'+this.name;
}


Users.prototype = new Resource();

Users.prototype.authenticate = function(email, password,callback) {


		var payload = {
			email: email,
			password: password
		}
		var that = this;


		
		return this.master.Post('/users/authenticate', payload)
		.then(function(response){
			
			that.master.token = response.data.token;
			that.master.currentUser = response.data.user;

			// Persisting the user token in the browser's storage (with fallback)
			Storage.set('AuthenticatedUserToken',response.data.token);
			Storage.set('AuthenticatedUserData',JSON.stringify(that.master.currentUser));

			if (callback)
				return callback(null,response);

			return new Promise((resolve,reject) => {
				resolve(response);
			})
		})
}

Users.prototype.authenticateWithFacebook = function(user_id,access_token,callback){
	var payload = {
			user_id: user_id,
			access_token: access_token
		}
		return this.master.Post('/users/authenticate/facebook', payload,callback);
};


/*
*	Forgets authentication data
*/
Users.prototype.logout = function() {

	this.master.token = null;
	this.master.currentUser = null;

	Storage.delete('AuthenticatedUserToken');
	Storage.delete('AuthenticatedUserData');
}



export default Users;
