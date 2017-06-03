// Global testing setup

// Utility function that instantiate a new client.
function getMarketcloudClient () {
  var marketcloud = new Marketcloud.Client({
    publicKey: 'c88b04e9-fcd8-42a8-b68e-38413e024c1b'
  })

  // Just testing that requests are configured correctly
  marketcloud.rejectApiErrors = false

  return marketcloud
}

function getDefaultHeaders (client) {
  if (client.token) {
    return {
      Authorization: client.publicKey + ':' + client.token
    }
  } else {
    return {
      Authorization: client.publicKey
    }
  }
}

var expect = chai.expect

chai.config.truncateThreshold = 0
