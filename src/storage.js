'use strict'
/* globals localStorage */
var BrowserStorage = (function () {
    /**
     * Whether the current browser supports local storage as a way of storing data
     * @var {Boolean}
     */
  var _hasLocalStorageSupport = (function () {
    try {
      return 'localStorage' in window && window['localStorage'] !== null
    } catch (e) {
      return false
    }
  })()

    /**
     * @param {String} name The name of the property to read from this document's cookies
     * @return {?String} The specified cookie property's value (or null if it has not been set)
     */
  var _readCookie = function (name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }

    return null
  }

    /**
     * @param {String} name The name of the property to set by writing to a cookie
     * @param {String} value The value to use when setting the specified property
     * @param {int} [days] The number of days until the storage of this item expires
     */
  var _writeCookie = function (name, value, days) {
    var expiration = (function () {
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        return '; expires=' + date.toGMTString()
      } else {
        return ''
      }
    })()

    document.cookie = name + '=' + value + expiration + '; path=/'
  }

  return {

        /**
        *   This is used to prefix keys
        **/
    prefix: 'mrtkcld_',

        /**
         * @param {String} name The name of the property to set
         * @param {String} value The value to use when setting the specified property
         * @param {int} [days] The number of days until the storage of this item expires (if storage of the provided item must fallback to using cookies)
         */
    set: function (name, value, days) {
      _hasLocalStorageSupport
                ? localStorage.setItem(this.prefix + name, value)
                : _writeCookie(this.prefix + name, value, days)
    },

        /**
         * @param {String} name The name of the value to retrieve
         * @return {?String} The value of the
         */
    get: function (name) {
      return _hasLocalStorageSupport
                ? localStorage.getItem(this.prefix + name)
                : _readCookie(this.prefix + name)
    },

        /**
         * @param {String} name The name of the value to delete/remove from storage
         */
    delete: function (name) {
      _hasLocalStorageSupport
                ? localStorage.removeItem(this.prefix + name)
                : this.set(this.prefix + name, '', -1)
    }
  }
})()

window.BrowserStorage = BrowserStorage
export default BrowserStorage
