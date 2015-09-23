var Gameroom = require("../../src/base/gameroom.js");
var Player = require("../../src/battleship/player.js");
var Command = require("../../src/battleship/command.js");
var Tuple = require("tuple-w");

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

	describe("#gameLength()", function() {
		it("should return the length of time from start to end", function() {
			var gameroom = new Gameroom(0, 10000, null, null, null);
			expect(gameroom.gameLength()).to.equal(10000);
		});

		it("should return -1 if the game isn't over", function() {
			var gameroom = new Gameroom(0, null, null, null, null);

			expect(gameroom.gameLength()).to.equal(-1);
		});
	});

	describe("#commitNewCommand()", function() {
		it("should store the hit attempt in player 1 and return true if the hit was a success", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player2.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(1, new Tuple(0, 1), 0, false);

			expect(gameroom.commitNewCommand(command)).to.equal(true);
		});

		it("should store the hit attempt in player 1 and return false if the hit was a miss", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player2.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(1, new Tuple(0, 0), 0, false);

			expect(gameroom.commitNewCommand(command)).to.equal(false);
		});

		it("should store the hit attempt in player 2 and return true if the hit was a success", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player1.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(2, new Tuple(0, 1), 0, false);
			gameroom.bumpTurn();

			expect(gameroom.commitNewCommand(command)).to.equal(true);
		});

		it("should store the hit attempt in player 2 and return false if the hit was a miss", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player1.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(2, new Tuple(0, 0), 0, false);
			gameroom.bumpTurn();

			expect(gameroom.commitNewCommand(command)).to.equal(false);
		});

		it("should bump the turn if the attempt is a valid hit(in bounds)", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player2.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(1, new Tuple(0, 1), 0, false);

			gameroom.commitNewCommand(command);

			expect(gameroom.isPlayerOnesTurn).to.equal(false);
		});

		it("should not bump the turn if the attempt was out of bounds", function() {
			var player1 = new Player(1, "timmay");
			var player2 = new Player(2, "yammit");
			player2.board = sampleBoard;
			var gameroom = new Gameroom(null, null, player1, player2, null);
			var command = new Command(1, new Tuple(-1, -1), 0, false);

			gameroom.commitNewCommand(command);

			expect(gameroom.isPlayerOnesTurn).to.equal(true);
		});
	});
});

var sampleBoard = [
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
