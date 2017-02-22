'use strict'

/**
* Resource Class constructor
*
* @param {Object} client The instance of the Marketcloud client.
*
**/
function Resource (client) {
  this.master = client
};

/**
* Performs a GET /resource request
*
* @param {Objecct}  query     The object representation of the query string
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
Resource.prototype.list = function (query, callback) {
  return this.master.Get(this.endpoint, query, callback)
}

/**
* Performs a GET /resource/:id request
*
* @param {Number}   id      The id of the resource to request
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
Resource.prototype.getById = function (id, callback) {
  if (isNaN(id)) {
    throw new Error('id must be an integer.')
  }
  return this.master.Get(this.endpoint + '/' + id, {}, callback)
}

/**
* Performs a POST /resource request
*
* @param {Object}   data      The JSON representation of the resource to create
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
Resource.prototype.create = function (data, callback) {
  return this.master.Post(this.endpoint, data, callback)
}

/**
* Performs a PUT /resource/:id request
*
* @param {Number}   id      The id of the resource to update
* @param {Object}   data      The object representation of the update
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
Resource.prototype.update = function (id, data, callback) {
  if (isNaN(id)) {
    throw new Error('id must be an integer.')
  }

  return this.master.Put(this.endpoint + '/' + id, data, callback)
}

/**
* Performs a DELETE /resource/:id request
*
* @param {Number}   id      The id of the resource to delete
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
Resource.prototype.delete = function (id, callback) {
  return this.master.Delete(this.endpoint + '/' + id, callback)
}

window.resource = Resource
export default Resource
