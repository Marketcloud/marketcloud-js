
describe('Cart', function () {
  var CART_ID = null

  it('Should create a cart', function () {
    return marketcloud.carts.create()
        .then(function (response) {
          expect(marketcloud.LAST_REQUEST).to.deep.equal({
            method: 'POST',
            url: 'https://api.marketcloud.it/v0/carts',
            headers: getDefaultHeaders(),
            data: {}
          })
        })
  })

  it('Should add a product to the cart', function () {
    var items = [
        {'product_id': 1, quantity: 1}
    ]
    return marketcloud.carts.add(1, items)
        .then(function (response) {
          expect(marketcloud.LAST_REQUEST).to.deep.equal({
            method: 'PATCH',
            url: 'https://api.marketcloud.it/v0/carts/1',
            headers: getDefaultHeaders(),
            data: {
              'op': 'add',
              'items': items
            }
          })
        })
  })

  it('Should remove a product from the cart', function () {
    var items = [
        {'product_id': 1}
    ]
    return marketcloud.carts.remove(1, items)
        .then(function (response) {
          expect(marketcloud.LAST_REQUEST).to.deep.equal({
            method: 'PATCH',
            url: 'https://api.marketcloud.it/v0/carts/1',
            headers: getDefaultHeaders(),
            data: {
              'op': 'remove',
              'items': items
            }
          })
        })
  })

  it('Should update a product from the cart', function () {
    var items = [
        {'product_id': 1, quantity: 2}
    ]
    return marketcloud.carts.update(1, items)
        .then(function (response) {
          expect(marketcloud.LAST_REQUEST).to.deep.equal({
            method: 'PATCH',
            url: 'https://api.marketcloud.it/v0/carts/1',
            headers: getDefaultHeaders(),
            data: {
              'op': 'update',
              'items': items
            }
          })
        })
  })

  it('Should delete a cart', function () {
    return marketcloud.carts.delete(1)
        .then(function (response) {
          expect(marketcloud.LAST_REQUEST).to.deep.equal({
            method: 'DELETE',
            url: 'https://api.marketcloud.it/v0/carts/1',
            headers: getDefaultHeaders()
          })
        })
  })
})
