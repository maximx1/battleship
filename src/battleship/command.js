var command = function(id, x, y, tstamp, initiated) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.initiated = initiated;
}

module.exports = command;
