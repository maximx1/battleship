var utils = require("../../utils/utils.js");
var initGen = utils.initGen;

var player = function(id, name) {
	this.id = id;
	this.name = name;
	this.board = utils.init2DArray(10, initGen(false));
	this.hitAttempts = utils.init2DArray(10, initGen(false));
};

module.exports = player;
