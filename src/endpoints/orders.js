import Resource from '../resource'

function Orders (client) {
  Resource.call(this, client)

  this.name = 'orders'
  this.endpoint = '/' + this.name
}

Orders.prototype = new Resource()

export default Orders
