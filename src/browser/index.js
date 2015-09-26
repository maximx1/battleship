var Tuple = require("tuple-w");
var angular = require("angular");
var utils = require("../utils/utils.js");
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
    });
}]);

battleshipGame.controller('headerController', ["$scope", "$rootScope", function ($scope, $rootScope) {
  $rootScope.username = "player_" + utils.generateRandomString(5);
}]);

battleshipGame.controller('bsInitiateControl', ["$scope", "$rootScope", function ($scope, $rootScope) {
  $rootScope.username = "player_init";
}]);

battleshipGame.controller('bsJoinControl', ["$scope", "$rootScope", function ($scope, $rootScope) {
  $rootScope.username = "player_join";
}]);
