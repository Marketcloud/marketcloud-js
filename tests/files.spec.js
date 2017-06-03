
var marketcloud = getMarketcloudClient()

describe('Files', function () {
  describe('list', function () {
    it('should list  some files', function () {
      return marketcloud.files.list()
      .then(function (response) {
        var test = {
          method: 'GET',
          url: 'http://localhost:5000/v0/media',
          params: {},
          headers: getDefaultHeaders(marketcloud)
        }
        expect(marketcloud.LAST_REQUEST).to.deep.equal(test)
      })
    })
  })
})
