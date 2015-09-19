var gameroom = require("../../src/base/gameroom.js");
var expect = require("chai").expect;

describe("Gameroom", function() {
	describe("object", function() {
		it("should generate a unique id upon generation", function() {
			var gameroom1 = new gameroom(null, null, null, null, null);
			var gameroom2 = new gameroom(null, null, null, null, null);
			expect(gameroom1.id).to.not.equal(gameroom2.id);
		});
	});
});
