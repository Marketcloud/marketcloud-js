import Resource from '../resource'


function Promotions(client){

	Resource.call(this,client);

	this.name = 'promotions';
	this.endpoint = '/'+this.name;
}

Promotions.prototype = new Resource();

export default Promotions;
