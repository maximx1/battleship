var uuid = require("node-uuid");

var command = function(playerid, coord, tstamp, targetSelf) {
	this.id = uuid.v4();
	this.playerid = playerid;
	this.targetSelf = typeof targetSelf !== 'undefined' ? targetSelf : false;
	this.coord = coord;
	this.tstamp = tstamp;
	this.isAHit = false;
};

module.exports = command;
