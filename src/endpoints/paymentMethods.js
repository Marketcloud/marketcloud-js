import Resource from '../resource'

function PaymentMethods (client) {
  Resource.call(this, client)

  this.name = 'paymentMethods'
  this.endpoint = '/' + this.name
}

PaymentMethods.prototype = new Resource()

export default PaymentMethods
