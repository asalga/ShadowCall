'use strict';

var cfg = require('../config');
var _ = require('lodash');

/*
	Follows and tries to collide with the player

	opts: game, gameState
 */
var Mine = function(game, gameState) {
	// _.defaults(this, opts);
	this.game = game;
	
	Phaser.Sprite.call(this, this.game, 100, 100, 'mine');
	var mineSprite = this.game.add.existing(this);

	this.properties = {
		player: null,
		score: 100
	};

	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(this.width, this.height);
	this.body.immovable = false;

	this.body.velocity.y = 20;

	var idleAnim = mineSprite.animations.add('idle', [0, 1], 2, true);
	idleAnim.play();
};

Mine.prototype = Object.create(Phaser.Sprite.prototype);
Mine.prototype.constructor = Mine;

Mine.prototype.render = function() {
	console.log('render');
}

Mine.prototype.collision = function(other){

	// turn off collision detection
	// play animation
	// update score in HUD
	// update list of sprites in Game state
	// remove signal?

	// this.onScoreUpdate.dispatch(this);

	this.body = null;
	this.destroy();
	// this.game.destroy(this);
	// this.kill();
};

Mine.prototype.update = function() {

	if (this.body.position.y > cfg.gameHeight) {
		this.body.position.y = -this.height;
	}
};

module.exports = Mine;