'use strict';

var Assets = require('../assets');
var utils = require('../utils');

var Game = function() {

};

/*
 
 */
Game.prototype = {

  create: function() {
    this.main = require('../main');

    this.tilesPerRow = 9;
    this.totalRows = 150;
    this.visibleRows = 8;
    this.speed = 1;

    // create left and right vertical spacing
    this.sideBuffer = 16;

    // move this to model data?
    this.TILE_SIZE = 32;


    // track how far we have moved the board
    this.pos = 0;

    this.row = [];

    var tile;

    this.marker = this.visibleRows - 1;

    // Makes working with the level a bit easier
    this._2dMap = [];

    // We have the level represented as a 1d array, we need to 
    // convert it into a 2d map
    this.create2DMap(Assets.json.level1);

    // create the sprites
    this.visibleTiles = [];

    // Create the board/grid. Use temp sprite texture
    for (var row = 0; row < this.visibleRows; row++) {
      this.visibleTiles.push([]);

      for (var column = 0; column < this.tilesPerRow; column++) {

        var x = column * this.TILE_SIZE + this.sideBuffer;
        var y = row * this.TILE_SIZE;
        var nameIndex = '0001.png'; // temp

        var test = this.game.add.sprite(x, y, 'level1', nameIndex);
        this.visibleTiles[row].push(test);
        test._posOrigY = y;

        test.position._float_y = y;
        test.position.y = Math.floor(test.position._float_y);
      }
    }

    // The tiles on the board only have temporary sprites.
    // Here we assign the proper sprites to the tiles on the board.
    var startRow = this.totalRows - this.visibleRows;
    var boardRow = 0;

    // This starts pointing to bottom of the 2d map and we work our way upwards
    this.nextRowMarker = this._2dMap.length - this.visibleRows;

    for (var rowIndex = startRow; rowIndex < this.totalRows; rowIndex++, boardRow++) {
      for (var col = 0; col < 9; col++) {
        tile = this._2dMap[rowIndex][col];
        this.visibleTiles[boardRow][col].frameName = this.tileIndexToTileName(tile);
      }
    }
  },

  /*
    Our level is represented as a large 1d array. We need to 
    place this in a 2d array for easier reading.
  */
  create2DMap: function(_1dArray) {
    var arr = _1dArray.splice(0);
    while (arr.length) {
      this._2dMap.push(arr.splice(0, this.tilesPerRow));
    }
  },

  /*
    Given 1, returns 0001.png
  */
  tileIndexToTileName: function(index) {
    return utils.addLeadingZeros(index, 4) + '.png';
  },

  update: function() {
    this.pos += this.speed;

    var rows = this.visibleTiles.length;
    var cols = this.visibleTiles[0].length;

    this.pos += this.speed;

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        // this.visibleTiles[r][c]._posOrigY += this.speed;
        // var orig = this.visibleTiles[r][c]._posOrigY;
        // this.visibleTiles[r][c].position.y = orig + Math.floor(this.testPos);
        // ypos += this.speed;
        this.visibleTiles[r][c].position._float_y += this.speed;
        this.visibleTiles[r][c].position.y = Math.floor(this.visibleTiles[r][c].position._float_y);

        // this.visibleTiles[r][c].position.y = Math.floor(this.visibleTiles[r][c]._posOrigY);
      }
    }

    // 
    var tile0 = this.visibleTiles[this.marker][0];
    if (tile0.position.y >= (this.TILE_SIZE * this.visibleRows) - this.TILE_SIZE) {
      this.recycleRow(this.marker);
    }
  },

  /*
    Will change the y position and frame names of a given row from bottom
    of the visible set of tiles to the very top.
  */
  recycleRow: function(rowIndex) {

    this.nextRowMarker--;

    for (var c = 0; c < this.tilesPerRow; c++) {

      // First, lets move the bottom row to the top
      this.visibleTiles[rowIndex][c].position._float_y = -this.TILE_SIZE + this.speed;
      this.visibleTiles[rowIndex][c].position.y = -this.TILE_SIZE + this.speed;

      // Second, assign new frames to the tiles
      // var index = (this.nextRowMarker * this.tilesPerRow) + c;
      var tileId = this._2dMap[this.nextRowMarker][c];

      this.visibleTiles[rowIndex][c].frameName = this.tileIndexToTileName(tileId);
    }

    // 
    this.marker--;
    if (this.marker < 0) {
      this.marker = this.visibleRows - 1;
    }
  },

  render: function() {
    var col = '#FFFFFF';
    this.game.debug.text('fps:' + this.game.time.fps, 2, 15, col);
    this.game.debug.text('y:' + this.pos, 2, 30, col);

    this.main.blitPixiToCanvas();
  }
};

module.exports = Game;