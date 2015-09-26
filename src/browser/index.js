var Tuple = require("tuple-w");
var Command = require("../battleship/models/command.js");
var angular = require("angular");
require("angular-ui-router");

var battleshipGame = angular.module('battleshipGame', ['ui.router']);

battleshipGame.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      url: "/",
      templateUrl: "partials/landing.html",
      controller: "bsLandingControl"
    })
    .state('initiate_game', {
      url: "game",
      templateUrl: "partials/initiate_game.html",
      controller: "bsGameControl"
    });
}]);

battleshipGame.controller('bsLandingControl', ["$scope", function ($scope) {
  $scope.phones = [{name: "moto x", style: "touch screen"}, {name: "v-basic", style: "clamshell"}];
  $scope.message = "Hello, World!";
}]);

battleshipGame.controller('bsGameControl', ["$scope", function ($scope) {
  $scope.phones = [{name: "moto x", style: "touch screen"}, {name: "v-basic", style: "clamshell"}];
  $scope.message = "----------------------------------------------------------------------------";
}]);
