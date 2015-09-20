var Gameroom = require("../../src/base/gameroom.js");
var Player = require("../../src/battleship/player.js");
//var Command = require("../../src/battleship/command.js");

describe("Gameroom", function() {
	describe("object", function() {
		it("should generate a unique id upon generation", function() {
			var gameroom1 = new Gameroom(null, null, null, null, null);
			var gameroom2 = new Gameroom(null, null, null, null, null);
			expect(gameroom1.id).to.not.equal(gameroom2.id);
		});
	});

	describe("#bumpTurn()", function() {
		it("should go from player 1 to player 2", function() {
			var gameroom = new Gameroom(null, null, null, null, null);
			expect(gameroom.isPlayerOnesTurn).to.equal(true);
			gameroom.bumpTurn();
			expect(gameroom.isPlayerOnesTurn).to.equal(false);
		});

		it("should go from player 2 to player 1", function() {
			var gameroom = new Gameroom(null, null, null, null, null);
			gameroom.bumpTurn();
			expect(gameroom.isPlayerOnesTurn).to.equal(false);
			gameroom.bumpTurn();
			expect(gameroom.isPlayerOnesTurn).to.equal(true);
		});
	});

	describe("#determineAffectedPlayer()", function() {
		it("should return player 1 if player 1's turn and target is self", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var targetSelf = true;

			expect(gameroom.determineAffectedPlayer(targetSelf)).to.equal(player1);
		});
		it("should return player 2 if player 1's turn and target is opponent", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var targetSelf = false;

			expect(gameroom.determineAffectedPlayer(targetSelf)).to.equal(player2);
		});
		it("should return player 2 if player 2's turn and target is self", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var targetSelf = true;

			gameroom.bumpTurn();
			expect(gameroom.determineAffectedPlayer(targetSelf)).to.equal(player2);
		});
		it("should return player 1 if player 2's turn and target is opponent", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var targetSelf = false;

			gameroom.bumpTurn();
			expect(gameroom.determineAffectedPlayer(targetSelf)).to.equal(player1);
		});
	});
});
