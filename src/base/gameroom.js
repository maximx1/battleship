var uuid = require("node-uuid");
var CommandHistory = require("./commandhistory.js");

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

	var result = affectedPlayer.determineHit(command.coord);
	if(result !== null) {
		command.coord.unpack(function(x, y) {
			initiatingPlayer.hitAttempts[x][y] = true;
		});
		this.bumpTurn();
	}
	return result;
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
