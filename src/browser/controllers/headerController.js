var utils = require("../../utils/utils.js");

var hc = {};

hc.handler = function (scope, rootScope) {
  rootScope.username = "player_" + utils.generateRandomString(5);
  scope.$watch('username', function(username) {
    rootScope.username = username;
  });
};

module.exports = hc;
