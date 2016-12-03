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

describe("Users", function() {
  // Fixtures
  var product = null;
  var randomemail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  randomemail+='@test.com';

  describe("auth", function() {


   

    it("should create a user", function() {
      
      return marketcloud.users.create({
        email  : randomemail,
        password : 'super-secret-password-123'
      })
      .then(function(response) {
        
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method : 'POST',
          url : 'https://api.marketcloud.it/v0/users',
          data : {
            email  : randomemail,
            password : 'super-secret-password-123'
          },
          headers : getDefaultHeaders()
          
        });
      })
    });


     it("should authenticate a user", function() {
      
      return marketcloud.users.authenticate(randomemail,'super-secret-password-123')
      .then(function(response) {
        expect(marketcloud.LAST_REQUEST).to.deep.equal({
          method : 'POST',
          url : 'https://api.marketcloud.it/v0/users/authenticate',
          data : {
            email : randomemail,
            password : 'super-secret-password-123'
          },
          headers : {
            Authorization : marketcloud.public_key
          }
        });
      })
    });



  });

});
