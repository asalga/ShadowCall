'use strict';
var Game = require('./game');

var Boot = function() {};

Boot.prototype = {
  create: function() {
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.stage.scale.pageAlignHorizontally = true;
    }

    this.game.state.start('Game');
  }
};

module.exports = Boot;