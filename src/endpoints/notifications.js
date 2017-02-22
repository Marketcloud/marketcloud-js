import Resource from '../resource'

function Notifications (client) {
  Resource.call(this, client)

  this.name = 'notifications'
  this.endpoint = '/' + this.name
}

Notifications.prototype = new Resource()

export default Notifications
