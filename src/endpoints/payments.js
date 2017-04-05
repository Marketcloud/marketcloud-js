
function Payments (master) {
  this.master = master

  this.name = 'payments'
  this.endpoint = '/' + this.name

  this.braintree = {
    createClientToken: function (callback) {
      return master.Post('/integrations/braintree/clientToken', {}, callback)
    },
    create: function (data, callback) {
      data.method = 'Braintree'
      if (!data.hasOwnProperty('nonce')) {
        throw new Error('Missing required attribute nonce')
      }
      if (!data.hasOwnProperty('order_id')) {
        throw new Error('Missing required attribute order_id')
      }

      return this.master.Post('/payments', data, callback)
    }
  }
  this.stripe = {
    create: function (data, callback) {
      data.method = 'Stripe'
      if (!data.hasOwnProperty('source')) { throw new Error('Missing required attribute source') }
      if (!data.hasOwnProperty('order_id')) {
        throw new Error('Missing required attribute order_id')
      }

      return this.master.Post('/payments', data, callback)
    }
  }
}

Payments.prototype.create = function (data) {
  if (!data.hasOwnProperty('method')) {
    throw new Error('Missing required attribute method')
  }
  if (!data.hasOwnProperty('order_id')) {
    throw new Error('Missing required attribute order_id')
  }

  return this.master.Post('/payments', data)
}

export default Payments
