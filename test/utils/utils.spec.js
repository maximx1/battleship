var utils = require("../../src/utils/utils.js");
var Tuple = require("tuple-w");
var initGen = utils.initGen;

describe("utils", function() {
	describe("#range()", function() {
		it("should output an array from 0 to input - 1", function() {
			var range = utils.range(4);
			expect(range).to.have.length(4);
			expect(range).to.deep.equal([0, 1, 2, 3]);
		});
	});

	describe("#init2DArray()", function() {
		it("should initialize a 2D array with the init value with square size with dimensions passed in", function() {
			var array1 = utils.init2DArray(2, initGen(true));
			var array2 = utils.init2DArray(4, initGen(false));
			var array3 = utils.init2DArray(3, initGen("snicklefritz"));
			var array4 = utils.init2DArray(1, initGen(101));

			expect(array1).to.deep.equal([[true, true], [true, true]]);
			expect(array2).to.deep.equal([[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]);
			expect(array3).to.deep.equal([["snicklefritz", "snicklefritz", "snicklefritz"], ["snicklefritz", "snicklefritz", "snicklefritz"], ["snicklefritz", "snicklefritz", "snicklefritz"]]);
			expect(array4).to.deep.equal([[101]]);
		});

		it("should pass in the coordinates of the element into the generator function", function() {
			var genFunc = function(i, j) {
				return function() {
					return new Tuple(i, j);
				}();
			};

			var array = utils.init2DArray(10, genFunc);
			array.forEach(function(x, i) {
				x.forEach(function(y, j) {
					y.unpack(function(coordX, coordY) {
						expect(coordX).to.equal(i);
						expect(coordY).to.equal(j);
					});
				});
			});
		});
	});

	describe("#getArrayElementByCoord()", function() {
		it("should return the element of the array found at the passed in coordinates", function() {
			var arr = utils.init2DArray(10, initGen(false));
			arr[1][4] = true;
			expect(utils.getArrayElementByCoord(arr, new Tuple(1, 4))).to.equal(true);
		});

		it("should return null should the coordinates be out of bounds", function() {
			expect(utils.getArrayElementByCoord(utils.init2DArray(10, initGen(true)), new Tuple(-1, -1))).to.equal(null);
		});

		it("should return null should the passed in array be null", function() {
			expect(utils.getArrayElementByCoord(null, new Tuple(-1, -1))).to.equal(null);
		});

		it("should return null should the coordinates be null", function() {
			expect(utils.getArrayElementByCoord(utils.init2DArray(10, initGen(false)), null)).to.equal(null);
		});
	});

	describe("#generateRandomString()", function() {
		it("should return empty string when passed negative numbers", function() {
			expect(utils.generateRandomString(-22)).to.equal("");
		});

		it("should return empty string when passed in a value of 0", function() {
			expect(utils.generateRandomString(0)).to.equal("");
		});

		it("should return a string the length of what is passed in", function() {
			expect(utils.generateRandomString(22).length).to.equal(22);
			expect(utils.generateRandomString(100).length).to.equal(100);
			expect(utils.generateRandomString(1).length).to.equal(1);
			expect(utils.generateRandomString(444).length).to.equal(444);
		});
	});
});
