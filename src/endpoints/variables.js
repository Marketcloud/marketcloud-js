import Resource from '../resource'

function Variables (client) {
  Resource.call(this, client)

  this.name = 'variables'
  this.endpoint = '/' + this.name
}

Variables.prototype = new Resource()

export default Variables
