import Resource from '../resource'

function Collections (client) {
  Resource.call(this, client)

  this.name = 'collections'
  this.endpoint = '/' + this.name
}

Collections.prototype = new Resource()

export default Collections
