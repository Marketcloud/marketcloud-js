import Resource from '../resource'
import Storage from '../storage'

function Users (client) {
  Resource.call(this, client)

  this.name = 'users'
  this.endpoint = '/' + this.name
}

Users.prototype = new Resource()

Users.prototype.authenticate = function (email, password, callback) {
  var payload = {
    email: email,
    password: password
  }
  var that = this

  return this.master.Post('/users/authenticate', payload)
    .then(function (response) {
      that.master.token = response.data.token
      that.master.currentUser = response.data.user

      // Persisting the user token in the browser's storage (with fallback)
      Storage.set('AuthenticatedUserToken', response.data.token)
      Storage.set('AuthenticatedUserData', JSON.stringify(that.master.currentUser))

      if (callback) {
        return callback(null, response)
      }

      return new Promise((resolve, reject) => {
        resolve(response)
      })
    })
    .catch(function (response) {
      if (callback) {
        return callback(response, null)
      }
      return new Promise((resolve, reject) => {
        reject(response)
      })
    })
}

/*
* @params useStorage {Boolean} If set to True, will fetch data from the API, if false it will fetch stored data. Defaults to false.
* @return {Object} Returns an object containing the currently authenticated user's data. If there's no auth data available,returns null.
*/
Users.prototype.getCurrent = function (useStorage, callback) {
  // if usestorage is true, then we don't fetch data from marketcloud
  if (useStorage === true) {
    return new Promise(function (resolve, reject) {
      callback(null, {data: this.master.currentUser})
      return resolve({data: this.master.currentUser})
    })
  } else {
    return this.master.Get('/users', callback)
  }
}

/*
* @return {Object} Returns an object containing the currently authenticated user's data. If there's no auth data available,returns null.
*/
Users.prototype.updateCurrent = function (update, callback) {
  // if usestorage is true, then we don't fetch data from marketcloud
  if (this.master.currentUser) {
    return this.master.Put('/users/' + this.master.currentUser.id, update)
  } else {
    throw new Error('Unable to update current user. No user is currently authenticated. Call authenticate() first.')
  }
}

/*
* @return {Boolean} True if the client has a stored auth token. False otherwise.
*/
Users.prototype.isAuthenticated = function () {
  // May be improved by
  // return !!this.master.token
  if (this.master.token) {
    return true
  } else {
    return false
  }
}

Users.prototype.authenticateWithFacebook = function (userId, accessToken, callback) {
  var payload = {
    user_id: userId,
    access_token: accessToken
  }
  return this.master.Post('/users/authenticate/facebook', payload, callback)
}

/*
* Forgets authentication data, both token and user data.
*/
Users.prototype.logout = function () {
  this.master.token = null
  this.master.currentUser = null

  Storage.delete('AuthenticatedUserToken')
  Storage.delete('AuthenticatedUserData')
}

export default Users
