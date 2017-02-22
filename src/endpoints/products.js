import Resource from '../resource'

function Products (client) {
  Resource.call(this, client)

  this.name = 'products'
  this.endpoint = '/' + this.name
}

Products.prototype = new Resource()

export default Products
