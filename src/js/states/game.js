'use strict';

var Assets = require('../assets');

var Game = function() {};

// comment 2d map  model

/*
  task
    -> if row passes a certain point, recycle it.

  (
    create pos var
    if it reaches tile height, debugger
  )

  - create procedure to recycle tiles
  recycleRow(i);
  
  2d array
  based on distance?

  every 32px

  |
  |
  |
  |

  150 row tiles
*/
Game.prototype = {

  create: function() {

    this.tilesPerRow = 9;
    this.totalRows = 150;
    this.visibleRows = 8;
    this.speed = 1.0;
    this.yDebugBuffer = 0;




    this.sideBuffer = 16;

    this.pos = 0;
    this.testPos = 0;

    this.row = [];
    
    var j = 0;
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

        var x = column * 32;
        var y = row * 32 + this.yDebugBuffer;
        var nameIndex = '0001.png'; // temp

        var test = this.game.add.sprite(x, y, 'level1', nameIndex);
        this.visibleTiles[row].push(test);
        test._posOrigY = y;

        test.position._float_y = y;
        test.position.y = Math.floor(test.position._float_y);

        j++;
      }
    }

    // The tiles on the board only have temporary sprites.
    // Here we assign the proper sprites to the tiles on the board.
    var startRow = this.totalRows - this.visibleRows;
    var boardRow = 0;
    // this.marker = 0;

    // This starts pointing to bottom of the 2d map and we work our way upwards
    this.nextRowMarker = this._2dMap.length - this.visibleRows;

    for (var rowIndex = startRow; rowIndex < this.totalRows; rowIndex++, boardRow++) {
      for (var col = 0; col < 9; col++) {
        tile = this._2dMap[rowIndex][col];
        this.visibleTiles[boardRow][col].frameName = this.tileIndexToTileName(tile);
      }
    }

    // TODO: move this
    this.input.onDown.add(this.onDown, this);
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

    var leadingZeros = '';

    if (index < 1000) {
      leadingZeros = '0';
    }
    if (index < 100) {
      leadingZeros = '00'
    }
    if (index < 10) {
      leadingZeros = '000';
    }

    return leadingZeros + index + '.png';
  },

  update: function() {
    this.pos += this.speed;

    var rows = this.visibleTiles.length;
    var cols = this.visibleTiles[0].length;

    this.testPos += this.speed;

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


    var tile0 = this.visibleTiles[this.marker][0];
    if (tile0.position.y >= (32 * this.visibleRows) - 32) {
      this.recycleRow(this.marker);
    }

    // var yFloored = Math.floor(this.testPos);
    // if (yFloored > 0 && yFloored % 32 === 0) {
    //   this.recycleRow(this.marker);
    //   debugger;
    // }

    this.game.debug.text('y:' + this.testPos, 2, 24, "#FFFFFF");

    //  for (var rowIndex = 0; rowIndex < this.totalRows; rowIndex++) {
    //   for (var col = 0; col < 9; col++) {
    //     console.log(this.visibleTiles[rowIndex][col]);
    //     // tile = this._2dMap[rowIndex][col];
    //     // this.visibleTiles[rowIndex][col].position.y += this.speed;
    // frameName = this.tileIndexToTileName(tile);
    //   }
    // }
  },

  /*
    Will change the y position and frame names of a given row from bottom
    of the visible set of tiles to the very top.
  */
  recycleRow: function(rowIndex) {

    this.nextRowMarker--;

    for (var c = 0; c < this.tilesPerRow; c++) {

      // First, lets move the bottom row to the top
      this.visibleTiles[rowIndex][c].position._float_y = -32 + this.speed;
      this.visibleTiles[rowIndex][c].position.y = -32 + this.speed;

      // Second, assign new frames to the tiles
      // var index = (this.nextRowMarker * this.tilesPerRow) + c;
      // this.getTileIdReverse(tileId);
      var tileId = this._2dMap[this.nextRowMarker][c];

      this.visibleTiles[rowIndex][c].frameName = this.tileIndexToTileName(tileId);
    }

    this.marker--;
    if (this.marker < 0) {
      this.marker = this.visibleRows - 1;
    }
  },

  /*
   
   */
  getTileIdReverse: function(i) {},

  render: function() {
    this.game.debug.text(this.game.time.fps, 2, 14, "#FFFFFF");
    require('../main')();
  },

  onDown: function() {
    console.log('click');
    // for (var i = 0; i < this.row.length; i++) {
    //   this.row[i].y -= 1;
    // }
  }
};

module.exports = Game;


// 
// for (var row = 0; row < this.visibleRows; row++) {
//   for (var column = 0; column < 9; column++) {
//   }
// }

// Load stuff
/*for (var y = 0; y < 1; y++) {
  for (var x = 0; x < 9; x++) {

    var xpos = (this.sideBuffer) + x * 32;
    var ypos = y * 32;

    var index = Assets.json.level1[j];

    var a = this.game.add.sprite(xpos, ypos, 'level1', nameIndex);
    this.row.push(a);

    a._posOrigY = ypos;

    j++;
  }
}*/


/*var Player = require('../entities/player');

var Game = function () {
  this.testentity = null;
};
module.exports = Game;

Game.prototype = {

  create: function () {
    var x = (this.game.width / 2) - 100;
    var y = (this.game.height / 2) - 50;

    this.testentity = new Player(this.game, x, y);
    this.testentity.anchor.setTo(0.5, 0.5);

    this.input.onDown.add(this.onInputDown, this);
  },

  update: function () {
    var x, y, cx, cy, dx, dy, angle, scale;

    x = this.input.position.x;
    y = this.input.position.y;
    cx = this.world.centerX;
    cy = this.world.centerY;

    angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    this.testentity.angle = angle;

    dx = x - cx;
    dy = y - cy;
    scale = Math.sqrt(dx * dx + dy * dy) / 100;

    this.testentity.scale.x = scale * 0.6;
    this.testentity.scale.y = scale * 0.6;
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
*/