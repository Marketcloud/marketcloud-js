import Resource from '../resource'

function Brands (client) {
  Resource.call(this, client)

  this.name = 'brands'
  this.endpoint = '/' + this.name
}

Brands.prototype = new Resource()

export default Brands
