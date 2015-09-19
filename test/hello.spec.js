var assert = require("assert");
var hello = require("../src/hello.js");

describe("Hello World Test", function(){
  describe("#hello()", function(){
	assert.equal("Hello World", hello.say(),"Basic test is working");  
  });
});
