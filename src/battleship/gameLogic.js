var GamePiece = require("./models/gamePiece.js");
var Tuple = require("tuple-w");

var gameLogic = {};

gameLogic.determinePlayersBoardView = function(playersBoard, opponentAttempts) {
  this.validateArrays(playersBoard, opponentAttempts);
	return playersBoard.map(function(x, i) {
		return x.map(function(y, j) {
			if(opponentAttempts[i][j].state) {
				return new GamePiece(new Tuple(i, j), y.state ? true : null);
			}
			else {
				return new GamePiece(new Tuple(i, j), y.state ? false : null);
			}
		});
	});
};

gameLogic.determineHitView = function(opponentsBoard, playersAttempts) {
  this.validateArrays(opponentsBoard, playersAttempts);
	return opponentsBoard.map(function(x, i) {
		return x.map(function(y, j) {
			if(playersAttempts[i][j].state) {
				return new GamePiece(new Tuple(i, j), y.state ? true : false);
			}
			else {
				return new GamePiece(new Tuple(i, j), null);
			}
		});
	});
};

gameLogic.validateArrays = function(array1, array2) {
  if(array1 === null || array2 === null) {
    throw new Error("Neither input can be null");
  }
  if(array1.length !== array2.length || array1.filter(function(x, i) { return x.length !== array2[i].length; }).length > 0) {
    throw new Error("Array sizes mismatched");
  }
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

module.exports = gameLogic;
