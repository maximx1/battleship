var uuid = require("node-uuid");
var Tuple = require("tuple-w");
var GameLogic = require("./gameLogic.js");
var ResponsePayload = require("./models/responsePayload.js");
var utils = require("../utils/utils.js");

var gameroom = function(initTimestamp, endTimestamp, player1, player2, passphrase) {
	this.id = uuid.v4();
	this.initTimestamp = initTimestamp;
	this.endTimestamp = endTimestamp;
	this.player1 = player1;
	this.player2 = player2;
	this.isPlayerOnesTurn = true;
	this.isGameStarted = false;
	this.passphrase = passphrase;
	this.commandHistory = [];
};

gameroom.prototype.gameLength = function() {
	return (this.endTimestamp === null) ? -1 : (this.endTimestamp - this.initTimestamp);
};

gameroom.prototype.commitNewCommand = function(command) {
	var initiatingPlayer = (this.isPlayerOnesTurn) ? this.player1 : this.player2;
	var affectedPlayer = this.determineAffectedPlayer(command.targetSelf);
	this.commandHistory.push(command);

	var result = utils.getArrayElementByCoord(affectedPlayer.board, command.coord);
	if(result !== null) {
		command.coord.unpack(function(x, y) {
			initiatingPlayer.hitAttempts[x][y] = true;
		});
		this.bumpTurn();
	}
	return result;
};

gameroom.prototype.buildGameStateResponse = function(player1, player2, wasSuccessfulHit) {
	var player1View = new ResponsePayload(
		GameLogic.determinePlayersBoardView(player1.board, player2.hitAttempts),
		GameLogic.determineHitView(player2.board, player1.hitAttempts),
		wasSuccessfulHit
	);
	var player2View = new ResponsePayload(
		GameLogic.determinePlayersBoardView(this.player2.board, this.player1.hitAttempts),
		GameLogic.determineHitView(this.player1.board, this.player2.hitAttempts),
		wasSuccessfulHit
	);
	return new Tuple(player1View, player2View);
};

gameroom.prototype.determineAffectedPlayer = function(isTargetSelf) {
	if(this.isPlayerOnesTurn) {
		return (isTargetSelf) ? this.player1 : this.player2;
	}
	else {
		return (isTargetSelf) ? this.player2 : this.player1;
	}
};

gameroom.prototype.bumpTurn = function() {
	this.isPlayerOnesTurn = !this.isPlayerOnesTurn;
};

module.exports = gameroom;
