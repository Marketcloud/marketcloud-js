var expect = chai.expect;
var marketcloud = new Marketcloud.Client({
  public_key : 'f84af487-a315-42e6-a57a-d79296bd9d99'
})

//We just want to be sure that the SDK is forging requests correctly
// so we are not going to test the db
marketcloud.rejectApiErrors = false;

function getDefaultHeaders(){
  return {
            Authorization : marketcloud.public_key
          }
}

describe("Product", function() {
  var product = null;
  describe("list", function() {


    it("should list  some products", function() {
      
      return marketcloud.products.list()
      .then(function(response) {
        
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method : 'GET',
          url : 'https://api.marketcloud.it/v0/products',
          params : {},
          headers : getDefaultHeaders()
        });
      })
    });


    it("should correctly pass GET parameters", function() {
      return marketcloud.products.list({per_page : 1, page : 2})
      .then(function(response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method : 'GET',
          url : 'https://api.marketcloud.it/v0/products',
          params : {
            page : 2,
            per_page : 1
          },
          headers :getDefaultHeaders()
        });
      })
    });


    it("should look for a specific product", function() {
      
      return marketcloud.products.getById(12)
      .then(function(response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method : 'GET',
          url : 'https://api.marketcloud.it/v0/products/12',
          params : {},
          headers : {
            Authorization : marketcloud.public_key
          }
        });
      })
    });



  });

});
