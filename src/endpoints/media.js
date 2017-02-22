import Resource from '../resource'

function Media (client) {
  Resource.call(this, client)

  this.name = 'media'
  this.endpoint = '/' + this.name
}

Media.prototype = new Resource()

export default Media
