import Resource from '../resource'

function Coupons (client) {
  Resource.call(this, client)

  this.name = 'coupons'
  this.endpoint = '/' + this.name
}

Coupons.prototype = new Resource()

export default Coupons
