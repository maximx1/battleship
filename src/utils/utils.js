var utils = {};

utils.init2DArray = function(dimension, initValue) {
	return Array.apply(null, Array(dimension)).map(function(x) {
		return Array.apply(null, Array(dimension)).map(function(_) {return initValue;});
	});
};

utils.range = function(length) {
	return Array.apply(null, Array(length)).map(function(_, i) {return i;});
};

module.exports = utils;
