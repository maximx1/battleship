var uuid = require("node-uuid");
var CommandHistory = require("./commandhistory.js");

var gameroom = function(initTimestamp, endTimestamp, player1, player2, passphrase) {
	this.id = uuid.v4();
	this.initTimestamp = initTimestamp;
	this.endTimestamp = endTimestamp;
	this.player1 = player1;
	this.player2 = player2;
	this.isPlayerOnesTurn = true;
	this.passphrase = passphrase;
	this.commandHistory = new CommandHistory();
};

gameroom.prototype.gameLength = function() {
	return this.endTimestamp - this.initTimeStamp;
};

gameroom.prototype.commitNewCommand = function(command) {
	var initiatingPlayer = (this.isPlayerOnesTurn) ? this.player1 : this.player2;
	var affectedPlayer = this.determineAffectedPlayer(command.targetSelf);
	return this.commandHistory.addCommand(command, initiatingPlayer, affectedPlayer);
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
