var utils = require("../../utils/utils.js");

var player = function(id, name) {
	this.id = id;
	this.name = name;
	this.board = utils.init2DArray(10, false);
	this.hitAttempts = utils.init2DArray(10, false);
};

module.exports = player;
