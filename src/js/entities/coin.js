'use strict';

var cfg = require('../config');
var _ = require('lodash');

/*
	Coin

	opts: {game, gameState}
*/
var Coin = function(opts) {
	_.defaults(this, opts);

	this.name = 'coin';
	this.gameType = 'pickup';

	Phaser.Sprite.call(this, this.mainGame, 50, 50, 'coin');
	var coinSprite = this.mainGame.add.existing(this);

	this.pickup = new Phaser.Signal();

	this.mainGame.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(this.width, this.height);
	this.body.immovable = false;

	this.body.velocity.y = 40;

	var idleAnim = coinSprite.animations.add('idle', [0, 1], 6, true);
	idleAnim.play();

	// TODO: fix this
	// this.hitArea = new Phaser.Circle(0, 0, 4, 4);

	this.events.onOutOfBounds.add(function() {
		this.gameState.removeSprite(this);
	}.bind(this));
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.collision = function(other) {
	if (other.name === 'player') {
		this.body = null;
		this.gameState.removeSprite(this);
	}
};

Coin.prototype.update = function() {

	// Turning this on too early will remove the sprites before
	// they even reach the scene.
	if (this.position.y > 0) {
		this.checkWorldBounds = true;
	}
};

module.exports = Coin;