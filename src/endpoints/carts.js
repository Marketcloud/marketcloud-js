import Resource from '../resource'


function Carts(client){

	Resource.call(this,client);

	this.name = 'carts';
	this.endpoint = '/'+this.name;
}

Carts.prototype = new Resource();


Carts.prototype.add = function(id, items,callback) {
		if (isNaN(id))
			throw new Error('id must be an integer.');

		if (!(items instanceof Array))
			throw new Error('items must be an array of line items');
		var payload = {
			op: "add",
			items: items
		}
		return this.master.Patch('/carts/' + id, payload,callback)
	}

	Carts.prototype.remove = function(id, items,callback) {
		if (isNaN(id))
			throw new Error('id must be an integer.')

		if (!(items instanceof Array))
			throw new Error('items must be an array of line items')


		var payload = {
			op: "remove",
			items: items
		}
		return this.master.Patch('/carts/' + id, payload,callback)
	}

	Carts.prototype.update = function(id, items,callback) {
		if (isNaN(id))
			throw new Error('id must be an integer.')

		if (!(items instanceof Array))
			throw new Error('items must be an array of line items')


		var payload = {
			op: "update",
			items: items
		}
		return this.master.Patch('/carts/' + id, payload,callback)
	}

export default Carts;
