var uuid = require("node-uuid");

var command = function(playerid, coord, tstamp, targetSelf) {
	this.id = uuid.v4();
	this.playerid = playerid;
	this.coord = coord;
	this.tstamp = tstamp;
	this.targetSelf = typeof targetSelf !== 'undefined' ? targetSelf : false;
};

module.exports = command;
