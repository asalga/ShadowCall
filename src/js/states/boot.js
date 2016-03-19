'use strict';
var Game = require('./game');

var Boot = function() {};

Boot.prototype = {
  create: function() {
    this.game.input.maxPointers = 1;

    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.minWidth = 480*4;
    // this.scale.minHeight = 320*4;
    // this.scale.maxWidth = 480*2;
    // this.scale.maxHeight = 320*2;

    // this.scale.forceLandscape = true;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.setScreenSSize(true);

    this.game.stage.smoothed = false;

    // this.game.stage.scale.x = 2;
    // this.game.stage.scale.y = 2;
    // console.log(this.game.stage);

    if (this.game.device.desktop) {
      // this.game.stage.scale.pageAlignHorizontally = true;
    }

    this.game.state.start('Game');
  }
};

module.exports = Boot;