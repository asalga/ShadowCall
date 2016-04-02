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
    this.player = new Player(this.game);
    // check what game was...
    this.mine = new Mine(this.game);

    this.sprites = [this.player, this.mine];
  },

  render: function() {
    var g = this.game;

    if(cfg.debug){
      this.game.debug.text( "version: " + cfg.version, 0, cfg.gameHeight, 'white', '10px Courier');
      // this.game.add.text(16, 16, 'Score: 0', { fontSize: '22px', fill: '#fff' });
      
      _.forEach(this.sprites, function(s){
        g.debug.body(s);
      }.bind(this));
    }

    this.main.blitPixiToCanvas();
  }



};

module.exports = Game;