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

		// TODO: check different passing in this.game and game
		this.mine1 = new Mine(this.game, this);
			//{game:this.game, gameState:this});
		this.mine2 = new Mine(this.game, this);
			//{game:this.game, gameState:this});

		this.sprites = [this.player, this.mine1, this.mine2];
		this.enemies = [this.mine1, this.mine2];
	},

	update: function() {},

	render: function() {
		var g = this.game;

		if (cfg.debug) {
			this.game.debug.text("version: " + cfg.version, 0, cfg.gameHeight, 'white', '10px Courier');
			// this.game.add.text(16, 16, 'Score: 0', { fontSize: '22px', fill: '#fff' });

			// show hit areas
			_.forEach(this.sprites, function(s) {
				g.debug.body(s);
			}.bind(this));
		}

		// check player/enemy
		// check player bullets / enemy

		this.physics.arcade.overlap(this.player, this.enemies, function(a, b) {
			a.collision(b);
			b.collision(a);
		}, null, this);

		this.main.blitPixiToCanvas();
	}
};

module.exports = Game;