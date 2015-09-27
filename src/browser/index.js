var Tuple = require("tuple-w");
var angular = require("angular");
var utils = require("../utils/utils.js");
var GamePiece = require("../battleship/models/gamePiece.js");
var pieceGen = require("../battleship/gameroom.js").pieceGen;
require("angular-ui-router");

var Command = require("../battleship/models/command.js");

var battleshipGame = angular.module('battleshipGame', ['ui.router']);

battleshipGame.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      url: "/",
      templateUrl: "partials/landing.html"
    })
    .state('initiate_game', {
      url: "/create",
      templateUrl: "partials/initiate_game.html",
      controller: "bsInitiateControl"
    })
    .state('join_game', {
      url: "/join",
      templateUrl: "partials/join_game.html",
      controller: "bsJoinControl"
    })
    .state('game', {
      url: "/game",
      templateUrl: "partials/game.html",
      controller: "bsGameController"
    });
}]);

battleshipGame.controller('headerController', ["$scope", "$rootScope", function ($scope, $rootScope) {
  $rootScope.username = "player_" + utils.generateRandomString(5);
  $scope.$watch('username', function(username) {
    $rootScope.username = username;
  });
}]);

battleshipGame.controller('bsInitiateControl', ["$scope", "$rootScope", function ($scope, $rootScope) {
  //$rootScope.username = "player_init";
  $scope.message = $rootScope.username;
}]);

battleshipGame.controller('bsJoinControl', ["$scope", "$rootScope", function ($scope, $rootScope) {
  //$rootScope.username = "player_join";
}]);

battleshipGame.controller('bsGameController', ["$scope", "$rootScope", function ($scope, $rootScope) {
  //$rootScope.username = "player_game";
  $scope.playerBoard = utils.init2DArray(10, pieceGen);
  $scope.opponentBoard = utils.init2DArray(10, pieceGen);
  $scope.handlePieceClick = function(piece) {
    piece.state=true;
    piece.coord.unpack(function(x,y) {
      if(x == 1) {
        piece.state=false;
      }
    });
  };
}]);
