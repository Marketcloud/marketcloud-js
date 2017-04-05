[![Build Status](https://travis-ci.org/Marketcloud/marketcloud-js.svg?branch=master)](https://travis-ci.org/Marketcloud/marketcloud-js) [![npm version](https://badge.fury.io/js/marketcloud-js.svg)](https://badge.fury.io/js/marketcloud-js) [![Bower version](https://badge.fury.io/bo/marketcloud-js.svg)](https://badge.fury.io/bo/marketcloud-js)
[![Code Climate](https://codeclimate.com/github/Marketcloud/marketcloud-js/badges/gpa.svg)](https://codeclimate.com/github/Marketcloud/marketcloud-js)
# Marketcloud Javascript Client Library 
![Marketcloud](http://www.marketcloud.it/img/logo/new_with_text.png)

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
