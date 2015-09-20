var utils = require("../../src/utils/utils.js");
var Tuple = require("tuple-w");

var player = function(id, name) {
	this.id = id;
	this.name = name;
	this.board = utils.init2DArray(10, false);
	this.hitAttempts = utils.init2DArray(10, false);
};

player.prototype.recieveAttemptedHit = function(coord) {
	var _board = this.board;
	return coord.unpack(function(x, y) {
		if(x < 0 || x > _board.length || y < 0 || y > _board.length) {
			return null;
		}

		return _board[x][y];
	});
};

player.prototype.determineSelfBoardView = function(opponentAttempts) {
	return this.board.map(function(x, i) {
		return x.map(function(y, j) {
			if(opponentAttempts[i][j]) {
				return y ? true : null;
			}
			else {
				return y ? false : null;
			}
		});
	});
};

player.prototype.determineOpponentView = function(opponentAttempts) {
	return this.board.map(function(x, i) {
		return x.map(function(y, j) {
			if(opponentAttempts[i][j]) {
				return y ? true : false;
			}
			else {
				return null;
			}
		});
	});
};

/*

opponentAttempt, board
true, true = true -> opponentAttempt landed, vessel present
true, false = null -> opponentAttempt missed, no vessel present
false, true = false -> opponentAttempt not made, vessel present
false, false = null -> opponentAttempt not made, no vessel present
true = red
false = black
null = white

hitAttempt, opponent's board
true, true = true -> torpedo landed, vessel present
true, false = false -> torpedo missed, vessel wasn't present
false, true = null -> no torpedo sent, vessel present
false, false = null -> no torpedo sent, no vessel present
true = green
false = red
null = white

*/


module.exports = player;
