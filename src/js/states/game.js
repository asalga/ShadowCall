'use strict';

var cfg = require('../config');

// var HUD = require('../HUD').instance;

var GroundLayer = require('../entities/GroundLayer');

var Player = require('../entities/player');
var Mine = require('../entities/mine');


var Game = function() {};

/*
 */
Game.prototype = {

  create: function() {
    this.main = require('../main');


    this.groundLayer = new GroundLayer(this);
    this.player = new Player(this, cfg.gameWidth/2, cfg.gameHeight/2);

	// check what game was...
    this.mine = new Mine(this.game);
  },

  render: function() {
    this.main.blitPixiToCanvas();
  }
};

module.exports = Game;