import Resource from '../resource'

function ShippingMethods (client) {
  Resource.call(this, client)

  this.name = 'shippingMethods'
  this.endpoint = '/' + this.name
}

ShippingMethods.prototype = new Resource()

export default ShippingMethods
