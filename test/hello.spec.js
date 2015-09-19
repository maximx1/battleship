var expect = require("chai").expect;
var hello = require("../src/hello.js");

describe("Hello World Test", function() {
  describe("#hello()", function() {
  	it('should output Hello World',function(){
      expect(hello.say()).to.equal("Hello World")
  	});
  });
});
