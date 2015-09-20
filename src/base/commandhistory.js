var commandhistory = function() {};

commandhistory.prototype.addCommand = function(command) {
	this.isPlayerOnesTurn = true;
};

module.exports = commandhistory;
