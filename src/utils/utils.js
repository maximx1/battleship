var crypto = require("crypto");

var utils = {};

utils.initGen = function(value) {
	return function() {
		return value;
	};
};

utils.init2DArray = function(dimension, initValueGenerator) {
	return Array.apply(null, Array(dimension)).map(function(x, i) {
		return Array.apply(null, Array(dimension)).map(function(_, j) {return initValueGenerator(i, j);});
	});
};

utils.range = function(length) {
	return Array.apply(null, Array(length)).map(function(_, i) {return i;});
};

utils.getArrayElementByCoord = function(arr, coord) {
	return (coord === null) ? null : coord.unpack(function(x, y) {
		if(arr === null || x < 0 || x > arr.length || y < 0 || y > arr.length) {
			return null;
		}
		return arr[x][y];
	});
};

utils.generateRandomString = function(n) {
	if(n < 0) {
		return "";
	}
	return crypto.randomBytes(n).toString('hex').substr(0, n);
};

module.exports = utils;
