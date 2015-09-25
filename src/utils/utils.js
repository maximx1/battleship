var utils = {};

utils.init2DArray = function(dimension, initValue) {
	return Array.apply(null, Array(dimension)).map(function(x) {
		return Array.apply(null, Array(dimension)).map(function(_) {return initValue;});
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

module.exports = utils;
