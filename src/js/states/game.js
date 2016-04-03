'use strict';

var _ = require('lodash');

var cfg = require('../config');
var Utils = require('../utils');

// var HUD = require('../HUD').instance;
var GroundLayer = require('../entities/GroundLayer');
var Player = require('../entities/player');
var Mine = require('../entities/mine');
var Coin = require('../entities/coin');

var Game = function() {
	this.sprites = [];
	this.pickups = [];
	this.enemies = [];
	this.groundLayer = null;
	this.player = null;
};

/*
 */
Game.prototype = {

	removeSprite: function(spriteToRemove) {
		switch (spriteToRemove.gameType) {

			case 'pickup':
				_.remove(this.pickups, function(s) {
					return s === spriteToRemove;
				}.bind(this));
				spriteToRemove.destroy();
				console.log(this.pickups.length);
				break;

			case 'enemy':
				break;

			case 'bullet':
				break;

			default:
				console.log('Could not find sprite to remove', spriteToRemove);
				break;
		}
	},

	createMines: function(n){
		// TODO: check different passing in this.game and game
		// this.mine1 = new Mine(this.game, this);
		_.times(n, function() {
			var m = new Mine({mainGame:this.game,gameState:this});
			m.position.x = Utils.getRandomInt(cfg.sideBufferSize, cfg.gameWidth-cfg.sideBufferSize);
			m.position.y = Utils.getRandomInt(-6000, -30);
			this.enemies.push(m);
		}.bind(this));

		console.log(this.enemies);
	},

	createCoins: function(n) {

		_.times(n, function() {
			var c = new Coin({
				mainGame: this.game,
				gameState: this
			});
			
			c.position.x = Utils.getRandomInt(cfg.sideBufferSize, cfg.gameWidth-cfg.sideBufferSize);
			c.position.y = Utils.getRandomInt(-6000, -30);

			this.pickups.push(c);
		}.bind(this));
		console.log(this.pickups);
	},

	create: function() {
		this.main = require('../main');

		this.groundLayer = new GroundLayer(this);
		this.player = new Player(this.game);

		this.createCoins(100);
		this.createMines(200);
	},

	killPlayer: function(){
		this.game.state.start(this.game.state.current);
	},

	update: function() {},

	render: function() {
		var g = this.game;

		if (cfg.debug) {
			g.debug.text("version: " + cfg.version, 0, cfg.gameHeight, 'white', '10px Courier');

			// show hit areas
			_.forEach(this.sprites, function(s) {
				g.debug.body(s);
			}.bind(this));

			// show pickups
			_.forEach(this.pickups, function(s) {
				g.debug.body(s);
			}.bind(this));
		}

		// check player bullets / enemy

		// player/enemy
		this.physics.arcade.overlap(this.player, this.enemies, function(a, b) {
			a.collision(b);
			b.collision(a);
		}, null, this);

		// player/pickups
		this.physics.arcade.overlap(this.player, this.pickups, function(a, b) {
			a.collision(b);
			b.collision(a);
		}, null, this);

		this.main.blitPixiToCanvas();
	}
};

module.exports = Game;