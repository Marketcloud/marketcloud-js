import Resource from '../resource'

function Invoices (client) {
  Resource.call(this, client)

  this.name = 'invoices'
  this.endpoint = '/' + this.name
}

Invoices.prototype = new Resource()

export default Invoices
