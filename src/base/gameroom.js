var uuid = require("node-uuid");

var gameroom = function(initTimestamp, endTimestamp, player1, player2, passphrase) {
	this.id = uuid.v4();
	this.initTimestamp = initTimestamp;
	this.endTimestamp = endTimestamp;
	this.player1 = player1;
	this.player2 = player2;
	this.passphrase = passphrase;
}

module.exports = gameroom;
