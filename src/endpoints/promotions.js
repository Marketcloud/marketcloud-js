import Resource from '../resource'


function Promotions(client){

	Resource.call(this,client);

	this.name = 'promotions';
	this.endpoint = '/'+this.name;
}

Promotions.prototype = new Resource();


Promotions.prototype.getByCart = function(cart_id,callback) {
	return this.master.Get('/promotions/cart/'+cart_id,callback);
}

export default Promotions;
