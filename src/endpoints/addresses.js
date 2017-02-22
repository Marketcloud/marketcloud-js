import Resource from '../resource'

function Addresses (client) {
  Resource.call(this, client)

  this.name = 'addresses'
  this.endpoint = '/' + this.name
}

Addresses.prototype = new Resource()

export default Addresses
