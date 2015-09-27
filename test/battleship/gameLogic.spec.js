var GameLogic =  require("../../src/battleship/gameLogic.js");
var utils = require("../../src/utils/utils.js");
var GamePiece = require("../../src/battleship/models/gamePiece.js");
var Tuple = require("tuple-w");

var bgp = function(x, y, value) {
	return new GamePiece(new Tuple(x, y), value);
};

describe("GameLogic", function() {
  describe("#determinePlayersBoardView()", function() {
    it("should return an array of player's side. True for hit, false for no hit, and null for water", function() {
      var playersBoard = [[bgp(0, 0, false), bgp(0, 1, true)], [bgp(1, 0, false), bgp(1, 1, true)]];
      var opponentsHitAttempts = [[bgp(0, 0, false), bgp(0, 1, true)], [bgp(1, 0, true), bgp(1, 1, false)]];
      var expected = [[bgp(0, 0, null), bgp(0, 1, true)], [bgp(1, 0, null), bgp(1, 1, false)]];

			expect(GameLogic.determinePlayersBoardView(playersBoard, opponentsHitAttempts)).to.deep.equal(expected);
		});

    it("should throw an error if either of the inputs are null", function() {
      var playerBoard = [[bgp(0, 0, false), bgp(0, 1, false)], [bgp(1, 0, false), bgp(1, 1, false)]];
      var opponentsHitAttempts = [[bgp(0, 0, false), bgp(0, 1, false)], [bgp(1, 0, false), bgp(1, 1, false)]];

      expect(GameLogic.determinePlayersBoardView.bind(null, playerBoard, null)).to.throw(Error);
      expect(GameLogic.determinePlayersBoardView.bind(null, null, opponentsHitAttempts)).to.throw(Error);
    });
  });

  describe("#determineHitView()", function() {
    it("should return an array of the opponents side. True for hit, false for miss, and null for available attempts", function() {
      var playerHitAttempts = [[bgp(0, 0, true), bgp(0, 1, false)], [bgp(1, 0, false), bgp(1, 1, true)]];
      var opponentsBoard = [[bgp(0, 0, false), bgp(0, 1, true)], [bgp(1, 0, true), bgp(1, 1, true)]];
      var expected = [[bgp(0, 0, false), bgp(0, 1, null)], [bgp(1, 0, null), bgp(1, 1, true)]];

      expect(GameLogic.determineHitView(opponentsBoard, playerHitAttempts)).to.deep.equal(expected);
    });

    it("should throw an error if either of the inputs are null", function() {
      var opponentsBoard = [[bgp(0, 0, false), bgp(0, 1, false)], [bgp(1, 0, false), bgp(1, 1, false)]];
      var playerHitAttempts = [[bgp(0, 0, false), bgp(0, 1, false)], [bgp(1, 0, false), bgp(1, 1, false)]];

      expect(GameLogic.determineHitView.bind(null, opponentsBoard, null)).to.throw(Error);
      expect(GameLogic.determineHitView.bind(null, null, playerHitAttempts)).to.throw(Error);
    });
  });

  describe("#validateArrays()", function() {
    it("should not throw an error if inputs aren't null, the arrays are the same length, and the elements all match size", function() {
      var array1 = [[bgp(0, 0, 0)], [bgp(1, 0, 1)]];
      var array2 = [[bgp(0, 0, 1)], [bgp(1, 0, 0)]];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.not.throw(Error);
    });

    it("should throw an error if either of the inputs are null", function() {
      var array1 = [[bgp(0, 0, 0)], [bgp(1, 0, 1)]];
      var array2 = [[bgp(0, 0, 1)], [bgp(1, 0, 0)]];

      expect(GameLogic.validateArrays.bind(null, array1, null)).to.throw(Error);
      expect(GameLogic.validateArrays.bind(null, null, array2)).to.throw(Error);
    });

    it("should throw an error if either of the input arrays don't match in size", function() {
      var array1 = [[bgp(0, 0, 0)], [bgp(1, 0, 1)]];
      var array2 = [bgp(0, 0, 1)];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.throw(Error);
    });

    it("should throw an error if either of the input array's elements don't match in size", function() {
      var array1 = [[bgp(0, 0, 0)], [bgp(1, 0, 1)]];
      var array2 = [[bgp(0, 0, 1)], [bgp(1, 0, 0), bgp(1, 1, 0)]];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.throw(Error);
    });
  });
});
