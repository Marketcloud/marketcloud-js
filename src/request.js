'use strict'

// ESLINT
/* globals ActiveXObject, XMLHttpRequest */

import utils from './utils'

var XMLHttpFactories = [
  function () { return new XMLHttpRequest() },
  function () { return new ActiveXObject('Msxml2.XMLHTTP') },
  function () { return new ActiveXObject('Msxml3.XMLHTTP') },
  function () { return new ActiveXObject('Microsoft.XMLHTTP') }
]

/**
* Builds an AJAX request in a cross browser fashion
*
* @returns {XMLHttpRequest|ActiveXObject} The crafted request
**/
function createXMLHTTPObject () {
  var xmlhttp = false
  for (var i = 0; i < XMLHttpFactories.length; i++) {
    try {
      xmlhttp = XMLHttpFactories[i]()
    } catch (e) {
      continue
    }
    break
  }
  return xmlhttp
}

/** The list of supported methods is
*
* GET
* PUT
* POST
* PATCH
* DELETE
*
**/
const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
* @constructor
* @param {String} config.method   The HTTP method of the HTTP request
* @param {String} config.url    The url of the HTTP request
* @param {Object} config.headers  Object where keys are HTTP headers names and values are header values
* @param {Object} config.data   JSON data to send with POST/PUT/PATCH requests
* @param {Object} config.params JSON representation of the querystring. Will be automatically turned into a querystring
* @param {Client} Client      Instance of the Marketcloud JS Client
**/
var request = function (config, client) {
  this.method = config.method

  if (METHODS.indexOf(this.method) < 0) {
    throw new Error('Unsupported HTTP method ' + this.method)
  }

  // Todo check url validity
  this.url = config.url

  this.headers = config.headers || {}

  this.data = config.data || {}

  this.params = config.params || {}

  this.client = client
}

/**
* Returns the full request URI based on instance information
*
* @return {String} The request URI
*
**/
request.prototype.getFullRequestUri = function () {
  var str = '' + this.url

  if (this.method === 'GET') {
    str += '?'
    for (var k in this.params) {
      str += encodeURI(k + '=' + this.params[k]) + '&'
    }

    // removing the last & if present
    // and adding the first ?
    if (str.slice(-1) === '&') {
      str = str.slice(0, -1)
    }
  }
  return str
}

/**
* Performs the HTTP request
*
* @param {Function}   callback    The callback that will receive the response
* @returns {Promise}  Promise   The request returns a promise as well
*
**/
request.prototype.send = function (callback) {
  if (callback) {
    return this.sendAsCallback(callback)
  } else {
    return this.sendAsPromise()
  }
}

request.prototype.sendAsPromise = function () {
  return new Promise((resolve, reject) => {
    // Creating the request instance
    var xhr = createXMLHTTPObject()
    // Init the request
    xhr.open(this.method, this.getFullRequestUri())

    // Adding headers
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')

    for (var k in this.headers) { xhr.setRequestHeader(k, this.headers[k]) }

    // Setting up callbacks
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          return resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status >= 400) {
          if (this.client.rejectApiErrors === true) {
            return reject(JSON.parse(xhr.responseText))
          } else {
            return resolve(JSON.parse(xhr.responseText))
          }
        }
      }
    }

    xhr.onerror = () => {
      reject(new Error('Networking error'))
    }

    if (['PATCH', 'POST', 'PUT'].indexOf(this.method) >= 0) {
      xhr.send(JSON.stringify(this.data))
    } else {
      xhr.send()
    }
  })
}

request.prototype.sendAsCallback = function (callback) {
  if (!utils.isFunction(callback)) {
    throw new Error('Callback must be a Function')
  }

    // Creating the request instance
  var xhr = createXMLHTTPObject()
    // Init the request
  xhr.open(this.method, this.getFullRequestUri())

    // Adding headers
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  for (var k in this.headers) { xhr.setRequestHeader(k, this.headers[k]) }

    // Setting up callbacks
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 400) {
        return callback(null, JSON.parse(xhr.responseText))
      }

      if (xhr.status >= 400) {
        return callback(JSON.parse(xhr.responseText))
      }
    }
  }

  xhr.onerror = () => {
    return callback(new Error('Netowrking error. Please check connectivity'))
  }

  if (['PATCH', 'POST', 'PUT'].indexOf(this.method) >= 0) {
    xhr.send(JSON.stringify(this.data))
  } else {
    xhr.send()
  }
}

window.request = request
export default request
