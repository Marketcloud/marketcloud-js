'use strict';

import utils from './utils'
import request from './request'

//Resources
import Brands from './endpoints/brands';
import Carts from './endpoints/carts';
import Categories from './endpoints/categories';
import Collections from './endpoints/collections';
import Contents from './endpoints/contents';
import Coupons from './endpoints/coupons';
import Invoices from './endpoints/invoices';
import Media from './endpoints/media';
import Orders from './endpoints/orders';
import Payments from './endpoints/payments';
import PaymentMethods from './endpoints/paymentMethods';
import Products from './endpoints/products';
import Promotions from './endpoints/promotions';
import ShippingMethods from './endpoints/shippingMethods';
import Users from './endpoints/users';
import Variables from './endpoints/variables';





/*
*	@constructor
*	@param {String} config.public_key The public key for your app
*	@param {String} config.rejectApiErrors The public key for your app
*/
function Client(config) {

		this.token = null;

		this.publicKey = config.publicKey || config.public_key;
		

		this.baseUrl = 'https://api.marketcloud.it';

		// Marketcloud's api is versioned by URL
		// for instance, the current api is api.marketcloud.it/v0/<endpoint>
		this.apiVersion = 'v0';

		// If this is true, then api responses with status code >= 400
		//  are rejected as errors.
		//  If set to false all responses from server are resolved
		//  
		//  In both cases, "failures" are rejected.
		this.rejectApiErrors = config.rejectApiErrors || true;

		// Creating resources instances
		this.brands = new Brands(this);
		this.categories = new Categories(this);
		this.carts = new Carts(this);
		this.collections = new Collections(this);
		this.coupons = new Coupons(this);
		this.products= new Products(this);
		this.orders = new Orders(this);
		this.invoices = new Invoices(this);
		this.users = new Users(this);
		this.contents = new Contents(this);
		this.files = new Media(this);
		this.media = this.files;
		this.promotions = new Promotions(this);
		this.shippingMethods = new ShippingMethods(this);
		this.shippings = this.shippingMethods;
		this.payments = new Payments(this);
		this.paymentMethods = new PaymentMethods(this);
		this.variables = new Variables(this);




		this.RETRIES = 0;
		this.MAX_RETRIES = 2;

		// This is a handy reference for better testability
		// of the whole client.
		this.LAST_REQUEST = null;

	}


/**
*	@return {String} The Authorization header
*
**/
Client.prototype.getAuthorizationHeader = function() {
	var str = this.publicKey;

	if (this.token)
		str += ':'+this.token;

	return str;
}

/*
*	@param {Object} 	config 		The Http request configuration, see Request for more details 
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.request = function(config,callback){
	var r = new request(config,this);
	return r.send(callback);
}


/*
*	Performs a GET request
*
*	@param {String}		path 		The path to append to the base url, e.g. /products/:id
*	@param {Object} 	params 		JSON representation of the Query string
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.Get = function(path,params,callback){
	
	var that = this,
		_req = {
		url : that.baseUrl + '/' + that.apiVersion + path,
		method : 'GET',
		params : params || {},
		headers : {
			Authorization : that.getAuthorizationHeader()
		}
	};

	this.LAST_REQUEST = _req;

	return this.request(_req,callback)
}

/*
*	Performs a POST request
*
*	@param {String}		path 		The path to append to the base url, e.g. /products/:id
*	@param {Object} 	data 		JSON representation of the request body
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.Post = function(path,data,callback){
	
	var that = this,
		_req = {
		url : that.baseUrl + '/' + that.apiVersion + path,
		method : 'POST',
		data : data || {},
		headers : {
			Authorization : that.getAuthorizationHeader()
		}
	};

	this.LAST_REQUEST = _req;

	return this.request(_req,callback)
}

/*
*	Performs a PUT request
*
*	@param {String}		path 		The path to append to the base url, e.g. /products/:id
*	@param {Object} 	data 		JSON representation of the request body
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.Put = function(path,data,callback){
	
	var that = this,
		_req = {
		url : that.baseUrl + '/' + that.apiVersion + path,
		method : 'PUT',
		data : data || {},
		headers : {
			Authorization : that.getAuthorizationHeader()
		}
	};
	this.LAST_REQUEST = _req;

	return this.request(_req,callback)
}

/*
*	Performs a PATCH request
*
*	@param {String}		path 		The path to append to the base url, e.g. /products/:id
*	@param {Object} 	data 		JSON representation of the request body
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.Patch = function(path,data,callback){
	
	var that = this,
		_req = {
		url : that.baseUrl + '/' + that.apiVersion + path,
		method : 'PATCH',
		data : data || {},
		headers : {
			Authorization : that.getAuthorizationHeader()
		}
	}
	this.LAST_REQUEST = _req;
	return this.request(_req,callback)
}


/*
*	Performs a DELETE request
*
*	@param {String}		path 		The path to append to the base url, e.g. /products/:id
*	@param {Function} 	calback 	The Callback
*/
Client.prototype.Delete = function(path,callback){
	
	var that = this,
		_req = {
		url : that.baseUrl + '/' + that.apiVersion + path,
		method : 'DELETE',
		headers : {
			Authorization : that.getAuthorizationHeader()
		}
	};
	this.LAST_REQUEST = _req;
	return this.request(_req,callback)
}



export default Client