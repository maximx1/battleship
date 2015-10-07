var utils = require("../../utils/utils.js");
var pieceGen = require("../../battleship/gameroom.js").pieceGen;
//var Tuple = require("tuple-w");
//var Command = require("../battleship/models/command.js");
//var GamePiece = require("../battleship/models/gamePiece.js");

var gc = {};

gc.handler = function (scope, rootScope) {
  scope.playerBoard = utils.init2DArray(10, pieceGen);
  scope.opponentBoard = utils.init2DArray(10, pieceGen);
  scope.handlePieceClick = gc.handlePieceClick;
};

gc.handlePieceClick = function(piece) {
  piece.state=true;
  piece.coord.unpack(function(x,y) {
    if(x == 1) {
      piece.state=false;
    }
  });
};

module.exports = gc;
