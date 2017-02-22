import Resource from '../resource'

function Categories (client) {
  Resource.call(this, client)

  this.name = 'categories'
  this.endpoint = '/' + this.name
}

Categories.prototype = new Resource()

export default Categories
