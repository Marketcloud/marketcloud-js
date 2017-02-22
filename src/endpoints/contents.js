import Resource from '../resource'

function Contents (client) {
  Resource.call(this, client)

  this.name = 'contents'
  this.endpoint = '/' + this.name
}

Contents.prototype = new Resource()

export default Contents
