var Player = require("../../src/battleship/player.js");
var Tuple = require("tuple-w");

describe("Player", function() {
	describe("#determineHit()", function() {
		it("should return true if the passed in coordinates make contact", function() {
			var player = new Player(1, "timmay");
			player.board[1][4] = true;
			expect(player.determineHit(new Tuple(1, 4))).to.equal(true);
		});

		it("should return false if the passed in coordinates miss the target", function() {
			var player = new Player(1, "timmay");
			expect(player.determineHit(new Tuple(1, 4))).to.equal(false);
		});

		it("should return null should the coordinates be out of bounds", function() {
			var player = new Player(1, "timmay");

			expect(player.determineHit(new Tuple(-1, -1))).to.equal(null);
		});
	});
});
