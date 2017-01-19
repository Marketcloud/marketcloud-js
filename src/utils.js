'use strict'

var mod = {};


/**
*
*	@param functionToCheck {Mixed} The test object
*	
*	@return {Boolean} Returns true if the parameter is a function
**/
mod.isFunction = function(functionToCheck) {
 	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/*

*/
mod.canIUsePromises = function() {
	return (typeof Promise !== "undefined" && 
			Promise.toString().indexOf("[native code]") !== -1)
}



mod.uniqueValues = function(array){

	var unique = {};
	var distinct = [];
	for( var i in array ){
	 if( typeof(unique[array[i]]) == "undefined"){
	  distinct.push(array[i]);
	 }
	 unique[array[i]] = 0;
	}

	return distinct;

}

/*

*/
mod.getVariantValues = function(variant_name,product) {

	if (product.type !== 'product_with_variants'){
		return [];
	}

	var variant_values = product.variants.map((v) => {
		return v[variant_name];
	});

	return mod.uniqueValues(variant_values);


}

mod.variantExists = function(options,product) {
	return product.variants.some((v) => {

		var allOptionsMatch = true;

		for (var option_name in options) {
			if (options[option_name] !== v[option_name])
				allOptionsMatch = false;
		}

		return allOptionsMatch;
	})
}

/*
	@param {Object} options Object containing product variants
	@param {Object} product The produ
	@return Boolean

	Returns true if the variant exists and is available
*/
mod.variantIsAvailable = function(options,product) {


	if (product.type !== 'product_with_variants')
		return false;

	return product.variants.some((v) => {

		var allOptionsMatch = true,
			isAvailable = false;

		for (var option_name in options) {
			if (options[option_name] !== v[option_name])
				allOptionsMatch = false;
		}

		if (allOptionsMatch) {
			// If its the variant we are looking for
			//We must check for the invetory

			if (v.stock_type === 'track' && v.stock_level > 0)
					isAvailable = true;
			
			if (v.stock_type === 'status' && v.stock_status === 'in_stock')
				isAvailable = true;

			if (stock_type === 'infinite')
				isAvailable = true;

		}

		return allOptionsMatch && isAvailable;
	})
}



mod.base64EncodeFileInput = function(selector,callback) {

	// The input
	var input = document.querySelector(selector);

	// The file to convert
	var file = input.files[0];

	// The FileReader instance
	var reader = new FileReader();

	reader.addEventListener("load", function () {
		callback(reader.result);
	  }, false);

	if (file)
		reader.readAsDataURL(file);
}


export default mod;