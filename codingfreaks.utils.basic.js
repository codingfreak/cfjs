var cf = window.cf || {};

/**
 * Contains utility functions useful in many cases.
 */
cf.BasicUtil = function() {};

/**
 * Is thrown when an operation-parameter is invalid.
 */
cf.InvalidArgumentException = function(message) {
	this.Message = message;
	this.Name = "InvalidArgumentException";	
};

/**
 * Is thrown when an operation can not perform correctly as it is called.
 */
cf.InvalidOperationException = function(message) {
	this.Message = message;
	this.Name = "InvalidOperationException";	
};

/**
* Retrieves the value for an URL parameter.
* @param {string} parameterName - The name of the parameter in the URL. 
* @param {bool} throwOnError - If set to true this method will throw an exception if the URL doesnt contain the parameter.  
* @returns {string} The value of the parameter or false if the parameter is not found.
*/
cf.BasicUtil.getUrlParameter = function(parameterName, throwOnError) {
	var pageUrl = decodeURIComponent(window.location.search.substring(1));
	var urlVariables = pageUrl.split('&');
	var paramName = [];
	for (var i = 0; i < urlVariables.length; i++) {
		paramName = urlVariables[i].split('=');
		if (paramName[0] === parameterName) {
			return paramName[1] === undefined ? true : paramName[1];
		}
	}
	if (throwOnError) {
		throw new cf.InvalidOperationException("Parameter not found.");	
	}
	return false;
};

/**
 * Checks, if a given value is undefined.
 * @param {object} original - The value to check. 
 * @returns {bool} True if the value is undefined otherwise <c>false</c>.
 */
cf.BasicUtil.isUndefined = function(original) { 
	return typeof(original) === 'undefined';
};

/**
 * Checks, if a given value is defined.
 * @param {object} original - The value to check. 
 * @returns {bool} True if the value is defined otherwise <c>false</c>.
 */
cf.BasicUtil.isDefined = function(original) { 
	return !this.isUndefined(original);
};

/**
 * Retrieves the value of the original or '' if it is undefined or null.
 * @param {string} original - The value to transform.
 * @param {bool} throwOnTypeMismatch - If set to true this method will throw an exception if the original is something else than undefined, null or string.  
 * @returns {string} The original value or '' if it is not string with at least one char.
 */
cf.BasicUtil.clearNullAsString = function(original, throwOnTypeMismatch) {        
	if (!this.isUndefined(original) && original !== null)
	{
		if (throwOnTypeMismatch && typeof(original) !== 'string') {
			throw new cf.InvalidArgumentException("Original is not a string.");
		}
		return original;
	}
	return '';
}