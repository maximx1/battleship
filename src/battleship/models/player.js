var utils = require("../../utils/utils.js");
var pieceGen = require("../gameroom.js").pieceGen;
var initGen = utils.initGen;

var player = function(id, name) {
	this.id = id;
	this.name = name;
	this.board = utils.init2DArray(10, pieceGen);
	this.hitAttempts = utils.init2DArray(10, pieceGen);
};

module.exports = player;
