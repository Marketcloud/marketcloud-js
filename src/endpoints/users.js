import Resource from '../resource'


function Users(client){

	Resource.call(this,client);

	this.name = 'users';
	this.endpoint = '/'+this.name;
}


Users.prototype = new Resource();

Users.prototype.authenticate = function(email, password) {
		var payload = {
			email: email,
			password: password
		}
		var that = this;
		return this.master.Post('/users/authenticate', payload)
		.then(function(response){
			
			that.master.token = response.data.token;
			that.master.currentUser = response.data.user;
		})
}

Users.prototype.authenticateWithFacebook = function(user_id,access_token){
	var payload = {
			user_id: user_id,
			access_token: access_token
		}
		return this.master.Post('/users/authenticate/facebook', payload);
};



export default Users;
