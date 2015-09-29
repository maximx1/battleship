var angular = require("angular");
var headerController = require("./controllers/headerController.js");
var initiateController = require("./controllers/initiateController.js");
var joinController = require("./controllers/joinController.js");
var gameController = require("./controllers/gameController.js");
require("angular-ui-router");


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
      controller: ["$scope", "$rootScope", initiateController.handler]
    })
    .state('join_game', {
      url: "/join",
      templateUrl: "partials/join_game.html",
      controller: ["$scope", "$rootScope", joinController.handler]
    })
    .state('game', {
      url: "/game",
      templateUrl: "partials/game.html",
      controller: ["$scope", "$rootScope", gameController.handler]
    });
}]);

battleshipGame.controller('headerController', ["$scope", "$rootScope", headerController.handler]);
