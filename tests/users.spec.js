var expect = chai.expect
chai.config.truncateThreshold = 0

// We just want to be sure that the SDK is forging requests correctly
// so we are not going to test the db

function getDefaultHeaders () {
  return marketcloud.LAST_REQUEST.headers
}

function getLastHeaders () {
  return marketcloud.LAST_REQUEST.headers
}

describe('Users', function () {
  // Fixtures
  var marketcloud = getMarketcloudClient()
  var product = null
  var randomemail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
  randomemail += '@test.com'

  describe('auth', function () {
    it('should create a user', function () {
      return marketcloud.users.create({
        email: randomemail,
        password: 'super-secret-password-123'
      })
      .then(function (response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: 'https://api.marketcloud.it/v0/users',
          data: {
            email: randomemail,
            password: 'super-secret-password-123'
          },
          headers: marketcloud.LAST_REQUEST.headers

        })
      })
    })

    it('should authenticate a user', function () {
      // Lets forget the auth
      marketcloud.users.logout()

      return marketcloud.users.authenticate(randomemail, 'super-secret-password-123')
      .then(function (response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: 'https://api.marketcloud.it/v0/users/authenticate',
          data: {
            email: randomemail,
            password: 'super-secret-password-123'
          },
          headers: marketcloud.LAST_REQUEST.headers
        })

        expect(marketcloud.token).to.equal(response.data.token)
        expect(marketcloud.users.isAuthenticated()).to.equal(true)
      })
    })

    it('should update a user', function () {
      return marketcloud.users.updateCurrent({updated: true})
      .then(function (response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: 'https://api.marketcloud.it/v0/users/' + marketcloud.currentUser.id,
          data: {
            updated: true
          },
          headers: marketcloud.LAST_REQUEST.headers
        })
      })
    })
  })
})
