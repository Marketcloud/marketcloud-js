# Marketcloud Javascript Client Library
![Marketcloud](http://beta.marketcloud.it/img/logo/new_with_text.png)

This is the documentation for the V2.0.0 and above of the client,for older version, please refer to the website www.marketcloud.it

## Installation
### Bower
```
bower install marketcloud-js
```
### NPM
```
npm install marketcloud-js
```
### Manual
```
git clone https://github.com/Marketcloud/marketcloud-js.git
```

Then add the javascript sources directly into your web application:
```javascript
<script type="text/javascript" src="dist/marketcloud.min.js"></script>
```
At this point the marketcloud sdk is available as the marketcloud variable:
```javascript
var marketcloud = new Marketcloud.Client({
  publicKey : 'replace-with-your-public-key'
})

marketcloud.products.list({},function(err,products) {
//your code here
});
```
## Documentation
For further informations check the [official documentation](http://www.marketcloud.it/documentation/javascript)
