var utils = require("../utils/utils.js");
var GameLogic = require("./gameLogic.js");
var Tuple = require("tuple-w");

var player = function(id, name) {
	this.id = id;
	this.name = name;
	this.board = utils.init2DArray(10, false);
	this.hitAttempts = utils.init2DArray(10, false);
};

player.prototype.determineHit = function(coord) {
	var _board = this.board;
	return coord.unpack(function(x, y) {
		if(x < 0 || x > _board.length || y < 0 || y > _board.length) {
			return null;
		}

		return _board[x][y];
	});
};

player.prototype.determineSelfBoardView = function(opponentAttempts) {
	return GameLogic.determinePlayersBoardView(this.board, opponentAttempts);
};

module.exports = player;
