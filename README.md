[![Build Status](https://travis-ci.org/Marketcloud/marketcloud-js.svg?branch=master)](https://travis-ci.org/Marketcloud/marketcloud-js) [![npm version](https://badge.fury.io/js/marketcloud-js.svg)](https://badge.fury.io/js/marketcloud-js) [![Bower version](https://badge.fury.io/bo/marketcloud-js.svg)](https://badge.fury.io/bo/marketcloud-js)
[![Code Climate](https://codeclimate.com/github/Marketcloud/marketcloud-js/badges/gpa.svg)](https://codeclimate.com/github/Marketcloud/marketcloud-js)
# Marketcloud Javascript SDK
![Marketcloud](http://www.marketcloud.it/img/logo/new_with_text.png)


- [Introduction](#introduction)
- [Installation](#installation)
- [Authentication and security](#authentication-and-security)
- [Promises](#promises)
- [Sorting](#sorting)
- [Addresses](#addresses)
  * [Create an address](#create-an-address)
  * [List all addresses](#list-all-addresses)
  * [Retrieve an address](#retrieve-an-address)
  * [Update an address](#update-an-address)
  * [Delete an address](#delete-an-address)
- [Brands](#brands)
  * [Retrieve a brand](#retrieve-a-brand)
  * [List all brands](#list-all-brands)
- [Categories](#categories)
  * [Retrieve a category](#retrieve-a-category)
  * [List all categories](#list-all-categories)
- [Carts](#carts)
  * [Create a cart](#create-a-cart)
  * [Retrieve a cart](#retrieve-a-cart)
  * [Add items to cart](#add-items-to-cart)
  * [Update cart contents](#update-cart-contents)
  * [Add a coupon to the cart](#add-a-coupon-to-the-cart)
  * [Remove cart contents](#remove-cart-contents)
- [Collections](#collections)
  * [Retrieve a collection](#retrieve-a-collection)
  * [List all collections](#list-all-collections)
- [Contents](#contents)
  * [Retrieve a content](#retrieve-a-content)
  * [List contents](#list-contents)
- [Coupons](#coupons)
  * [Retrieve a coupon](#retrieve-a-coupon)
  * [List coupons](#list-coupons)
- [Orders](#orders)
  * [List all orders](#list-all-orders)
  * [Retrieve an order](#retrieve-an-order)
  * [Create an order](#create-an-order)
- [Payment methods](#payment-methods)
    + [Usage with orders](#usage-with-orders)
  * [Retrieve a payment method](#retrieve-a-payment-method)
  * [List all payment methods](#list-all-payment-methods)
- [Payments](#payments)
  * [Create a payment](#create-a-payment)
- [Products](#products)
  * [Retrieve a product](#retrieve-a-product)
  * [List all products](#list-all-products)
- [Promotions](#promotions)
  * [Retrieve a promotion](#retrieve-a-promotion)
  * [List all promotions](#list-all-promotions)
  * [Get by cart id](#get-by-cart-id)
- [Users](#users)
  * [Checking if a user is authenticated](#checking-if-a-user-is-authenticated)
  * [Authenticate a user](#authenticate-a-user)
  * [Authenticate with username and password](#authenticate-with-username-and-password)
  * [Authenticate with Facebook](#authenticate-with-facebook)
  * [Logout](#logout)
  * [Check login status](#check-login-status)
  * [Create a user](#create-a-user)
  * [Retrieve the currently authenticated user](#retrieve-the-currently-authenticated-user)
  * [Update a user](#update-a-user)
  * [Delete a user](#delete-a-user)
- [Variables](#variables)
  * [Retrieve a variable](#retrieve-a-variable)
  * [List all variables](#list-all-variables)


This is the documentation for the official Marketcloud Javascript SDK. It is a wrapper for our REST api and it makes it easier to use. This document provides an API reference for versions 2.0.0 and above of the SDK, we highly recommend to use the latest version of the SDK and before upgrading, please read the [changelog](https://github.com/Marketcloud/marketcloud-js/wiki/Note-for-Version-2.0.0).

## Introduction

If you haven't set up an application yet, please refer to the [Getting Started](https://www.marketcloud.it/documentation/rest-api/gettingstarted) section. You can also check out our API Reference for more detailed information about our SDK.

In Marketcloud, you create an App for each of your web/mobile applications. Each App has its own public key that you insert into your web app. Your account on Marketcloud can handle multiple Apps.



## Installation

You can get the javascript SDK from [Github](https://github.com/Marketcloud/marketcloud-js):

```
git clone https://github.com/Marketcloud/marketcloud-js.git
```

Or you can use NPM:

```
npm install marketcloud-js
```

Or you can use bower:

```
bower install marketcloud-js
```

At this point you can include the minified javascript file in your application

```
<script type="text/javascript" src="dist/marketcloud.min.js"></script>
```



## Authentication and security

Every application identifies itself to Marketcloud using a unique public key. Since you must ship the public key with your client application code, this key is **public**. The application security is guaranteed by the secret key, which you should never share with anyone. The only place where it should be safe to store and use the secret key is (in case you need it) your server side code.

```
//Create a new instance of the client
  var marketcloud = new Marketcloud.Client({
    public_key : 'your-apps-public-key'
  })

```

> **Note**
> By default, the SDK will have very limited write and read access. Most write operations will require user authentication. If the default user authorizations are not enough for your application (for example if you are building a Marketplace) you can create new user roles. [Learn more](#)

Some methods requires a user authorization token. This is because, for example, only logged users should be able to edit their profile informations, or review their orders and items in carts. Whenever a method requires authentication, you will see a  label.

In order to authenticate a user, use the [users.authenticate()](#users) method.



## Promises

Even if the examples in this reference use callbacks, starting with version 2.0.0 of the SDK, each endpoint method also returns a promise.

```
// This is ok
marketcloud.products.list({},function(err,response){
 console.log("My products:",response.data);
})

// Also this is ok
marketcloud.products.list({})
.then(function(response){
  console.log("My products:",response.data);
})
.catch(function(error){
  console.log("Something went wrong",error);
})

```

For using promises, the SDK needs Bluebird as a dependency. If you are installing this SDK with NPM or Bower, they will handle dependencies for you.



## Sorting

Whenever you are requesting a list of resources, using a `list(query,callback)` method, you can pass sorting parameters to the query object:

```

client.products.list({
  sort_by : "name",
  sort_order : "ASC"
})

```

`sort_by` is the name of the attribute you want to use for sorting and `sort_order` can have two values, `ASC` or `DESC`.

## Addresses



### Create an address

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| full_name  **Required**  | String | The full name of the resident |
| email  **Required**  | String | A valid email address |
| country  **Required**  | String | The country of the address |
| state | String | The state of the address |
| city  **Required**  | String | The city of the address |
| address1  **Required**  | String | The first address |
| address2 | String | Additional address space |
| postal_code  **Required**  | String | The postal code of the address |
| phone_number | String | The phone number for the address |
| alternate_phone_number | String | An alternate phone number for the address |



**Example request**

```

marketcloud.addresses.create(new_address,function(err,response){

})

```



### List all addresses

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Filter addresses by the customer's id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of addresses to retrieve per page |
| page | Number | The page number of addresses to display |



Retrieves a list of addresses filtered and sorted by the query object.

**Example request**

```

marketcloud.addresses.list(query,function(err){
  // Your code here
})

```



### Retrieve an address

Retrieves an address by its id.

**Example request**

```

marketcloud.addresses.getById(address_id,function(err,response){
  // Your code here
})

```



### Update an address

Updates a address by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| address_id  **Required**  | Number | The univocal address identifier |
| update_data  **Required**  | Object | An object containing the updates. See [addresses.create()](#addresses.create) for more informations. |



**Example request**

```

marketcloud.addresses.update(address_id,update_data,function(err,response){
  // Your code here
})

```



### Delete an address

Deletes a address by id.

**Example request**

```

marketcloud.addresses.delete(address_id,function(err){
  // Your code here
})

```

## Brands



### Retrieve a brand

```
//Retrieves a brand by its id
  marketcloud.brands.getById(brand_id, function(err,response){

});
```



### List all brands

Retrieves a list of Brands filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of brands to retrieve per page |
| page | Number | The page number of brands to display |



**Example request**

```
//Retrieves a list of Brands filtered and sorted by the query object
marketcloud.brands.list(query, function(err,response){
});
```

## Categories



### Retrieve a category

```
//Retrieves a category by its id
  marketcloud.categories.getById(category_id, function(err,response){

});
```



### List all categories

```
//Retrieves a list of categories filtered and sorted by the query object
  marketcloud.categories.list(query, function(err,response){
});
```

## Carts



### Create a cart

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| items  **Required**  | Array of Objects | The list of items, in the form `{product_id:1,quantity:10, [variant_id:1]}`, added on the cart |



A line item is an object with the following attributes



| Field | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The univocal product identifier |
| variant_id | Number | The univocal number identifying a product's variant. |
| quantity  **Required**  | Number | A _positive_ number that indicates how many units of the chosen product must be added to cart. |



Creates a new cart with a product in it.

**Example request**

```

  //Creates a new cart for the user with given email
  marketcloud.carts.create({
      items:[{'product_id':111,'quantity':1}]
  },function(err,response){

  });

```



### Retrieve a cart

**Example request**

```

marketcloud.carts.getById(cart_id,function(err,response){
  // Your code here
})

```



### Add items to cart

```

  //Add products to a cart identified by its id
  marketcloud.carts.add(cart_id,[{'product_id':5785,'quantity':2}],
  ,function(err,response){

  });

```



### Update cart contents

```

  marketcloud.carts.update(testCart.id,[
                      {'product_id':5712,'quantity':1},
                      {'product_id':5785,'quantity':1}
      ],function(err,response){

  })

```



### Add a coupon to the cart

```

  marketcloud.carts.addCoupon(testCart.id,"COUPON_CODE",function(err,response){

  })

```



### Remove cart contents

```

  marketcloud.carts.remove(testCart.id,[
                      {'product_id':5712},
                      {'product_id':5785}
      ],function(err,response){
          //Assuming that the cart had only 2 products,
          //It should be empty now

      })

```

If your store works with **variants**, you need to explicitly indicate which variant you want to add/remove/update .

```

  //Adds an item to the cart
  marketcloud.carts.add(cart_id,[{'product_id':5785,'quantity':2, 'variant_id' : 3}],
  ,function(err,response){

  });

  //Updates an item in the cart
  marketcloud.carts.update(cart_id,[{'product_id':5785,'quantity':1, 'variant_id' : 3}],
  ,function(err,response){

  });

  //Remove an item from the cart
  marketcloud.carts.remove(cart_id,[{'product_id':5785, 'variant_id' : 3}],
  ,function(err,response){

  });

```



## Collections



### Retrieve a collection

**Example request**

```
//Retrieves a collection by its id
marketcloud.collections.getById(123)
.then(function(response){

})
.catch(function(error){

})

```



### List all collections

Retrieves a list of Collections filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Integer | The number of collections to retrieve per page |
| page | Integer | The page number of collections to display |



**Example request**

```

marketcloud.collections.list({})
.then(function(response){

})
.catch(function(error){

})

```



## Contents



### Retrieve a content

```
//Retrieves a content by its id
  marketcloud.contents.getById(content_id, function(err,response){

});
```



### List contents

```
//Retrieves a paginated list of categories filtered and sorted by the query object
  marketcloud.contents.list(query, function(err,response){
});
```



## Coupons



### Retrieve a coupon

**Example request**

```
//Retrieves a coupon by its id
marketcloud.coupons.getById(123);

```



### List coupons

**Example request**

```
//Retrieves a paginated list of coupons
// in this example, we only look for active coupons
marketcloud.coupons.list({active : true});

```



## Orders



### List all orders



```

//Returns orders made by the currently authenticated user
marketcloud.orders.list(query,function(err,response){

})      

```



### Retrieve an order



```

  //Returns informations about an order made by the currently authenticated user
  marketcloud.orders.getById(id,function(err,response){
  });     

```



### Create an order

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| items | Array | An array of line items.This is required if the  is missing. |
| cart_id  **Required**  | Integer | The id of the cart that is going to be turned into an order. This is required if  is missing |
| state | String | The state of the order. Defaults to _created_ |
| shipping_address_id  **Required**  | Integer | The id of the shipping address |
| shipping_address | Object | A shipping address object. See Address for more informations. This is required if the  is missing. |
| billing_address_id  **Required**  | Integer | The id of the billing address |
| billing_address | Object | A sbilling address object. See Address for more informations. This is required if the  is missing. |
| user_id | Integer | The id of the user making the order |
| shipping_id | Integer | The id of the **shipping method** chosen for the order. Be careful, this is not the shipping address. |
| store_id | Integer | The id of the store receiving in the order |
| promotion_id | Number | The id of the promotion to apply. |
| coupon_code | String | The code of the coupon to apply. |



```

  //Returns informations about an order made by the currently authenticated user
  var the_order = {
    shipping_address : {
      // See address for more informations
    },
    billing_address : {
      // See address for more informations
    },
    cart_id : 0,
    payment_method_id : 123 //Optional payment method id
  }

```

Alternatively, instead of passing a cart_id you can pass a 'items' array containing line items. See cart for more informations.

```

  var the_order = {
    shipping_address : {
      // See address for more informations
    },
    billing_address : {
      // See address for more informations
    },
    items : [{product_id : 1, quantiyt: 1}]
  }
  marketcloud.orders.create(the_order,function(err,response){
  });     

```

## Payment methods

Payment methods are a way to describe how customers will pay the goods they are buying. We have some default payment methods which are integrated into the system such as Braintree and Stripe, but your store might want some custom methods, such as cash on delivery.

#### Usage with orders

In order to tell Marketcloud that an order is using a certain payment method, just create an order with a `payment_method_id` value. See [orders.create](#orders.create) for an example



### Retrieve a payment method

```
//Retrieves a payment method by its id
  marketcloud.paymentMethods.getById(payment_method_id, function(err,response){

});
```



### List all payment methods

```
//Retrieves a list of payment methods filtered and sorted by the query object
  marketcloud.paymentMethods.list(query, function(err,response){
});
```



## Payments

Marketcloud supports a certain number of payment methods. Most of them requires client side and server side configuration, we try to abstract the server side part, so you just have to configure client side scripts.

You can find the list of payment methods supported by Marketcloud in your application's dashboard under the **settings** > **payments** page. There you will also find a link to the documentation related to each payment method.

> **Info**
> In order to create payments using a payment method, you must enable and configure that method in your dashboard.



### Create a payment

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| method  **Required**  | String | A valid name of one of the supported payment methods. You can see a list of supported payment methods in Dashboard > settings > payments. |
| order_id | Integer | The id of the order related to this payment. |
|  | Mixed | Every payment method requires different additional parameters. Refer to the payment method documentation for more informations. |



**Example request**

```

// Braintree example
var payment = {
  method: 'Braintree',
  order_id: created_order.id,
  nonce: 'nonce-from-braintree.js'
};

marketcloud.payments.create(payment);

// Stripe example
var payment = {
  method: 'Stripe',
  order_id: created_order.id,
  source: 'value-from-stripe.js'
};

marketcloud.payments.create(payment);

// In both cases, nonce and source are obtained from Braintree
// and Stripe servers using their client side SDKs

```



## Products



### Retrieve a product

```
//Retrieves a product by its id
  marketcloud.products.getById(product_id, function(err,response){

});
```

**product** is in the following form:

```

  {
      "id": 1111,
      "name": "The lord of the rings",
      "sku": "TLOTR",
      "price": 15.50,
      "description": "A brief description of this fantastic book.",
      "published": true,
      "stock_level": 30,
      "stock_type": "track",
      "stock_status": null
  }

```

Products can also have custom attributes! :

```

  {
      "id": 13687,
      "name": "A song of fire and ice: A feast for crows",
      "sku": "ASOFAI_AFFC",
      "price": 7.79,
      "description": "A brief description of this fantastic book.",
      "published": true,
      "stock_level": 30,
      "stock_type": "track",
      "stock_status": null,
      "author": "George R. R. Martin",
      "isbn-10": "055358202X",
      "isbn-13": "978-0553582024",
      "pages": 1060,
      "editor": "Bantam Books",
      "genre": "Fantasy",
      "cover": "Paperback",
      "publication_year": "2001"
    }

```

Note that starting from author, the remaining fields are custom attributes defined when the product was created.



### List all products

Retrieves a list of products filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| q | String | Filter results performing a text research on your products. |
| price_gt | Number | Display only products that cost more than the specified value. |
| price_lt | Number | Display only products that cost less than the specified value. |
| category | String | Display only products that belongs to the specified category path or to a sub category. For example, `?category=/shoes` matches all producs in categories /shoes, /shoes/running /shoes/classic and other subcategories of "shoes" |
| `` | Mixed | Filter products by any custom field. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



**Example request**

```
//Retrieves a list of products filtered and sorted by the query object
  marketcloud.products.list(query, function(err,response){
})
```

The query parameter is an object and you can use it to filter your products.

```
var query = {
    category_id : 5,
    price_lt:50
  }

```

The previous example queries the api for products that belongs to the category with id equal to 5 and that cost less than 50

## Promotions



### Retrieve a promotion

```
//Retrieves a promotion by its id
  marketcloud.categories.getById(category_id, function(err,response){

});
```



### List all promotions

```
//Retrieves a list of promotions filtered and sorted by the query object
  marketcloud.promotions.list(query, function(err,response){
});
```



### Get by cart id

```
//Retrieves a list of promotions eligible for a specific cart
  marketcloud.promotions.getByCart(cart_id, function(err,response){
});
```

## Users

### Checking if a user is authenticated

Whenever you create a new instance of the client (at pageloads for example), it immediatly looks for a user token in the current environment (the browser). If the client find user information, it populates the value `client.token`.

If you want to check if the current user already has an auth token:

```

var client = new Marketcloud.Client({publicKey : '...'});
if (client.token) {
  // Then the user is authenticated and its data is in
  console.log(client.currentUser);
} else {
  // User not authenticated, prompt the user for username and password
}

```



### Authenticate a user

### Authenticate with username and password

Authenticates a user with email and password. Under the hood, the marketcloud api tests the user credentials and if they are valid, a token is received from the API and stored in the user's browser.

```

marketcloud.users.authenticate('john.snow@wall.com','IKnowNothing',
  function(err,response){
    //data.user contains user data
})      

```

If the authentication is successful, `data` is an object:

```
{
  user : {
    email : "john.doe@example.com",
    full_name : "John Doe",
    custom_attribute : "Some Value"
  },
  token : "SECRET_TOKEN"
}

```

### Authenticate with Facebook

Authenticates a user using Facebook login. Please, note that using this authentication strategy requires a couple more setup steps on the Facebook side. We have a [dedicated guide](https://www.marketcloud.it/documentation/guides/facebook-login) to help you get started with Facebook and Marketcloud.

```

marketcloud.users.authenticateWithFacebook(user_id,access_token,
  function(err,response){
    //data.user contains user data
})      

```

The data object is the same as in the authenticate() method.



### Logout

This method will log the user out, forgetting the auth token and the current cart's id

```

marketcloud.users.logout();     

```



### Check login status

This method will return true if there is a local auth token. False otherwise.

```
var isLogged = marketcloud.users.isAuthenticated();

```



### Create a user

Use this method to register users to you eCommerce app.

```

  //Authenticates a user given email and password
  marketcloud.users.create({
                    name: "John Snow",
                    email: "john.snow@thewall.com",
                    password : "IknowKnothing"
              },function(err,response){
  })      

```



### Retrieve the currently authenticated user



```

//Returns complete informations about the currently authenticated user
marketcloud.users.getCurrent(function(err,response){

})      

```



### Update a user



```

//Update the information about the currently authenticated user
marketcloud.users.updateCurrent({email : 'newaddress@example.com'},function(err,response){

})      

```



### Delete a user



```

  //Delete the currently authenticated user
  marketcloud.users.delete(function(err){
  })      

```

## Variables



### Retrieve a variable

```
//Retrieves a variable by its id
  marketcloud.variables.getById(variable_id, function(err,response){

});
```



### List all variables

```
//Retrieves a list of variables filtered and sorted by the query object
  marketcloud.variables.list(query, function(err,response){
});
```
