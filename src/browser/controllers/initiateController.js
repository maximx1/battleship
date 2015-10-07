var ic = {};

ic.handler = function(scope, rootScope) {
  scope.message = rootScope.username;
};

module.exports = ic;
