import Client from './client'
import Utils from './utils'
import Storage from './storage'

var Marketcloud = Marketcloud || {}

// The client class
Marketcloud.Client = Client

// Interface to browser storage methods
Marketcloud.Storage = Storage


// Utility functions
Marketcloud.Utils = Utils

// Exporting to the window object for compatibility
if ("undefined" !== typeof window)
  window.Marketcloud = Marketcloud

// Exporting to commonjs
if ("undefined" !== typeof module)
  module.exports = Marketcloud;


// exporting to ES6

export default Marketcloud

export {
  Client,
  Storage,
  Utils
}


