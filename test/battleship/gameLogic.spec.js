var GameLogic =  require("../../src/battleship/gameLogic.js");
var utils = require("../../src/utils/utils.js");

describe("GameLogic", function() {
  describe("#determinePlayersBoardView()", function() {
    it("should return an array of player's side. True for hit, false for no hit, and null for water", function() {
      var playersBoard = [[false, true], [false, true]];
      var opponentsHitAttempts = [[false, true], [true, false]];
      var expected = [[null, true], [null, false]];

			expect(GameLogic.determinePlayersBoardView(playersBoard, opponentsHitAttempts)).to.deep.equal(expected);
		});

    it("should throw an error if either of the inputs are null", function() {
      var playerBoard = [[false, false], [false, false]];
      var opponentsHitAttempts = [[false, false], [false, false]];

      expect(GameLogic.determinePlayersBoardView.bind(null, playerBoard, null)).to.throw(Error);
      expect(GameLogic.determinePlayersBoardView.bind(null, null, opponentsHitAttempts)).to.throw(Error);
    });
  });

  describe("#determineHitView()", function() {
    it("should return an array of the opponents side. True for hit, false for miss, and null for available attempts", function() {
      var playerHitAttempts = [[true, false], [false, true]];
      var opponentsBoard = [[false, true], [true, true]];
      var expected = [[false, null], [null, true]];

      expect(GameLogic.determineHitView(opponentsBoard, playerHitAttempts)).to.deep.equal(expected);
    });

    it("should throw an error if either of the inputs are null", function() {
      var opponentsBoard = [[false, false], [false, false]];
      var playerHitAttempts = [[false, false], [false, false]];

      expect(GameLogic.determineHitView.bind(null, opponentsBoard, null)).to.throw(Error);
      expect(GameLogic.determineHitView.bind(null, null, playerHitAttempts)).to.throw(Error);
    });
  });

  describe("#validateArrays()", function() {
    it("should not throw an error if inputs aren't null, the arrays are the same length, and the elements all match size", function() {
      var array1 = [[0], [1]];
      var array2 = [[1], [0]];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.not.throw(Error);
    });

    it("should throw an error if either of the inputs are null", function() {
      var array1 = [[0], [1]];
      var array2 = [[1], [0]];

      expect(GameLogic.validateArrays.bind(null, array1, null)).to.throw(Error);
      expect(GameLogic.validateArrays.bind(null, null, array2)).to.throw(Error);
    });

    it("should throw an error if either of the input arrays don't match in size", function() {
      var array1 = [[0], [1]];
      var array2 = [1];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.throw(Error);
    });

    it("should throw an error if either of the input array's elements don't match in size", function() {
      var array1 = [[0], [1]];
      var array2 = [[1], [0, 0]];

      expect(GameLogic.validateArrays.bind(null, array1, array2)).to.throw(Error);
    });
  });
});
