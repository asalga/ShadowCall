'use strict';

var Assets = require('../assets');
var utils = require('../utils');
var cfg = require('../config');

/*

*/
var BackgroundLayer = function (game) {
	Phaser.Group.call(this, game);
	game.add.existing(this);
	this.init();
};

BackgroundLayer.prototype = Object.create(Phaser.Group.prototype);
BackgroundLayer.prototype.constructor = BackgroundLayer;

BackgroundLayer.prototype.init = function(){
	this.tilesPerRow = 9;
	this.visibleRows = 8;
	this.tilesPerSecond = cfg.backgroundTilesPerSecond;
	this.recycledIndices = [0, 1, 2, 3, 4, 5, 6, 7];
	this.TILE_SIZE = 32;
	this.sideBuffer = 16; // create left and right vertical spacing
	this.pos = 0; // track how far we have moved the board
	this.reachedEnd = false;

	// Makes working with the level a bit easier
	this._2dMap = [];

	// We have the level represented as a 1d array, we need to 
	// convert it into a 2d map
	this.create2DMap(Assets.json.level2.slice());

	this.totalRows = this._2dMap.length;

	// create the sprites
	this.visibleTiles = [];
	this.g = this.game.add.group();

	// Create the board/grid. Use temp sprite texture
	for (var row = 0; row < this.visibleRows; row++) {
		this.visibleTiles.push([]);

		for (var column = 0; column < this.tilesPerRow; column++) {

			var x = column * this.TILE_SIZE + this.sideBuffer;
			var y = row * this.TILE_SIZE - 32 - 16 - 8;
			var nameIndex = '0001.png'; // temp

			var sprite = this.game.add.sprite(x, y, 'level2', nameIndex);
			this.g.add(sprite);

			this.visibleTiles[row].push(sprite);
			sprite.position.y = Math.floor(y);
		}
	}

	// The tiles on the board only have temporary sprites.
	// Here we assign the proper sprites to the tiles on the board.
	var startRow = this.totalRows - this.visibleRows;
	var boardRow = 0;
	var tile;
	// This starts pointing to bottom of the 2d map and we work our way upwards
	this.nextRowMarker = this._2dMap.length - this.visibleRows;

	for (var rowIndex = startRow; rowIndex < this.totalRows; rowIndex++, boardRow++) {
		for (var col = 0; col < 9; col++) {
			tile = this._2dMap[rowIndex][col];
			this.visibleTiles[boardRow][col].frameName = this.tileIndexToTileName(tile);
		}
	}
};

/*
    Our level is represented as a large 1d array. We need to 
    place this in a 2d array for easier reading.
*/
BackgroundLayer.prototype.create2DMap = function(_1dArray) {
	var arr = _1dArray;
	while (arr.length) {
		this._2dMap.push(arr.splice(0, this.tilesPerRow));
	}
};

/*
  Given 1, returns 0001.png
  */
BackgroundLayer.prototype.tileIndexToTileName = function(index) {
	return utils.addLeadingZeros(index, 4) + '.png';
};

/*
  Move the last row down
  then iterate upwards moving each row down
*/
BackgroundLayer.prototype.update = function() {
	if (this.reachedEnd) {
		return;
	}

	this.pos += this.tilesPerSecond;
	this.g.position.y = Math.floor(this.pos);

	var rows = this.visibleTiles.length;
	var cols = this.visibleTiles[0].length;

	var lastIndex = this.recycledIndices[this.recycledIndices.length - 1];

	if (this.visibleTiles[lastIndex][0].position.y + this.g.position.y > 200) {
		this.recycleRow(lastIndex);
	}
};


/*
  Changes the y position and frame names of a given row from bottom
  of the visible set of tiles to the very top.
  */
BackgroundLayer.prototype.recycleRow = function(rowIndex) {
	this.nextRowMarker--;

	if (this.nextRowMarker < 0) {
		this.reachedEnd = true;
		return;
	}

	for (var i = 0; i < this.tilesPerRow; i++) {
		this.visibleTiles[rowIndex][i].position.y -= 8 * 32;

		// Second, assign new frames to the tiles
		var index = (this.nextRowMarker * this.tilesPerRow) + i;
		var tileId = this._2dMap[this.nextRowMarker][i];

		this.visibleTiles[rowIndex][i].frameName = this.tileIndexToTileName(tileId);
	}

	this.recycledIndices.unshift(rowIndex);
	this.recycledIndices.length = this.recycledIndices.length - 1;
};

module.exports = BackgroundLayer;

// debugDraw: function() {
//   var rows = this.visibleTiles.length;
//   var cols = this.visibleTiles[0].length;
//   for (var r = 0; r < rows; r++) {
//     for (var c = 0; c < cols; c++) {
//       var s = this.visibleTiles[r][c];
//       this.game.debug.text(s.position.y + this.g.position.y, this.visibleTiles[r][c].position.x, this.visibleTiles[r][c].position.y);
//     }
//   }
// },
//