var Player = require("../../src/battleship/player.js");
var Tuple = require("tuple-w");

describe("Player", function() {
	describe("#determineHit()", function() {
		it("should return true if the passed in coordinate hit", function() {
			var player = new Player(1, "timmay");
			player.board[1][4] = true;

			expect(player.recieveAttemptedHit(new Tuple(1, 4))).to.equal(true);
		});

		it("should return null should the coordinates be out of bounds", function() {
			var player = new Player(1, "timmay");

			expect(player.recieveAttemptedHit(new Tuple(-1, -1))).to.equal(null);
		});
	});

	describe("#determineSelfBoardView()", function() {
		it("should return an array of player's side. True for hit, false for no hit, and null for water", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");

			player1.board = [
				[false, true, true, true, false, false, false, false, false, false],
				[false, true, true, true, true, true, false, false, false, false],
				[false, true, false, true, false, false, false, false, false, false],
				[false, true, false, true, false, false, false, false, false, false],
				[false, true, false, true, true, true, false, false, false, false],
				[false, true, false, true, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false]
			];

			player2.hitAttempts = [
				[false, false, false, false, false, false, false, false, false, false],
				[true, false, true, true, true, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, true, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, true, false, false],
				[false, false, false, false, false, false, false, false, true, false],
				[false, false, false, false, false, false, false, false, false, true]
			];

			var expected = [
				[null, false, false, false, null, null, null, null, null, null],
				[null, false, true, true, true, false, null, null, null, null],
				[null, false, null, false, null, null, null, null, null, null],
				[null, true, null, false, null, null, null, null, null, null],
				[null, false, null, false, false, false, null, null, null, null],
				[null, false, null, false, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null]
			];
			expect(player1.determineSelfBoardView(player2.hitAttempts)).to.deep.equal(expected);
		});
	});

	describe("#determineOpponentView()", function() {
		it("should return an array of player's side. True for hit, false for miss, and null for available attempts", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");

			player1.hitAttempts = [
				[false, false, false, false, false, false, false, false, false, false],
				[false, true, false, false, false, true, false, false, false, false],
				[false, true, false, false, false, false, false, false, false, false],
				[false, false, true, true, true, true, true, false, false, false],
				[false, true, false, false, false, false, true, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false]
			];

			player2.board = [
				[false, true, false, true, true, true, true, false, false, false],
				[true, true, true, true, true, false, false, false, false, false],
				[false, true, false, false, false, false, false, false, false, false],
				[false, true, false, false, false, true, true, false, false, false],
				[false, true, false, true, true, true, false, false, false, false],
				[true, true, true, true, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false]
			];

			var expected = [
				[null, null, null, null, null, null, null, null, null, null],
				[null, true, null, null, null, false, null, null, null, null],
				[null, true, null, null, null, null, null, null, null, null],
				[null, null, false, false, false, true, true, null, null, null],
				[null, true, null, null, null, null, false, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null]
			];
			expect(player2.determineOpponentView(player1.hitAttempts)).to.deep.equal(expected);
		});
	});
});
